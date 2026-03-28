import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Linking,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  ACR_VALUES_MOBILE,
  ACR_VALUES_WEB,
  AUTH_URL,
  REDIRECT_URL,
  RESPONSE_TYPE,
  SCOPE,
  UAE_PASS_CLIENT_ID,
  UAE_PASS_CLIENT_SECRET,
  UAE_PASS_PACKAGE_ID,
  URL_SCHEME,
  HOST_SUCCESS,
  HOST_FAILURE,
  updateURLParameter,
  UAE_PASS_QA_PACKAGE_ID,
  UAE_PASS_APP_ID,
} from './UaePassConstants';
import {getParamsFromUrl} from '../../../component/Generalfunction';
import NavigationService from '../../../navigation/NavigationService';
import {saveAuthCode} from '../../../redux/reducers/UaePass/slice/uaePassAuthCode';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import Loader from '../../../component/Loader';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {AppInstalledChecker} from 'react-native-check-app-install';
import {BW} from '../../../style/theme';
import {isArabic} from '../../../locales';
import {useTranslation} from 'react-i18next';
import {setModalData} from '../../../redux/reducers/General/modal';
import CustomStatusBar from '../../../component/Statusbar';
import {production} from '../../../../app.json';

function UaePassWebView(props: any): JSX.Element {
  const webViewRef = useRef<WebView | null>(null);
  const [successUrl, setSuccessUrl] = useState('');
  const [failureUrl, setFailureUrl] = useState('');
  const [isMyWebViewEnable, setIsMyWebViewEnable] = useState(false);
  const [isUaePassAppInstalled, setIsUaePassAppInstalled] = useState(true);
  const colors = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  let paramsRoute = props.route?.params;
  const getAuthUrl = (canOpen: boolean) => {
    return (
      AUTH_URL +
      '?redirect_uri=' +
      REDIRECT_URL +
      '&client_id=' +
      UAE_PASS_CLIENT_ID +
      '&response_type=' +
      RESPONSE_TYPE +
      '&state=' +
      UAE_PASS_CLIENT_SECRET +
      '&scope=' +
      SCOPE +
      '&acr_values=' +
      (canOpen ? ACR_VALUES_MOBILE : ACR_VALUES_WEB) +
      '&ui_locales=' +
      `${isArabic() ? 'ar' : 'en'}`
    );
  };
  const [webUrl, setWebUrlState] = useState(getAuthUrl(true));

  const setWebViewUrl = async (url: any) => {
    setWebUrlState(url);
  };
  const linkToUrl = async (url: string) => {
    Linking.openURL(url).catch(err => {});
  };

  const shouldStartLoadWithRequest = (request: any) => {
    if (request.url.startsWith('uaepass')) {
      let params: any = getParamsFromUrl(request.url);
      setSuccessUrl(decodeURIComponent(params?.successurl));
      setFailureUrl(decodeURIComponent(params?.failureurl));
      let url;
      if (!production) {
        url = request.url.replace('uaepass://', 'uaepassstg://');
      } else {
        url = request.url;
      }
      url = updateURLParameter(
        url,
        'successurl',
        URL_SCHEME + '://' + HOST_SUCCESS,
      );
      url = updateURLParameter(
        url,
        'failureurl',
        URL_SCHEME + '://' + HOST_FAILURE,
      );

      linkToUrl(url);
    }
    return (
      request.url.startsWith('https') ||
      request.url.startsWith('smartservicesmoiat')
    );
  };
  const [loader, setLoader] = useState(false);
  const _setModalData = () => {
    dispatch(
      setModalData({
        modalVisible: true,
        title: '',
        message: t('UAEPASSLoginCancelled'),
        fun: () => NavigationService.goBack(),
        showOtp: false,
        error: '',
        hideCancel: true,
      }),
    );
  };
  const showAlert = (withoutBack: boolean) => {
    Alert.alert(
      t(''),
      t('UAEPASSLoginCancelled'),
      [
        {
          text: t('OK'),
          onPress: withoutBack ? () => {} : () => NavigationService.goBack(),
        },
      ],
      {cancelable: false},
    );
  };
  const handleUrlOpen = (event: any) => {
    if (!event?.url) return;
    if (event.url.includes(URL_SCHEME)) {
      setLoader(true);
      if (event.url.includes(HOST_SUCCESS)) {
        setWebViewUrl(successUrl);
      } else if (event.url.includes(HOST_FAILURE)) {
        if (Platform.OS == 'android') {
          setWebViewUrl(failureUrl);
          _setModalData();
          // info('', strings('GENERAL.UAEPASSLoginCancelled'));
        } else {
          // info('', strings('GENERAL.UAEPASSLoginCancelled'));
          showAlert();
          setIsMyWebViewEnable(false);
        }
      }
    }
  };

  useEffect(() => {
    checkIsUaePassAppInstalled();
  }, []);

  const checkIsUaePassAppInstalled = async () => {
    if (Platform.OS === 'android') {
      AppInstalledChecker.checkPackageName(UAE_PASS_PACKAGE_ID)
        .then((isInstalled: any) => {
          setIsUaePassAppInstalled(isInstalled);
          setWebViewUrl(getAuthUrl(isInstalled));
        })
        .catch((er: any) => {});
    } else {
      // let canOpen: any = await Linking.canOpenURL('uaepassstg://');
      let canOpen: any = await Linking.canOpenURL(UAE_PASS_APP_ID);
      setIsUaePassAppInstalled(canOpen);
      setWebViewUrl(getAuthUrl(canOpen));
    }
  };

  useEffect(() => {
    setWebUrlState(getAuthUrl(isUaePassAppInstalled));
  }, [isUaePassAppInstalled]);

  useEffect(() => {
    Linking.getInitialURL()
      .then(ev => {
        if (ev) {
          handleUrlOpen(ev);
        }
      })
      .catch(err => {});
    const link = Linking.addEventListener('url', handleUrlOpen);

    return () => {
      link.remove();
    };
  }, [handleUrlOpen]);

  const onNavigationStateChange = (webViewState: any) => {
    let url = webViewState.url;

    let params: any = getParamsFromUrl(url);
    if (params && params?.code) {
      NavigationService.replace('UaePassLink', {
        ...paramsRoute,
        code: params?.code,
      });
      dispatch(saveAuthCode(params?.code));
      //   this.setState({isMyWebViewEnable: false});
    } else if (params && params.error) {
      if (params.error === 'cancelledOnApp') {
        setWebViewUrl(undefined);
        NavigationService.goBack();
        showAlert(true);
      }
      //   this.setState({isMyWebViewEnable: false});
    }
    // else if (url.includes('retry')) {
    //   if (Platform.OS == 'android') {
    //     setWebViewUrl(failureUrl);
    //     _setModalData();
    //   } else {
    //     showAlert();
    //     setIsMyWebViewEnable(false);
    //   }
    // }
  };
  let code = `
        let meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
        document.getElementsByTagName('head')[0].appendChild(meta);
`;

  return (
    <View style={styles.appContainer}>
      <CustomStatusBar />
      {/* <Header hideDrawer /> */}
      <Loader
        style={{width: !loader ? 0 : '100%', height: !loader ? 0 : '100%'}}
      />
      <WebView
        ref={ref => (webViewRef.current = ref)}
        renderLoading={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <ActivityIndicator style={{alignSelf: 'center'}} size={30} />
          </View>
        )}
        source={{uri: webUrl}}
        injectedJavaScript={code}
        onError={er => true}
        onMessage={event => {}}
        style={{width: loader ? 0 : '100%', height: loader ? 0 : '100%'}}
        startInLoadingState={true}
        javaScriptEnabled={true}
        onShouldStartLoadWithRequest={shouldStartLoadWithRequest}
        onNavigationStateChange={onNavigationStateChange}
        incognito={true}
        originWhitelist={[
          'https://*',
          'uaepass://*',
          'uaepassstg://*',
          'smartservicesmoiat://',
        ]}
      />
      {/* {!isUaePassAppInstalled && (
        <Button
          title={t('Install_UAE_Pass_App')}
          style={styles.installApp}
          onPress={() => installUAEPassApp()}
        />
      )} */}
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors.background,
      minHeight: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: 'white',
    },
    installApp: {
      width: 'auto',
      height: 'auto',
      padding: 10 * BW(),
      backgroundColor: '#eee',
      marginVertical: 30 * BW(),
      marginHorizontal: 20 * BW(),
    },
  });

export default UaePassWebView;
