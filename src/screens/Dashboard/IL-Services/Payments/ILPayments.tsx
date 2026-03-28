import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ImageBackground, LayoutAnimation} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import {BW} from '../../../../style/theme';
import {getUserPaymentLists} from '../../../../redux/reducers/E-Services/thunk/payments';
import PaymentList from './PaymentList';
import Loader from '../../../../component/Loader';
import Pagination from '../../../../component/Pagination';
import SearchContainer from './SearchContainer';
import PageBg from '../../../../component/PageBg';
import {getUserILPaymentLists} from '../../../../redux/reducers/I-Services/thunk/payment';

export default function ILPayments(props: any): JSX.Element {
  const params = props?.route?.params;

  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);
  const [search, setSearch] = useState(false);
  const [searchEx, setSearchEx] = useState(false);

  const [paymentLists, setPaymentLists]: any = useState([]);

  const [serviceEnv, setServicesEnv]: any = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useState<any>({
    ServiceId: '',
    PageNumber: 1,
    PageSize: PAGE_SIZE,
    SearchText: '',
    // LicenseNumber: '',
    // FactoryName: '',
    fromDate: '',
    toDate: '',
    PaymentStatus: '',
    paymentType: '0',
  });

  const dispatch = useAppDispatch();
  const {userILData, userId}: any = useAppSelector(store => store.userILData);

  const _getUserILPaymentLists = (pageNumber: number = 1, search = false) => {
    setIsLoading(true);

    let params: any = {
      // ServiceId: '',

      UserId: userId,
      LicenseId: userILData?.Id,
      PageNumber: 1,
      PageSize: PAGE_SIZE,
      // SearchText: '',
      // LicenseNumber: '',
      // FactoryName: '',
      // fromDate: '',
      // toDate: '',
      // PaymentStatus: '',
      // paymentType: '',
    };
    if (search) {
      params = {
        ...searchParams,
        FormId: searchParams?.ServiceId,
        fromDate: !!searchParams?.fromDate
          ? searchParams?.fromDate.toISOString()
          : '',
        toDate: !!searchParams?.toDate
          ? searchParams?.toDate.toISOString()
          : '',
      };
    } else {
      params = params;
    }
    params = {
      ...params,
      UserId: userId,
      LicenseId: userILData?.Id,
    };
    if (pageNumber == 1) {
      setCurrentPage(1);
    }

    dispatch(getUserILPaymentLists(params)).then(res => {
      setIsLoading(false);
      if (res.payload?.networkSuccess) {
        const result: any = res.payload?.result?.Transactions;
        const totalCount: number = res.payload?.result?.TotalCount;

        // const result = Object.values(res.payload).filter(
        //   (item: any) =>
        //     typeof item === 'object' &&
        //     !Array.isArray(item) &&
        //     item !== null &&
        //     !item.networkSuccess,
        // );

        setPaymentLists(result);
        setSearch(search);
        setTotalCount(totalCount);

        if (result?.length == 0 && search) {
          setTotalCount(0);
        }
      } else {
        setPaymentLists([]);
        setTotalCount(0);
      }
      setSearchEx(false);
      toggleAccordion();
    });
  };
  useEffect(() => {
    _getUserILPaymentLists();
  }, []);

  const animationConfig = {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.easeIn,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeIn,
    },
    delete: {
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(animationConfig);
  };
  const _resetSearch = () => {
    setSearchParams({
      ServiceId: '',
      PageNumber: 1,
      PageSize: PAGE_SIZE,
      SearchText: '',
      LicenseNumber: '',
      FactoryName: '',
      fromDate: '',
      toDate: '',
      PaymentStatus: '',
      paymentType: '0',
    });
    _getUserILPaymentLists(1);
    setSearchEx(false);
    setSearch(false);
    toggleAccordion();
  };
  return (
    <PageBg>
      <Page
        withStatusBar
        withOutScrollView
        ttsScopeId="il-pay-scope"
        onRefresh={_getUserILPaymentLists}
        header={<Header title={t('Menu.Payments')} />}
        withHeader={!params?.fromSearch}>
        <SearchContainer
          search={search}
          setSearch={setSearch}
          setSearchEx={setSearchEx}
          searchEx={searchEx}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          toggleAccordion={toggleAccordion}
          _resetSearch={_resetSearch}
          _getUserPaymentLists={_getUserILPaymentLists}
          totalCount={totalCount}
          servicesEnv={serviceEnv}
        />
        <Loader isLoading={isLoading}>
          <>
            <PaymentList services={paymentLists} isLoading={isLoading} />
            {totalCount > 0 && (
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                onPageChange={(newPage: number) => {
                  setCurrentPage(newPage);
                  _getUserILPaymentLists(newPage, search);
                }}
              />
            )}
          </>
        </Loader>
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    mainBackgroundImg: {
      backgroundColor: colors.mainBackgroundImg,
    },

    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16 * BW(),
    },
    containerBtnSwitch: {
      backgroundColor: colors.secondaryColor,
      width: 42 * BW(),
      height: 42 * BW(),
      borderRadius: 100 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      marginStart: 16 * BW(),
      marginTop: 8 * BW(),
      alignSelf: 'flex-end',
    },

    icon: {
      width: 18 * BW(),
      height: 18 * BW(),
      resizeMode: 'contain',
    },
  });
