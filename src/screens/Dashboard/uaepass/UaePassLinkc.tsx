import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import {BW} from '../../../style/theme';
import reactotron from '../../../redux/reactotron';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {
  getUaePassToken,
  getUaePassUserInfo,
} from '../../../redux/reducers/UaePass/thunk/uaePass';
import {setAuthValues, setUserName} from '../../../redux/reducers/User/startup';
import Loader from '../../../component/Loader';
import Text from '../../../component/Text';
import NavigationService from '../../../navigation/NavigationService';
import Button from '../../../component/Button';
import {useTranslation} from 'react-i18next';
import Header from '../../../component/Header';
import {isArabic} from '../../../locales';
import {setWebviewUrl} from '../../../redux/reducers/General/webview';
import {setAuthenticated} from '../../../redux/reducers/General/securityAuth';
import {SSO_URL} from '../../../redux/network/api';
import {authService} from '../authService';
import {setSelectedService} from '../../../redux/reducers/Services/slice/selectedService';

function UaePassLink(props: any): JSX.Element {
  let params = props.route?.params;
  const {colors} = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const [errorMsg, setErrorMsg] = useState('');
  const [chooseLinking, setChooseLinking] = useState(false);

  const dispatch = useAppDispatch();
  const {authCode} = useAppSelector(store => store.UaePass.uaePassAuthCode);

  const {item} = useAppSelector(store => store.services.selectedService);

  const {accessTokenData, accessTokenLoader}: any = useAppSelector(
    store => store.UaePass.uaePassTokenSlice,
  );
  const {info, infoLoader}: any = useAppSelector(
    store => store.UaePass.uaePassInfoSlice,
  );
  const {verfiyDigital, verfiyDigitalLoader} = useAppSelector(
    store => store.UaePass.uaePassVerfiyDigital,
  );

  useEffect(() => {
    if (params?.code !== undefined) {
      dispatch(getUaePassToken({code: params?.code}));
    }
  }, [params?.code]);

  let loginUrl = {
    ar: `${SSO_URL}/UAEPassLogin?state=%2FUAEPass%2FMobile%3Fclient_id%3DIL&lang=ar&isMobileApp=true&token=`,
    en: `${SSO_URL}/UAEPassLogin?state=%2FUAEPass%2FMobile%3Fclient_id%3DIL&lang=en&isMobileApp=true&token=`,
  };

  let codeJs = `let scriptElements = document.querySelectorAll('script[type="text/javascript"]');
              let filteredScripts = Array.from(scriptElements).filter(function(scriptElement) {
                  return scriptElement.innerHTML.includes('window.addEventListener("flutterInAppWebViewPlatformReady"');
              });
              filteredScripts.forEach(function(scriptElement) {
                  let scriptContent = scriptElement.innerHTML;
                  let argsMatch = scriptContent.match(/const args = ({.*?});/);
                  if (argsMatch) {
                      let args = JSON.parse(argsMatch[1]); 
                      let jsonArgs = JSON.stringify(args); 
                      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'uaePassLoggedIn', data: jsonArgs })); 
                  }
              });`;

  const onMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message?.type === 'uaePassLoggedIn') {
        const args = JSON.parse(message?.data);
        if (!!args?.UserToken && !!args?.UserToken && !!args?.ExpiryDate) {
          dispatch(setAuthenticated(true));
          dispatch(
            setAuthValues({
              token: args?.UserToken,
              userName: args?.FullName,
              expiryDate: args?.ExpiryDate,
            }),
          );

          if (item != null) {
            let itemTemp = item;

            dispatch(setSelectedService(null));
            NavigationService.reset('dashboard');
            setTimeout(
              () =>
                NavigationService.navigate('ServiceDetails', {
                  item: itemTemp,
                }),
              50,
            );
          } else {
            NavigationService.reset('dashboard');
          }
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (accessTokenData !== undefined && accessTokenData !== '') {
      if (accessTokenData?.access_token) {
        NavigationService.replace('WebViewScreen', {
          url: isArabic()
            ? loginUrl.ar + accessTokenData?.access_token
            : loginUrl.en + accessTokenData?.access_token,
          hideDrawer: true,
          code: codeJs,
          onMessage: onMessage,
          withOutDrawer: true,
        });
        // setTimeout(() => {
        //   NavigationService.navigate('WebViewScreen', {
        //     url: 'https://sso.moiat.gov.ae/Panel/UserProfile?userToken={userToken}&tokenExpiry={tokenExpiry}&lang=ar&isMobileApp=true',
        //     hideDrawer: true,
        //   });
        // }, 1000);
        setTimeout(() => {
          dispatch(
            getUaePassUserInfo({token: accessTokenData?.access_token}),
          ).then(res => {
            if (res.meta.requestStatus == 'fulfilled') {
              let userInfo = res?.payload;
              if (
                (isArabic() && userInfo?.fullnameAR) ||
                (!isArabic() && userInfo?.fullnameEN)
              ) {
                dispatch(
                  setUserName({
                    userNameAR: fixName(userInfo?.fullnameAR),
                    userNameEN: fixName(userInfo?.fullnameEN),
                  }),
                );
              }
            }
          });
        }, 3000);
      } else if (accessTokenData?.error_description) {
        setErrorMsg(accessTokenData?.error_description);
      }
    }
  }, [accessTokenData]);
  function fixName(name: string) {
    if (!!name) {
      let userName = name.replace(/,/g, ' ');
      userName = userName.replace(/\s+/g, ' ');
      userName = userName.trim();
      return userName;
    } else {
      return name;
    }
  }

  const {isLoggedIn} = useAppSelector(store => store.auth);

  return (
    <View style={{flex: 1}}>
      <Header hideDrawer hideBack />

      <Loader
        style={{backgroundColor: 'transparent'}}
        isLoading={accessTokenLoader || infoLoader || verfiyDigitalLoader}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {errorMsg ? (
            <>
              <Text h4>{errorMsg}</Text>
              <Button
                onPress={() => NavigationService.goBack()}
                title={t('backtoLogin')}
                style={styles.mainBtn}
                styleText={{color: '#fff'}}
              />
              <Text></Text>
            </>
          ) : chooseLinking ? (
            <View style={{paddingHorizontal: 10 * BW()}}>
              <Text h4 bold>
                {t('UAEPASSLinking')}
              </Text>

              <View
                style={{
                  alignItems: 'center',
                  marginTop: 20 * BW(),
                }}>
                <Text> {t('noAccountInSystem')}</Text>
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Button
                      onPress={() =>
                        NavigationService.navigate('Login', {
                          from: 'uaePassNewUser',
                          ...params,
                        })
                      }
                      title={t('yes')}
                      style={styles.mainBtn}
                      styleText={{color: '#fff'}}
                    />
                    <Button
                      onPress={() =>
                        NavigationService.navigate('UaePassSignup', params)
                      }
                      title={t('no')}
                      style={styles.mainBtn}
                      styleText={{color: '#fff'}}
                    />
                  </View>
                  <View style={{alignItems: 'center', marginTop: 20 * BW()}}>
                    <Text h4 style={{textAlign: 'center'}}>
                      {t('linkAccount')}
                    </Text>
                    <Text h4 style={{textAlign: 'center'}}>
                      {t('createUaepassAccount')}
                    </Text>
                    <Text
                      h4
                      style={{textAlign: 'center', marginTop: 20 * BW()}}>
                      {t('noteUaepass')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </Loader>
    </View>
  );
}

export default UaePassLink;

const getStyle = (colors: any) =>
  StyleSheet.create({
    mainBtn: {
      backgroundColor: colors.primaryColor,
      width: 'auto',
      height: 'auto',
      padding: 8 * BW(),
      marginTop: 8 * BW(),
      marginLeft: 12 * BW(),
      alignSelf: 'center',
      borderRadius: 8 * BW(),
    },
  });
