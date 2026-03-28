import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  LayoutAnimation,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {useAppDispatch} from '../../../../redux/store';
import {BH, BW} from '../../../../style/theme';
import {getUserPaymentLists} from '../../../../redux/reducers/E-Services/thunk/payments';
import CertificatesList from './PaymentList';
import Loader from '../../../../component/Loader';
import Pagination from '../../../../component/Pagination';
import SearchContainer from './SearchContainer';
import {getServicesByEnvironment} from '../../../../redux/reducers/E-Services/thunk/services';
import {isArabic} from '../../../../locales';
import PageBg from '../../../../component/PageBg';

export default function Payments(props: any): JSX.Element {
  const params = props?.route?.params;

  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);
  const [search, setSearch] = useState(false);

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
    Search: '',
    Start: '',
    End: '',
    URN: '',
    Status: '',
  });

  const dispatch = useAppDispatch();

  const _getServicesByEnvironment = () => {
    let langId = isArabic() ? 2 : 1;
    dispatch(getServicesByEnvironment()).then(res => {
      if (res.meta.requestStatus == 'fulfilled') {
        const result = Object.values(res.payload).filter(
          (item: any) =>
            typeof item === 'object' &&
            !Array.isArray(item) &&
            item !== null &&
            !item.networkSuccess,
        );
        const serviceList = result?.map((item: any) => {
          const translations = JSON.parse(item.serviceNameTranslation);
          const label = translations.find((t: any) => t.langId === langId);

          return {
            label: label?.value,
            value: item.serviceId,
          };
        });
        setServicesEnv(serviceList);
      }
    });
  };
  useEffect(() => {
    _getServicesByEnvironment();
  }, []);

  const _getUserPaymentLists = (pageNumber: number = 1, search = false) => {
    setIsLoading(true);

    let params: any = {
      ServiceId: '',
      PageNumber: pageNumber,
      PageSize: PAGE_SIZE,
      Search: '',
      Start: '',
      End: '',
      URN: '',
      Status: '',
    };
    if (search) {
      params = {
        ...searchParams,
        Start: !!searchParams?.Start ? searchParams?.Start.toISOString() : '',
        End: !!searchParams?.End ? searchParams?.End.toISOString() : '',
      };
    } else {
      params = params;
    }
    if (pageNumber == 1) {
      setCurrentPage(1);
    }

    dispatch(getUserPaymentLists(params)).then(res => {
      setIsLoading(false);
      if (res.payload?.networkSuccess) {
        const result = Object.values(res.payload).filter(
          (item: any) =>
            typeof item === 'object' &&
            !Array.isArray(item) &&
            item !== null &&
            !item.networkSuccess,
        );
        setPaymentLists(result);
        setSearch(search);
        if (result?.length == 0 && search) {
          setTotalCount(0);
        }
      } else {
        setPaymentLists([]);
        setTotalCount(0);
      }
    });
  };
  useEffect(() => {
    _getUserPaymentLists();
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
      Search: '',
      Start: '',
      End: '',
      URN: '',
      Status: '',
    });
    _getUserPaymentLists(1);
    setSearch(false);
    toggleAccordion();
  };

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="es-pay-scope"
        withOutScrollView
        onRefresh={_getUserPaymentLists}
        header={<Header title={t('Menu.Payments')} />}
        withHeader={!params?.fromSearch}>
        <SearchContainer
          search={search}
          setSearch={setSearch}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          toggleAccordion={toggleAccordion}
          _resetSearch={_resetSearch}
          _getUserPaymentLists={_getUserPaymentLists}
          totalCount={totalCount}
          servicesEnv={serviceEnv}
        />
        <Loader isLoading={isLoading}>
          <>
            <CertificatesList
              services={paymentLists}
              isLoading={isLoading}
              setTotalCount={setTotalCount}
            />
            {totalCount > 0 && (
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                onPageChange={(newPage: number) => {
                  setCurrentPage(newPage);
                  _getUserPaymentLists(newPage, search);
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
