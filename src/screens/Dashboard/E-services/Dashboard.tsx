import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

import Text from '../../../component/Text';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BW} from '../../../style/theme';
import {isArabic} from '../../../locales';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import ProfileDataSection from '../Components/ProfileDataSection';
import CardStat from '../Components/CardStat';
import {
  getApplicationsCounts,
  getFavoriteAndMostUsedServices,
  getUserApplicationDashboardCounts,
} from '../../../redux/reducers/E-Services/thunk/dashboard';
import {parseJSON} from '../../services/utils';
import MostUsedServiceCard from '../Components/MostUsedServiceCard';
import Loader from '../../../component/Loader';
import NavigationService from '../../../navigation/NavigationService';
import {eservicesURL} from '../../../redux/network/apiEservices';
import {setNeedRefreshToken} from '../../../redux/reducers/General/server';
import PageBg from '../../../component/PageBg';
import Announcements from './Announcements';
import {getAnnouncementsForUsers} from '../../../redux/reducers/E-Services/thunk/announcements';

export default function ESDashboard(props: any): JSX.Element {
  const params = props.route.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const {tokenData}: any = useAppSelector(state => state.userToken);
  const {needRefreshToken} = useAppSelector(state => state.server);
  const [isLoading, setIsLoading] = useState(true);

  const [dashboardStats, setDashboardStats] = useState({
    Completed: 0,
    Pending: 0,
    Rejected: 0,
    Tasks: 0,
    PendingSubmit: 0,
    PendingPayment: 0,
    ModificationRequested: 0,
    PendingActions: 0,
  });
  const [mostUsedServices, setMostUsedServices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [statsTotalCount, setStatsTotalCount]: any = useState({});

  const _getUserApplicationDashboardCounts = () => {
    dispatch(getUserApplicationDashboardCounts()).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        res.payload?.networkSuccess
      ) {
        setIsLoading(false);
        const appsCount = parseJSON(res.payload?.appsCount);
        const pendingAppsCount = parseJSON(res.payload?.pendingAppsCount); // PendingApplicationStatus

        const statsMap: any = {
          Completed: 0,
          Pending: 0,
          Rejected: 0,
          Tasks: 0,
          PendingSubmit: 0,
          PendingPayment: 0,
          ModificationRequested: 0,
          PendingActions: 0,
        };

        appsCount?.forEach((item: any) => {
          if (statsMap.hasOwnProperty(item.ApplicationStatus)) {
            statsMap[item.ApplicationStatus] = item.Count;
          }
        });

        pendingAppsCount?.forEach((item: any) => {
          if (statsMap.hasOwnProperty(item.PendingApplicationStatus)) {
            statsMap[item.PendingApplicationStatus] = item.Count;
          }
        });

        setDashboardStats(statsMap);
        _getApplicationsCounts('Certificates');
        _getApplicationsCounts('Payments');
        _getApplicationsCounts('Applications');
      }
    });
  };
  const _getFavoriteAndMostUsedServices = () => {
    dispatch(getFavoriteAndMostUsedServices()).then(res => {
      setMostUsedServices(parseJSON(res.payload?.mostUsedServices));
    });
  };
  const _getApplicationsCounts = (mode: string) => {
    dispatch(getApplicationsCounts(mode)).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        res.payload?.networkSuccess &&
        !!res.payload?.mode
      ) {
        let data = parseJSON(res.payload?.mode);
        const total = data.reduce(
          (sum: any, item: any) => sum + (item?.Count || 0),
          0,
        );

        setStatsTotalCount((prev: any) => ({...prev, [mode]: total}));
      }
    });
  };

  useEffect(() => {
    dispatch(setNeedRefreshToken(false));
  }, []);

  const _getAnnouncementsForUsers = () => {
    dispatch(getAnnouncementsForUsers()).then(res => {
      if (res?.payload?.networkSuccess) {
        const result: any = Object.values(res.payload).filter(
          (item: any) =>
            typeof item === 'object' &&
            !Array.isArray(item) &&
            item !== null &&
            !item.networkSuccess,
        );
        setAnnouncements(result);
      }
    });
  };
  useFocusEffect(
    useCallback(() => {
      if (!needRefreshToken) {
        _getUserApplicationDashboardCounts();
        _getFavoriteAndMostUsedServices();
        _getAnnouncementsForUsers();
      }
    }, [needRefreshToken, tokenData?.access_token]),
  );

  const stats = [
    {
      id: 'inProgress',
      icon: require('../../../assets/dashboard/onProgress.png'),
      number: dashboardStats.Pending,
      label: 'Labels.Card_InProgress',
      statusId: 1,
      type: 'MyApplications',
    },
    {
      id: 'completed',
      icon: require('../../../assets/dashboard/completed.png'),
      number: dashboardStats.Completed,
      label: 'Labels.Card_Completed',
      statusId: 2,
      type: 'MyApplications',
    },
    {
      id: 'rejected',
      icon: require('../../../assets/dashboard/rejected.png'),
      number: dashboardStats.Rejected,
      label: 'Labels.Card_Rejected',
      statusId: 3,
      type: 'MyApplications',
    },
    {
      id: 'tasks',
      icon: require('../../../assets/dashboard/tasks.png'),
      number: dashboardStats.Tasks,
      label: 'Labels.Card_Tasks',
      statusId: '',
      type: 'MyTasks',
    },
  ];

  const extraStats = [
    {
      id: 'pendingSubmit',
      icon: require('../../../assets/dashboard/FileText.png'),
      number: dashboardStats.PendingSubmit,
      label: 'Labels.Card_PendingSubmit',
      type: 'MyTasks',
      statusId: 1,
    },
    {
      id: 'pendingPayment',
      icon: require('../../../assets/dashboard/CreditCard.png'),
      number: dashboardStats.PendingPayment,
      label: 'Labels.Card_PendingPayment',
      type: 'MyTasks',
      statusId: 1,
    },
    {
      id: 'modificationRequested',
      icon: require('../../../assets/icons/edit.png'),
      number: dashboardStats.ModificationRequested,
      label: 'Labels.Card_ModificationRequested',
      type: 'MyTasks',
      statusId: 5,
    },
    {
      id: 'pendingReview',
      icon: require('../../../assets/dashboard/Repeat.png'),
      number: dashboardStats.PendingActions,
      label: 'Labels.Card_PendingApprovals',
      type: 'MyApplications',
      statusId: 1,
    },
  ];
  const cards = [
    {
      id: 'payments',
      icon: require('../../../assets/dashboard/Receipt.png'),
      number: statsTotalCount?.Payments || 0,
      label: 'Menu.Payments',
      screen: 'Payments',
    },
    {
      id: 'certificates',
      icon: require('../../../assets/dashboard/Certificate.png'),
      number: statsTotalCount?.Certificates || 0,
      label: 'Menu.MyCertificates',
      screen: 'Certificates',
    },
  ];
  // function gotoTasks(item) {
  //   sessionStorage.setItem('filterTreeStatusId', item.statusId);
  //   if (item.name != 'Card_PendingApprovals') {
  //     this.router.navigate(['applications/tasks']);
  //   } else {
  //     this.router.navigate(['applications/myApplication']);
  //   }
  // }

  return (
    <PageBg>
      <Page
        ttsScopeId="es-dash-scope"
        withStatusBar
        styles={{
          paddingHorizontal: 16 * BW(),
          paddingTop: 8 * BW(),
        }}
        withHeader
        header={
          <Header
            title={
              params?.title ? params?.title?.toString()?.replace('\n', ' ') : ''
            }
            titleContainerStyle={{flex: 4}}
            showCart
          />
        }>
        <Loader isLoading={isLoading}>
          <>
            <ProfileDataSection showSwitchProfile />
            <View
              style={{
                marginTop: 8 * BW(),
                flexWrap: 'wrap',
                gap: 8 * BW(),
                flexDirection: 'row',
              }}>
              <View style={styles.row}>
                <View style={{flexDirection: 'row', gap: 8 * BW()}}>
                  <Text h3 medium>
                    {t('IL.Applications')}
                  </Text>
                  <Text h3 bold>
                    {statsTotalCount?.['Applications']}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    NavigationService.navigate('RequestsPage', {
                      label: t('IL.Applications'),
                      number: 1,
                    });
                  }}
                  style={styles.alignItemsCenter}>
                  <Text
                    h4
                    medium
                    style={{
                      color: colors.secondaryColor,
                    }}>
                    {t('viewAll')}
                  </Text>
                  <AntDesign
                    name={'arrowright'}
                    style={{
                      marginStart: 4 * BW(),
                      transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
                    }}
                    color={colors.secondaryColor}
                  />
                </TouchableOpacity>
              </View>
              {stats.map((item, index) => (
                <CardStat
                  key={item.id}
                  icon={item.icon}
                  firstText={String(item.number).padStart(2, '0')}
                  secondText={t(item.label)}
                  styleSecondText={{
                    marginTop: isArabic() ? 6 * BW() : 8 * BW(),
                  }}
                  firstTextBold
                  secondTextMedium
                  onPress={() =>
                    NavigationService.navigate('RequestsPage', item)
                  }
                  index={index}
                />
              ))}
            </View>
            <View
              style={{
                marginTop: 16 * BW(),
                gap: 8 * BW(),
              }}>
              {extraStats.map((item, index) => (
                <CardStat
                  key={item.id}
                  icon={item.icon}
                  secondText={String(item.number).padStart(2, '0')}
                  firstText={t(item.label)}
                  styleIcon={{
                    tintColor: colors.secondaryColor,
                    width: 22 * BW(),
                  }}
                  index={index}
                  firstTextH3
                  secondTextH2
                  secondTextBold
                  firstTextMedium
                  style={{
                    minWidth: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  styleFirstText={{
                    marginStart: 8 * BW(),
                  }}
                  onPress={() =>
                    NavigationService.navigate('RequestsPage', item)
                  }
                />
              ))}
            </View>
            <View
              style={{
                marginTop: 16 * BW(),
                flexWrap: 'wrap',
                gap: 8 * BW(),
                flexDirection: 'row',
              }}>
              {cards.map((item, index) => (
                <CardStat
                  key={item.id}
                  icon={item.icon}
                  secondText={t(item.label)}
                  firstText={String(item.number).padStart(2, '0')}
                  styleSecondText={{
                    marginTop: isArabic() ? 6 * BW() : 8 * BW(),
                  }}
                  firstTextBold
                  secondTextMedium
                  onPress={() => {
                    NavigationService.navigate(item?.screen);
                  }}
                  index={index}
                />
              ))}
            </View>
            <View
              style={{
                marginTop: 16 * BW(),
                gap: 8 * BW(),
              }}>
              <View style={styles.row}>
                <Text h4 medium>
                  {t('Labels.MostUsedServices')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.navigate('EAllServicesPage', params);
                  }}
                  style={styles.alignItemsCenter}>
                  <Text
                    h4
                    medium
                    speakable={false}
                    style={{
                      color: colors.secondaryColor,
                    }}>
                    {t('viewAll')}
                  </Text>
                  <AntDesign
                    name={'arrowright'}
                    style={{
                      marginStart: 4 * BW(),
                      transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
                    }}
                    color={colors.secondaryColor}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView horizontal>
                <View style={{flexDirection: 'row', gap: 8 * BW()}}>
                  {!!mostUsedServices &&
                    mostUsedServices != undefined &&
                    mostUsedServices?.map((item, index) => (
                      <Animatable.View
                        key={index}
                        style={{
                          backgroundColor: colors.white,
                          borderRadius: 12 * BW(),
                        }}
                        animation={'fadeInDown'}
                        delay={100 + 100 * index}>
                        <MostUsedServiceCard
                          key={index}
                          index={index}
                          item={item}
                        />
                      </Animatable.View>
                    ))}
                </View>
              </ScrollView>
            </View>
          </>
        </Loader>
        <Announcements
          announcements={announcements}
          tokenData={tokenData}
          setAnnouncements={setAnnouncements}
        />
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
  });
