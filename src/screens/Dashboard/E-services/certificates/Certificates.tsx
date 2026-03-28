import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ImageBackground, LayoutAnimation} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {useAppDispatch} from '../../../../redux/store';
import {BW} from '../../../../style/theme';
import {getCertificates} from '../../../../redux/reducers/E-Services/thunk/certificates';
import CertificatesList from './CertificateList';
import Loader from '../../../../component/Loader';
import Pagination from '../../../../component/Pagination';
import SearchContainer from './SearchContainer';
import PageBg from '../../../../component/PageBg';

export default function Certificates(props: any): JSX.Element {
  const params = props?.route?.params;

  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);
  const [search, setSearch] = useState(false);

  const [cetificates, setCetificates]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useState<any>({
    ServiceId: '',
    StageId: '',
    StageStatusId: 0,
    PageNumber: 1,
    PageSize: PAGE_SIZE,
    Search: '',
    Start: '',
    End: '',
    dateFilterType: '',
    OwnedBy: '',
  });

  const dispatch = useAppDispatch();

  const _getCertificates = (pageNumber: number = 1, search = false) => {
    setIsLoading(true);

    let params: any = {
      ServiceId: '',
      StageId: '',
      StageStatusId: 0,
      PageNumber: pageNumber,
      PageSize: PAGE_SIZE,
      Search: '',
      Start: '',
      End: '',
      dateFilterType: '',
      OwnedBy: '',
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

    dispatch(getCertificates(params)).then(res => {
      setIsLoading(false);
      if (res.payload?.networkSuccess) {
        const result = Object.values(res.payload).filter(
          (item: any) =>
            typeof item === 'object' &&
            !Array.isArray(item) &&
            item !== null &&
            !item.networkSuccess,
        );
        setCetificates(result);
        setSearch(false);
      } else {
        setCetificates([]);
      }
    });
  };
  useEffect(() => {
    _getCertificates();
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
      StageId: '',
      StageStatusId: 0,
      PageNumber: 1,
      PageSize: PAGE_SIZE,
      Search: '',
      Start: '',
      End: '',
      dateFilterType: '',
      OwnedBy: '',
    });
    _getCertificates(1);
    setSearch(false);
    toggleAccordion();
  };
  return (
    <PageBg>
      <Page
        ttsScopeId="es-cer-scope"
        withStatusBar
        withOutScrollView
        onRefresh={_getCertificates}
        header={<Header title={t('Menu.MyCertificates')} />}
        withHeader={!params?.fromSearch}>
        <SearchContainer
          search={search}
          setSearch={setSearch}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          toggleAccordion={toggleAccordion}
          _resetSearch={_resetSearch}
          _getCertificates={_getCertificates}
          totalCount={totalCount}
        />
        <Loader isLoading={isLoading}>
          <>
            <CertificatesList
              services={cetificates}
              isLoading={isLoading}
              setTotalCount={setTotalCount}
            />

            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={PAGE_SIZE}
              onPageChange={(newPage: number) => {
                setCurrentPage(newPage);
                _getCertificates(newPage);
              }}
            />
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
