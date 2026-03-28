import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {
  getUserApplicationCategories,
  getUserApplicationsList,
} from '../../../../redux/reducers/E-Services/thunk/applications';
import Loader from '../../../../component/Loader';
import RequestServiceCard from './RequestServiceCard';
import FlatListComp from '../../../../component/FlatList';
import SearchModal from './SearchModal';
import Button from '../../../../component/Button';
import {openBottomSheet} from '../../../../redux/reducers/General/bottomSheet';
import {setLoadingModal} from '../../../../redux/reducers/General/loader';
import PageBg from '../../../../component/PageBg';
import Text from '../../../../component/Text';

export default function RequestsPage(props: any): JSX.Element {
  const params = props.route.params;
  const statusId = params?.statusId;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const {tokenData}: any = useAppSelector(state => state.userToken);
  const [listView, setListView] = useState(false);
  const {needRefreshToken} = useAppSelector(state => state.server);
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const [requests, setRequests] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState<any>({
    selectedService: '',
    requestNumber: '',
    assignedTo: '',
    owner: '',
    durationStatus: '',
    showDeleted: false,
    showDrafts: false,
    matchAny: false,
    dateFrom: null,
    dateTo: null,
    selectededUsers: '',
    extraFieldFilters: '',
  });
  const {isLoading, categories} = useAppSelector(
    state => state.eservices.userApplicationCategories,
  );
  let filteredCategories = categories;
  if (!!statusId) {
    filteredCategories = categories?.filter((service: any) =>
      service?.stages?.some((stage: any) =>
        stage?.stageStatuses?.some(
          (status: any) => status.stageStatusId === statusId,
        ),
      ),
    );
  }
  const _getUserApplicationDashboardCounts = (
    Search = '',
    Start = '',
    End = '',
    ShowDeleted = false,
    AssignedUsers = '',
    ExtraFieldFilters = '',
    MatchAnyCondition = false,
    OwnedBy = '',
  ) => {
    dispatch(
      getUserApplicationCategories({
        Mode: params?.type ? params?.type : 'MyApplications',
        Search: Search,
        Start: Start,
        End: End,
        ShowDeleted: ShowDeleted,
        AssignedUsers: AssignedUsers,
        ExtraFieldFilters: ExtraFieldFilters,
        MatchAnyCondition: MatchAnyCondition,
        OwnedBy: OwnedBy,
      }),
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (!listView) {
        _getUserApplicationDashboardCounts();
      }
    }, [needRefreshToken, tokenData, tokenData?.access_token, listView]),
  );
  const prepareExtraFieldFilters = (extraFieldFilters: any) => {
    const filtersObj = extraFieldFilters || {};
    const filtersArray = Object.keys(filtersObj).map(key => ({
      EntityFieldId: parseInt(key),
      FieldTypeId: filtersObj[key].fieldTypeId,
      Operator: filtersObj[key].operator || 'contains',
      Value: filtersObj[key].value,
    }));
    return JSON.stringify(filtersArray);
  };

  const _getUserApplicationsList = (
    service: any,
    stage: any,
    page = 1,
    fromSearch = false,
    searchParamsLocal?: any,
    stageStatusId?: any,
  ) => {
    let requestParams;
    if (!!searchParamsLocal || searchParamsLocal != undefined) {
      setSearchParams(searchParamsLocal);
      requestParams = {
        ServiceId: !!searchParamsLocal?.selectedService
          ? searchParamsLocal?.selectedService
          : !!service
          ? service
          : '',
        StageId: stage ? stage : '',
        StageStatusId: statusId ? statusId : stageStatusId ? stageStatusId : '',
        PageNumber: page,
        PageSize: 10,
        Search: searchParamsLocal.requestNumber,
        Start:
          searchParamsLocal.dateFrom != null
            ? searchParamsLocal.dateFrom.toISOString()
            : '',
        End:
          searchParamsLocal.dateTo != null
            ? searchParamsLocal.dateTo.toISOString()
            : '',
        Mode: params?.type ? params?.type : 'MyApplications',
        AssignedUsers: searchParamsLocal?.assignedTo,
        selectededUsers: searchParamsLocal?.selectededUsers,
        ShowDeleted: searchParamsLocal?.showDeleted,
        MatchAnyCondition: searchParamsLocal?.matchAny,
        IsDraft: searchParamsLocal?.showDrafts,
        OwnedBy: searchParamsLocal?.owner,
        Duration: searchParamsLocal?.durationStatus,
        ExtraFieldFilters: !!searchParamsLocal?.extraFieldFilters
          ? prepareExtraFieldFilters(searchParamsLocal?.extraFieldFilters)
          : '',
      };
    } else {
      requestParams = {
        ServiceId: !!searchParams?.selectedService
          ? searchParams?.selectedService
          : !!service
          ? service
          : '',
        StageId: stage ? stage : '',
        StageStatusId: statusId ? statusId : stageStatusId ? stageStatusId : '',
        PageNumber: page,
        PageSize: 10,
        Search: searchParams.requestNumber,
        Start:
          searchParams.dateFrom != null && !!searchParams.dateFrom
            ? searchParams?.dateFrom?.toISOString?.()
            : '',
        End:
          searchParams.dateTo != null && !!searchParams.dateTo
            ? searchParams?.dateTo?.toISOString?.()
            : '',
        Mode: params?.type ? params?.type : 'MyApplications',
        AssignedUsers: searchParams?.assignedTo,
        selectededUsers: searchParams?.selectededUsers,
        ShowDeleted: searchParams?.showDeleted,
        MatchAnyCondition: searchParams?.matchAny,
        IsDraft: searchParams?.showDrafts,
        OwnedBy: searchParams?.owner,
        Duration: searchParams?.durationStatus,
        ExtraFieldFilters: !!searchParams?.extraFieldFilters
          ? prepareExtraFieldFilters(searchParams?.extraFieldFilters)
          : '',
      };
    }
    if (!fromSearch) {
      dispatch(setLoadingModal(true));
      setLoadingRequests(true);
    }

    if (fromSearch) {
      setSearch(true);
      setLoadingSearch(true);
    }
    if (page == 1) {
      setCurrentPage(1);
    }

    dispatch(getUserApplicationsList(requestParams)).then(res => {
      dispatch(setLoadingModal(false));
      setLoadingRequests(false);
      setLoadingSearch(false);
      if (res.payload.networkSuccess && res.payload?.errors == undefined) {
        const allRequests = Object.values(res.payload).filter(
          (item: any) =>
            typeof item === 'object' &&
            !Array.isArray(item) &&
            item !== null &&
            !item.networkSuccess,
        );
        setRequests(allRequests);
      } else {
        setRequests([]);
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (listView) {
        _getUserApplicationsList('', '');
      }
    }, [needRefreshToken, tokenData, tokenData?.access_token, listView]),
  );

  const _resetSearch = () => {
    let newParams = {
      selectedService: '',
      requestNumber: '',
      assignedTo: '',
      owner: '',
      durationStatus: '',
      showDeleted: false,
      showDrafts: false,
      matchAny: false,
      dateFrom: null,
      dateTo: null,
      selectededUsers: '',
      extraFieldFilters: '',
    };
    setSearchParams(newParams);
    setSearch(false);
    _getUserApplicationsList('', '', 1, false, newParams);
  };

  const _openSearchModal = () => {
    dispatch(
      openBottomSheet({
        content: (
          <SearchModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            search={_getUserApplicationsList}
            categories={filteredCategories}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            mode={params?.type ? params?.type : 'MyApplications'}
          />
        ),
        hideBack: true,
      }),
    );
  };

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="es-request-scope"
        styles={{
          paddingHorizontal: 16 * BW(),
          paddingTop: 8 * BW(),
        }}
        withHeader
        withOutScrollView
        header={<Header title={t(params.label)} hideDrawer />}>
        {params.number > 0 && (
          <View style={styles.searchBtnContainer}>
            <View style={{opacity: !listView ? 0 : 1}}>
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
              {!search && (
                <Button
                  style={styles.containerBtnSwitch}
                  icon={
                    listView
                      ? require('../../../../assets/icons/Grid.png')
                      : require('../../../../assets/icons/list.png')
                  }
                  styleIcon={styles.iconList}
                  containerIcon={{width: 20 * BW(), height: 20 * BW()}}
                  onPress={() => {
                    setListView(!listView);
                  }}
                />
              )}
            </View>
          </View>
        )}
        <Loader isLoading={isLoading || loadingSearch}>
          <>
            {!listView && !search ? (
              <FlatListComp
                data={filteredCategories}
                onRefresh={() => _getUserApplicationDashboardCounts()}
                renderItem={({item, index}: any) => (
                  <RequestServiceCard
                    key={index}
                    service={item}
                    statusId={statusId}
                    listView={listView || search}
                    number={params.number}
                    params={params}
                    loadingRequests={loadingRequests}
                    setLoadingRequests={setLoadingRequests}
                    requests={requests}
                    _getUserApplicationsList={_getUserApplicationsList}
                    fromSearch={search}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalCount={totalCount}
                    setTotalCount={setTotalCount}
                    activeStage={activeStage}
                    setActiveStage={setActiveStage}
                  />
                )}
                noData
              />
            ) : (
              <RequestServiceCard
                statusId={statusId}
                listView={listView || search}
                number={params.number}
                params={params}
                loadingRequests={loadingRequests}
                setLoadingRequests={setLoadingRequests}
                requests={requests}
                _getUserApplicationsList={_getUserApplicationsList}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                fromSearch={search}
                totalCount={totalCount}
                setTotalCount={setTotalCount}
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
      marginBottom: 6 * BW(),
    },
  });
