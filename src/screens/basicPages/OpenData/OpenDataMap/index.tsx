import React, {Fragment, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import Text from '../../../../component/Text';
import {BW} from '../../../../style/theme';
import {isArabic} from '../../../../locales';
import {
  getFactoriesData,
  getServiceHighlightsCards,
} from '../../../../redux/reducers/OpenData/thunk/openData';
import {useAppDispatch} from '../../../../redux/store';
import Loader from '../../../../component/Loader';
import Page from '../../../../component/Page';
import PageBg from '../../../../component/PageBg';
import Header from '../../../../component/Header';
import FactoryList from './FactoryList';
import FactoriesSearch from './SearchContainer';
import Pagination from '../../../../component/Pagination';

export default function OpenDataMap(props: any): JSX.Element {
  const params = props.route.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData]: any = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 50;
  const [searchParams, setSearchParams] = useState({
    filterType: 'product',
    searchword: '',
    location: '',
    area: '',
    activityCategory: '',
    activity: '',
    selectedItem: '',
  });
  const _getFactoriesData = (newPage: any, reset = false) => {
    setIsLoading(true);
    let params: any = {
      searchword: searchParams.searchword,
      emirateID: searchParams?.location,
      areaID: searchParams?.area,
      page: newPage,
      pageSize: PAGE_SIZE,
    };
    if (searchParams.activityCategory) {
      params = {...params, activityCategory: [searchParams.activityCategory]};
    }
    if (reset) {
      params = {
        searchword: '',
        emirateID: '',
        areaID: '',
        page: newPage,
        pageSize: PAGE_SIZE,
      };
    }

    dispatch(getFactoriesData(params)).then((res: any) => {
      if (res?.payload?.networkSuccess && !!res?.payload?.data) {
        const data = JSON.parse(res?.payload?.data);
        setData(data);
        setTotalCount(data?.pagination?.TotalRecords);
      } else {
        setData({});
      }
      setIsLoading(false);
    });
  };
  const onSearch = () => {
    _getFactoriesData(currentPage);
  };

  const onReset = () => {
    setSearchParams({
      filterType: 'product',
      location: '',
      area: '',
      activityCategory: '',
      activity: '',
      selectedItem: '',
      searchword: '',
    });
    _getFactoriesData(currentPage, true);
  };

  useEffect(() => {
    _getFactoriesData(currentPage);
  }, []);

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId={`${params?.title}-scope`}
        styles={{padding: 8 * BW()}}
        header={
          <Header
            hideDrawer
            title={params?.title}
            titleContainerStyle={{flex: 8}}
          />
        }
        withOutScrollView
        contentContainerStyle={{}}
        withHeader>
        <FactoriesSearch
          totalCount={totalCount}
          searchParams={searchParams}
          onSearch={onSearch}
          onReset={onReset}
          setSearchParams={setSearchParams}
        />
        <Loader isLoading={isLoading}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text h4>{t('OpenDataObj.MapDataDesc')}</Text>
            </View>

            <FactoryList
              features={data?.features}
              labels={data?.Labels}
              colors={colors}
              isArabic={isArabic}
            />

            {totalCount === 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '70%',
                }}>
                <Text h4>{t('IL.EmptyData')}</Text>
              </View>
            )}
          </ScrollView>
        </Loader>

        {totalCount > 1 && (
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={(newPage: number) => {
              setCurrentPage(newPage);
              _getFactoriesData(newPage);
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
