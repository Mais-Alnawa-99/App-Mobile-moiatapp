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
import {
  GetCompleteProfile,
  checkComplete,
  getSsoToken,
} from '../../../redux/reducers/I-Services/thunk/sso';
import {setTokenData} from '../../../redux/reducers/User/userToken';
import {setData} from '../../../redux/reducers/User/signUpToken';
import {setUserILID} from '../../../redux/reducers/User/userILData';
import {_openModal} from '../../services/Eservices/ServiceForm';
import {Buffer} from 'buffer';
import {setTokenPayload} from '../../../redux/reducers/User/tokenPayload';
import {production} from '../../../../app.json';

function UaePassLink(props: any): JSX.Element {
  let params = props.route?.params;
  const {colors}: any = useTheme();
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

  const decodeJWT = (token: string) => {
    try {
      const [, payload] = token.split('.');
      if (!payload) throw new Error('Invalid JWT format');

      const json = Buffer.from(payload, 'base64').toString('utf8');

      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (params?.code !== undefined) {
      dispatch(getUaePassToken({code: params?.code}));
    }
  }, [params?.code]);

  useEffect(() => {
    if (accessTokenData !== undefined && accessTokenData !== '') {
      //  if (accessTokenData?.access_token) {
      // setTimeout(() => {
      //   NavigationService.navigate('WebViewScreen', {
      //     url: 'https://sso.moiat.gov.ae/Panel/UserProfile?userToken={userToken}&tokenExpiry={tokenExpiry}&lang=ar&isMobileApp=true',
      //     hideDrawer: true,
      //   });
      // }, 1000);
      dispatch(getUaePassUserInfo({token: accessTokenData?.access_token})).then(
        res => {
          if (res.meta.requestStatus == 'fulfilled') {
            let userInfo = {
              ...res?.payload,
              grant_type: 'UAEPass_uuid',
              client_id: 'MOIAT_Mobile',
              client_secret: 'client_secret_Moiat_Mobile_Stage_2025', //client_secret_Moiat_Mobile_Prod_2025
              scope: 'profile',
            };
            dispatch(setTokenPayload({tokenPayload: userInfo}));
            // let av = {
            //   grant_type: 'UAEPass_uuid',
            //   client_id: 'MOIAT_Mobile',
            //   client_secret: 'client_secret_Moiat_Mobile_Stage_2025',
            //   scope: 'profile',
            //   email: 'slymanaboobad@gmail.com',
            //   uuid: '0c519d0f-4c76-4ac6-b4fa-25fa64a6e851',
            //   fullnameEN: 'ghaze hamdan',
            //   fullnameAR: 'غازي حمدان',
            //   mobile: '993318981',
            //   idn: '7481254',
            // };

            dispatch(getSsoToken(userInfo)).then(res1 => {
              if (
                res1.meta.requestStatus === 'fulfilled' &&
                res1.payload.networkSuccess &&
                res1.payload?.access_token
              ) {
                const token = res1?.payload?.access_token;

                const header = {
                  authorization: 'Bearer ' + token,
                };
                const payload = decodeJWT(res1.payload?.access_token);
                if (payload == null) {
                  _openModal(
                    dispatch,
                    false,
                    false,
                    false,
                    <Text h4 style={{color: colors.red}}>
                      {t('IL.Error decoding JWT token')}
                    </Text>,
                  );
                  //  NavigationService.reset('dashboard');
                  return;
                }
                dispatch(
                  checkComplete({payload: {UserId: payload?.Id}, header}),
                ).then(res => {
                  if (res?.payload?.networkSuccess !== true) {
                    setErrorMsg('Invalid Request');
                  } else {
                    if (res?.payload?.isProfileComplete) {
                      dispatch(setUserILID({userId: payload?.Id}));
                      dispatch(
                        setTokenData({
                          tokenData: res1.payload,
                        }),
                      );

                      if (
                        (isArabic() &&
                          (userInfo?.fullnameAR || userInfo?.fullnameEN)) ||
                        (!isArabic() && userInfo?.fullnameEN)
                      ) {
                        dispatch(
                          setUserName({
                            userNameAR: fixName(
                              userInfo?.fullnameAR || userInfo?.fullnameEN,
                            ),
                            userNameEN: fixName(userInfo?.fullnameEN),
                          }),
                        );
                      }
                      dispatch(setAuthenticated(true));
                      dispatch(
                        setAuthValues({
                          token: res1.payload?.access_token,
                          userName:
                            isArabic() && !!userInfo?.fullnameAR
                              ? userInfo?.fullnameAR
                              : userInfo?.fullnameEN,
                          expiryDate: res1.payload?.expires_in,
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
                    } else {
                      dispatch(setUserILID({userId: payload?.Id}));
                      dispatch(
                        setTokenData({
                          tokenData: res1.payload,
                        }),
                      );
                      NavigationService.replace('UaePassSignup', {
                        data: {userId: payload?.Id},
                        userInfo,
                      });
                    }
                  }
                });
              } else {
                setErrorMsg('Invalid Request');
              }
            });
          }
        },
      );
    } else if (accessTokenData?.error_description) {
      setErrorMsg(accessTokenData?.error_description);
    }
    // }
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
