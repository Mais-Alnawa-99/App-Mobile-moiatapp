import React, {Fragment, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {BW} from '../../../../style/theme';
import {isArabic} from '../../../../locales';
import {getGetConformityBodies} from '../../../../redux/reducers/OpenData/thunk/openData';
import {useAppDispatch} from '../../../../redux/store';
import Loader from '../../../../component/Loader';
import Page from '../../../../component/Page';
import PageBg from '../../../../component/PageBg';
import Header from '../../../../component/Header';
import Pagination from '../../../../component/Pagination';
import FlatListComp from '../../../../component/FlatList';
import Search from '../../../../component/Search';
import ConformityBodyCard from './ConformityBodyCard';

export default function ConformityAssessmentBodies(props: any): JSX.Element {
  const params = props.route.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData]: any = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(null);

  const PAGE_SIZE = 10;

  const [searchParams, setSearchParams] = useState({
    countryID: '',
    statusID: '',
    accreditationBodiesID: '',
  });
  const _getGetConformityBodies = (newPage: any, reset = false) => {
    setIsLoading(true);
    let params: any = {
      certificationBodyEN: isArabic() ? '' : search,
      certificationBodyAR: isArabic() ? search : '',
      countryID: searchParams?.countryID,
      statusID: searchParams?.statusID,
      accreditationBodiesID: searchParams?.accreditationBodiesID,
      pageNumber: newPage,
      pageSize: PAGE_SIZE,
    };

    if (reset) {
      params = {
        countryID: '',
        statusID: '',
        accreditationBodiesID: '',
        page: newPage,
        pageSize: PAGE_SIZE,
      };
    }

    dispatch(getGetConformityBodies(params)).then((res: any) => {
      if (res?.payload?.networkSuccess && !!res?.payload?.result?.data) {
        const data = res?.payload?.result?.data;
        setData(data);
        setTotalCount(res?.payload?.result?.totalCount);
      } else {
        setData([]);
      }
      setIsLoading(false);
    });
  };
  const onSearch = () => {
    _getGetConformityBodies(currentPage);
  };

  useEffect(() => {
    if (search == null) return;

    const delayDebounce = setTimeout(() => {
      onSearch();
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const onReset = () => {
    setSearchParams({
      countryID: '',
      statusID: '',
      accreditationBodiesID: '',
    });
    _getGetConformityBodies(currentPage, true);
  };

  useEffect(() => {
    _getGetConformityBodies(currentPage);
  }, []);

  return (
    <PageBg>
      <Page
        ttsScopeId={`${params?.title}-scope`}
        withStatusBar
        styles={{padding: 8 * BW()}}
        header={
          <Header
            title={params?.title}
            hideDrawer
            titleContainerStyle={{flex: 8}}
          />
        }
        withOutScrollView
        contentContainerStyle={{}}
        withHeader>
        <Search
          search={search}
          setSearch={setSearch}
          style={{
            marginBottom: 16 * BW(),
            backgroundColor: colors.white,
            flex: undefined,
            borderRadius: 6 * BW(),
            paddingHorizontal: 12 * BW(),
            borderBottomWidth: 0,
          }}
        />
        <Loader isLoading={isLoading}>
          <FlatListComp
            data={data}
            renderItem={({item}: any) => <ConformityBodyCard item={item} />}
          />
        </Loader>
        {totalCount > 1 && (
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={(newPage: number) => {
              setCurrentPage(newPage);
              _getGetConformityBodies(newPage);
            }}
          />
        )}
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {},
    title: {
      marginTop: 16 * BW(),
    },
    subtitle: {
      color: colors.textColor,
      marginBottom: 8 * BW(),
    },

    submit: {
      marginTop: 20 * BW(),
      backgroundColor: colors.secondaryColor,
      minHeight: 40 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
    },
  });
