import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  FlatList,
  ImageBackground,
} from 'react-native';
import WebView from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

import NavigationService from '../../navigation/NavigationService';
import Header from '../../component/Header';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import Page from '../../component/Page';
import {BW} from '../../style/theme';

import {isArabic} from '../../locales';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Text from '../../component/Text';
import {useTranslation} from 'react-i18next';
import Button from '../../component/Button';
import ProfileDataSection from './Components/ProfileDataSection';
import {setActiveCat} from '../../redux/reducers/Services/slice/services';
import {
  setILNeedUserId,
  setNeedRefreshToken,
} from '../../redux/reducers/General/server';
import {baseEsevicesUrl} from '../../redux/network/apiEservices';
import {baseILUrl} from '../../redux/network/api_ILServices';
import {getUserProfile} from '../../redux/reducers/I-Services/thunk/sso';

const services = (t: any) => [
  {
    id: 'd5685023-9f9c-450a-a9c3-415af1c6c144',
    title: t('industrialServices'),
    icon: 'factory',
    enterUrl: baseILUrl,
    index: 2,
    toScreen: 'ILDashboard',
  },
  {
    id: '4f860e8c-53e3-4a66-852b-74c8e9d5d22d',
    title: t('conformityServices'),
    icon: 'file-check-outline',
    enterUrl: baseEsevicesUrl + '?lang=ar&isMobile=True',
    index: 3,
    toScreen: 'ESDashboard',
  },
  {
    id: '1768e3ba-55fd-4be9-8df2-2c4e808c70dc',
    title: t('standardsServices'),
    icon: 'microscope',
    enterUrl: baseEsevicesUrl + '?lang=ar&isMobile=True',
    index: 4,
    toScreen: 'ESDashboard',
  },
  {
    id: '0e9d9447-2733-4675-bd77-bc9aafe4cb13',
    title: t('nationalAccreditationRegistration'),
    icon: 'shield-check-outline',
    enterUrl: baseEsevicesUrl + '?lang=ar&isMobile=True',
    index: 5,
    toScreen: 'ESDashboard',
  },
  {
    id: '0e9d9447-2733-4675-bd77-bc9aafe4cb13',
    title: t('nationalAccreditationAccreditationNotification'),
    icon: 'shield-account-outline',
    enterUrl: 'https://na.moiat.gov.ae?lang=ar&isMobile=True',
    index: 6,
    toScreen: 'ESDashboard',
  },
];

function Dashboard(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const {isLoggedIn} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setNeedRefreshToken(true));
      dispatch(setILNeedUserId(true));
    }, []),
  );
  const {userILData, userId}: any = useAppSelector(store => store.userILData);

  useEffect(() => {
    dispatch(getUserProfile({userId: userId}));
  }, [isLoggedIn, userId]);

  const handleOpen = (item: any) => {
    if (!!item?.toScreen) {
      NavigationService.navigate(item?.toScreen, item);
    } else {
      NavigationService.navigate('WebViewScreen', {url: item?.enterUrl});
    }
  };
  const _onPressServiceCat = (item: any, index: number) => {
    dispatch(
      setActiveCat({
        activeType: item.id,
        activeBtn: index,
      }),
    );
    NavigationService.navigate('services', {item, index});
  };
  const renderItem = ({item, index}: any) => (
    <Animatable.View
      style={styles.card}
      animation={
        index % 2 == 0
          ? isArabic()
            ? 'fadeInRight'
            : 'fadeInLeft'
          : isArabic()
          ? 'fadeInLeft'
          : 'fadeInRight'
      }
      delay={100 * index}>
      <MaterialCommunityIcons
        name={item.icon}
        size={22 * BW()}
        color={colors.iconPrimaryColor}
        style={styles.icon}
      />
      <Text h4 medium style={styles.title}>
        {item.title}
      </Text>
      <View style={styles.btnGroup}>
        <Button
          style={{...styles.enterBtn, ...styles.btn}}
          styleText={styles.btnText}
          title={t('enter')}
          onPress={() => handleOpen(item)}
        />
        <View
          style={{
            width: 0,
            borderColor: '#D4DDEA',
            borderWidth: 0.6 * BW(),
            borderStyle: 'dashed',
          }}
        />
        <Button
          style={{...styles.serviceBtn, ...styles.btn}}
          styleText={styles.serviceBtnText}
          title={t('Services')}
          onPress={() => _onPressServiceCat(item, item.index)}
        />
      </View>
    </Animatable.View>
  );
  // let url = isArabic()
  //   ? `${SSO_URL}/api/Home/ClientList?userToken=${token}&tokenExpiry=${expiryDate}&lang=ar&isMobileApp=true`
  //   : `${SSO_URL}/api/Home/ClientList?userToken=${token}&tokenExpiry=${expiryDate}&lang=en&isMobileApp=true`;

  const data = services(t);

  return (
    <View style={styles.appContainer}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          ttsScopeId="dash-scope"
          styles={{
            paddingHorizontal: 16 * BW(),
            paddingTop: 8 * BW(),
          }}
          withOutScrollView
          withHeader
          header={
            <Header
              // title={title}
              hideBack
              showLang
              showSearch
              hideProfile
              // style={{
              //   borderBottomColor: colors.gray,
              //   borderBottomWidth: 0.6 * BW(),
              // }}
            />
          }>
          <ProfileDataSection />
          <View
            style={{
              marginTop: 16 * BW(),
            }}>
            <Text
              h4
              medium
              style={{color: colors.textPrimaryColor, marginBottom: 4 * BW()}}>
              {t('SSOTitle')}
            </Text>

            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                paddingBottom: 16 * BW(),
              }}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                gap: 8 * BW(),
              }}
            />
          </View>
          {/* <WebViewCustom
          url={
            isArabic()
              ? `${SSO_URL}/api/Home/ClientList?userToken=${token}&tokenExpiry=${expiryDate}&lang=ar&isMobileApp=true`
              : `${SSO_URL}/api/Home/ClientList?userToken=${token}&tokenExpiry=${expiryDate}&lang=en&isMobileApp=true`
          }
          setCanGoBack={setCanGoBack}
          webViewRef={webViewRef}
          setTitle={setTitle}
        /> */}
        </Page>
      </ImageBackground>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    container: {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: 'white',
    },
    card: {
      flex: 1,
      backgroundColor: colors.white,
      marginTop: 8 * BW(),
      padding: 8 * BW(),
      borderRadius: 8 * BW(),
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 100 * BW(),
      maxWidth: '49%',
    },
    icon: {
      marginBottom: 4 * BW(),
    },
    title: {
      textAlign: 'center',
      marginBottom: 8 * BW(),
      color: colors.textPrimaryColor,
    },
    btnGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8 * BW(),
    },
    btn: {
      paddingVertical: 4 * BW(),
      paddingHorizontal: 4 * BW(),
      borderRadius: 4 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      minHeight: 30 * BW(),
      width: 'auto',
    },
    enterBtn: {
      backgroundColor: 'transparent',
    },
    serviceBtn: {
      backgroundColor: 'transparent',
    },
    btnText: {
      color: colors.secondaryColor,
    },
    serviceBtnText: {
      color: colors.secondaryColor,
    },
  });

export default Dashboard;
