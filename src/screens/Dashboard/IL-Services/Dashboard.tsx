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
import {BH, BW} from '../../../style/theme';
import {isArabic} from '../../../locales';
import {store, useAppDispatch, useAppSelector} from '../../../redux/store';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import ProfileDataSection from '../Components/ProfileDataSection';
import CardStat from '../Components/CardStat';
import MostUsedServiceCard from '../Components/MostUsedServiceCard';
import Loader from '../../../component/Loader';
import NavigationService from '../../../navigation/NavigationService';
import {getUserDashBoard} from '../../../redux/reducers/I-Services/thunk/profile';
import PageBg from '../../../component/PageBg';
import {setILServices} from '../../../redux/reducers/I-Services/slice/services';
import ProfileBrief from './ProfileBrief';
import {setILNeedUserId} from '../../../redux/reducers/General/server';
import {getILAnnouncementsForUsers} from '../../../redux/reducers/I-Services/thunk/announcements';
import Announcements from './Announcements';
import Button from '../../../component/Button';

export default function ILDashboard(props: any): JSX.Element {
  const params = props.route.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    Completed: 0,
    Pending: 0,
    Rejected: 0,
    Cancelled: 0,
    Draft: 0,
    NotApplicable: 0,
    Returned: 0,
    Other: 0,

    Inspection: 0,
    CertificateCount: 0,
    PaymnetsCount: 0,
  });
  const [services, setServices] = useState([]);

  const {userILData, userId}: any = useAppSelector(store => store.userILData);

  const _getfactorydetails = () => {
    let userILDatatemp = store.getState().userILData.userILData;
    setIsLoading(true);
    dispatch(
      getUserDashBoard({
        UserId: userId,
        LicenseId: userILDatatemp?.Id,
      }),
    ).then(res => {
      if (res?.payload?.networkSuccess) {
        let applicationsCountArray =
          res?.payload?.result?.ApplicationsCountByStatus;
        let allowedServices = res?.payload?.result?.AllowedServices;
        let paymnetsCount = res?.payload?.result?.PaymnetsCount;
        let certificateCount = res?.payload?.result?.CertificateCount;
        const applicationsCountByStatus = applicationsCountArray?.reduce(
          (acc: any, item: any) => {
            acc[item?.ApplicationStatus] = item?.CountStatus;
            return acc;
          },
          {},
        );

        if (applicationsCountByStatus !== undefined) {
          setDashboardStats({
            Completed: applicationsCountByStatus?.Approved,
            Pending: applicationsCountByStatus?.InProgress,
            Rejected: applicationsCountByStatus?.Rejected,
            Cancelled: applicationsCountByStatus?.Cancelled,
            Draft: applicationsCountByStatus?.Draft,
            Returned: applicationsCountByStatus?.Returned,
            NotApplicable: applicationsCountByStatus?.NotApplicable,
            Other: applicationsCountByStatus?.Other,
            Inspection: applicationsCountByStatus?.Inspection,
            PaymnetsCount: paymnetsCount,
            CertificateCount: certificateCount,
          });
        }

        setServices(allowedServices);

        dispatch(setILServices({services: allowedServices}));
      }
      setIsLoading(false);
    });
  };
  const _getILAnnouncementsForUsers = () => {
    dispatch(
      getILAnnouncementsForUsers({
        userid: userId,
      }),
    ).then(res => {
      // setAnnouncements([
      //   {
      //     title: 'sss',
      //     description: 'wwww',
      //     isAcknowledgment: false,
      //   },
      // ]);

      if (res?.payload?.networkSuccess && res.payload?.result != null) {
        const result: any = res.payload?.result;

        setAnnouncements(result);
      }
    });
  };
  useFocusEffect(
    useCallback(() => {
      setDashboardStats({
        Completed: 0,
        Pending: 0,
        Rejected: 0,
        Cancelled: 0,
        Draft: 0,
        NotApplicable: 0,
        Returned: 0,
        Other: 0,

        Inspection: 0,
        CertificateCount: 0,
        PaymnetsCount: 0,
      });
      setIsLoading(true);

      _getfactorydetails();
      _getILAnnouncementsForUsers();
    }, []),
  );

  useEffect(() => {
    dispatch(setILNeedUserId(true));
  }, []);

  const stats = [
    {
      id: 'inProgress',
      icon: require('../../../assets/dashboard/onProgress.png'),
      number: dashboardStats.Pending,
      label: 'IL.ServicesInProgress',
      status: 1,
    },
    {
      id: 'completed',
      icon: require('../../../assets/dashboard/completed.png'),
      number: dashboardStats.Completed,
      label: 'IL.ServicesCompleted',
      status: 5,
    },
    {
      id: 'rejected',
      icon: require('../../../assets/dashboard/rejected.png'),
      number: dashboardStats.Rejected,
      label: 'IL.ServicesRejected',
      status: 4,
    },
    {
      id: 'cancelled',
      icon: require('../../../assets/dashboard/rejected.png'),
      number: dashboardStats.Cancelled,
      label: 'IL.ServicesCancelled',
      status: 3,
    },
  ];

  const extraStats = [
    {
      id: 'draft',
      icon: require('../../../assets/dashboard/FileText.png'),
      number: dashboardStats.Draft,
      label: 'IL.DraftLicense',
      status: 7,
    },

    {
      id: 'modificationRequested',
      icon: require('../../../assets/icons/edit.png'),
      number: dashboardStats.Returned,
      label: 'IL.Return',
      status: 8,
    },
    // {
    //   id: 'notApplicable',
    //   icon: require('../../../assets/dashboard/CreditCard.png'),
    //   number: dashboardStats.NotApplicable,
    //   label: 'IL.NotApplicable',
    //   status: 9,
    // },
    // {
    //   id: 'other',
    //   icon: require('../../../assets/dashboard/Repeat.png'),
    //   number: dashboardStats.Other,
    //   label: 'IL.Other',
    //   status: 1,
    // },
  ];

  const cards = [
    {
      id: 'payments',
      icon: require('../../../assets/dashboard/Receipt.png'),
      number: dashboardStats?.PaymnetsCount || 0,
      label: 'Menu.Payments',
      screen: 'ILPayments',
    },
    {
      id: 'certificates',
      icon: require('../../../assets/dashboard/Certificate.png'),
      number: dashboardStats?.CertificateCount || 0,
      label: 'Menu.MyCertificates',
      screen: 'ILCertificates',
    },
  ];

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="il-dash-scope"
        styles={{
          paddingHorizontal: 16 * BW(),
          paddingTop: 8 * BW(),
        }}
        withHeader
        onRefresh={_getfactorydetails}
        header={
          <Header
            title={
              params?.title ? params?.title?.toString()?.replace('\n', ' ') : ''
            }
            titleContainerStyle={{flex: 8}}
            showProfile
          />
        }>
        <Loader isLoading={isLoading}>
          <>
            {/* <ProfileDataSection /> */}

            <ProfileBrief userILData={userILData} showFactoryUsers />

            <View
              style={{
                marginTop: 16 * BW(),
                flexWrap: 'wrap',
                gap: 8 * BW(),
                flexDirection: 'row',
              }}>
              <View style={styles.row}>
                <Text h3 medium>
                  {t('IL.Applications')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.navigate('ILRequestsPage', {
                      label: t('IL.Applications'),
                    });
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
              {stats.map((item, index) => (
                <CardStat
                  key={item.id}
                  icon={item.icon}
                  firstText={String(item.number).padStart(2, '0')}
                  secondText={t(item.label)}
                  statusId={index + 1}
                  styleSecondText={{
                    marginTop: isArabic() ? 6 * BW() : 8 * BW(),
                  }}
                  firstTextBold
                  secondTextMedium
                  onPress={() =>
                    NavigationService.navigate('ILRequestsPage', item)
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
                    NavigationService.navigate('ILRequestsPage', item)
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
            {services?.length > 0 && (
              <View
                style={{
                  marginTop: 16 * BW(),
                  gap: 8 * BW(),
                }}>
                <View style={styles.row}>
                  <Text h3 medium>
                    {t('IL.AvailableServices')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('ILAllServicesPage', params);
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
                <ScrollView horizontal>
                  <View style={{flexDirection: 'row', gap: 8 * BW()}}>
                    {!!services &&
                      services?.slice?.(0, 5).map((item, index) => (
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
                            ilServices={true}
                          />
                        </Animatable.View>
                      ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </>
        </Loader>
        <Announcements
          announcements={announcements}
          setAnnouncements={setAnnouncements}
        />
      </Page>
      <Button
        style={{
          ...styles.switchBtn,
          flexDirection: 'row-reverse',
        }}
        title={t('IL.SwitchFactories')}
        medium
        activeOpacity={0.8}
        octicons="pencil"
        octiconsColor={colors.white}
        octiconsSize={20 * BW()}
        styleIcon={{
          marginEnd: 6 * BW(),
          fontSize: 14 * BW(),
        }}
        styleText={{color: colors.white}}
        onPress={() => NavigationService.navigate('SwitchFactories')}
      />
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
    switchBtn: {
      backgroundColor: colors.secondaryColor,
      width: '90%',
      height: 'auto',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 20 * BW(),
      marginVertical: 12 * BH(),
      padding: 8 * BH(),
    },
  });
