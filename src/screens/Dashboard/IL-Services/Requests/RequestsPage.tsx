import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import Loader from '../../../../component/Loader';
import RequestServiceCard from './RequestServiceCard';
import SearchModal from './SearchModal';
import Button from '../../../../component/Button';
import {openBottomSheet} from '../../../../redux/reducers/General/bottomSheet';
import PageBg from '../../../../component/PageBg';
import {getILUserApplications} from '../../../../redux/reducers/I-Services/thunk/profile';
import Text from '../../../../component/Text';

export default function ILRequestsPage(props: any): JSX.Element {
  const params = props.route.params;
  const statusId = params?.status;
  const PAGE_SIZE = 5;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();

  const {userILData, userId}: any = useAppSelector(store => store.userILData);

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [requests, setRequests] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState<any>({
    search: '',
    selectedService: '',
    status: statusId?.toString?.() || '',
    dateFrom: null,
    dateTo: null,
  });

  const _resetSearch = () => {
    let newParams = {
      search: '',
      selectedService: '',
      status: statusId?.toString?.() || '',
      dateFrom: null,
      dateTo: null,
    };
    setSearchParams(newParams);
    setSearch(false);
    _getILApplications(1, true, newParams);
  };

  const _openSearchModal = () => {
    dispatch(
      openBottomSheet({
        content: (
          <SearchModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            search={_getILApplications}
            // categories={filteredCategories}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            mode={params?.type ? params?.type : 'MyApplications'}
          />
        ),
        hideBack: true,
      }),
    );
  };

  const _getILApplications = (
    page: number,
    search = false,
    searchParamsLocal?: any,
  ) => {
    if (search) {
      setSearchParams(searchParamsLocal);
    }
    const formatDate = (date: Date | null) => {
      if (!date) {
        return '';
      }
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    };

    let params = {
      userId: userId,
      licenseId: userILData?.Id,
      pageNumber: page,
      pageSize: PAGE_SIZE,
      fromdate: searchParams.dateFrom,
      todate: searchParams.dateTo,
      SearchKey: searchParams.search,
      statusId: searchParams.status,
      FormId: searchParams.selectedService || null,
    };
    if (search) {
      setSearch(true);
      params = {
        userId: userId,
        licenseId: userILData?.Id,
        pageNumber: page,
        pageSize: PAGE_SIZE,
        fromdate: searchParamsLocal.dateFrom,
        todate: searchParamsLocal.dateTo,
        SearchKey: searchParamsLocal.search,
        statusId: searchParamsLocal.status,
        FormId: searchParamsLocal.selectedService || null,
      };
    }
    params = {
      ...params,
      fromdate: formatDate(params?.fromdate ? params.fromdate : null),
      todate: formatDate(params?.todate ? params.todate : null),
    };

    if (['draft', 'pending'].includes(userILData?.LicenseStatusClass)) {
      delete params.licenseId;
      params = {
        ...params,
        ApplciationId: userILData?.Id,
      };
    }
    setLoadingRequests(true);

    dispatch(getILUserApplications(params)).then(res => {
      setLoadingRequests(false);

      if (res?.payload?.networkSuccess) {
        let data = res.payload?.Data;

        setRequests(data?.Applications || []);
        setTotalCount(data?.totalRecords || 0);
      } else {
        setRequests([]);
        setTotalCount(0);
      }
    });
  };
  useEffect(() => {
    _getILApplications(1);
  }, []);
  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="il-req-scope"
        styles={{
          paddingHorizontal: 16 * BW(),
          paddingTop: 8 * BW(),
        }}
        withOutScrollView
        withHeader
        onRefresh={() => {
          _getILApplications(1);
        }}
        header={<Header title={t(params.label)} />}>
        {(totalCount > 0 || search) && (
          <View style={styles.searchBtnContainer}>
            <View>
              <Text h3 bold>
                {t('Labels.TotalCount') + ' ' + totalCount}
              </Text>
            </View>
            <View style={styles.searchBtnContainer}>
              <Button
                icon={require('../../../../assets/header/search.png')}
                styleIcon={{tintColor: colors.secondaryColor}}
                containerIcon={{width: 20 * BW(), height: 20 * BW()}}
                onPress={() => _openSearchModal()}
                style={styles.searchBtn}
              />
              <Button
                Entypo={'ccw'}
                onPress={() => {
                  _resetSearch();
                }}
                EntypoColor={colors.secondaryColor}
                style={{...styles.searchBtn, marginEnd: search ? 0 : 6 * BW()}}
              />
            </View>
          </View>
        )}
        <Loader isLoading={loadingRequests || loadingSearch}>
          <RequestServiceCard
            statusId={statusId}
            listView={search}
            number={params.number}
            params={params}
            loadingRequests={loadingRequests}
            setLoadingRequests={setLoadingRequests}
            requests={requests}
            _getUserApplicationsList={_getILApplications}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            fromSearch={search}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            PAGE_SIZE={PAGE_SIZE}
          />
        </Loader>
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    alignItemsCenter: {flexDirection: 'row', alignItems: 'center'},

    container: {
      backgroundColor: colors.primaryColor,
      borderRadius: 12 * BW(),
      paddingHorizontal: 16 * BW(),
      paddingVertical: 16 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 42 * BW(),
    },
    userImage: {
      height: 70 * BW(),
      width: 70 * BW(),
      borderRadius: 60 * BW(),
      backgroundColor: colors.background,
      zIndex: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    userName: {
      color: colors.mainWhite,
      paddingHorizontal: 20 * BW(),
      textAlign: 'center',
      marginTop: 8 * BW(),
    },
    btnContainer: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row-reverse',
      gap: 4 * BW(),
    },
    containerIcon: {
      width: 24 * BW(),
      height: 24 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'center',
    },
    containerBtnSwitch: {
      backgroundColor: colors.secondaryColor,
      width: 'auto',
      height: 'auto',
      padding: 8 * BW(),
    },
    iconList: {
      width: 18 * BW(),
      height: 18 * BW(),
      resizeMode: 'contain',
    },
    searchBtn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.border,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
    },
    searchBtnContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 8 * BW(),
    },
  });
