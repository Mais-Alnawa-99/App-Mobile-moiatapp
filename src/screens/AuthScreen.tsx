import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeBiometrics from 'react-native-biometrics';

import Text from '../component/Text';
import {useAppDispatch} from '../redux/store';
import Page from '../component/Page';
import {BW} from '../style/theme';
import {isArabic} from '../locales';
import NavigationService from '../navigation/NavigationService';
import Line from '../component/Line';
import {setAuthenticated} from '../redux/reducers/General/securityAuth';

export default function AuthScreen(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();
  const [available, setAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string | any>(null);

  const checkAvailable = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();

    if (!available) {
      setAvailable(false);
    } else {
      setAvailable(true);
      setBiometricType(biometryType);
    }
  };
  useEffect(() => {
    checkAvailable();
  }, []);

  const _auth = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const {success} = await rnBiometrics.simplePrompt({
      promptMessage: t('AuthenticateToAccess'),
    });

    if (success) {
      dispatch(setAuthenticated(true));
    }
  };
  useEffect(() => {
    _auth();
  }, []);

  return (
    <Page
      withStatusBar
      withOutScrollView
      withOutDrawer
      styles={{paddingHorizontal: 0}}>
      <View style={style.container}>
        <Image
          source={require('../assets/logo/logo.png')}
          style={{
            resizeMode: 'contain',
            width: 200 * BW(),
            height: 170 * BW(),
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50 * BW(),
          }}>
          {available && (Platform.OS === 'ios' || Platform.OS === 'android') ? (
            <>
              <TouchableOpacity onPress={() => _auth()}>
                {biometricType === 'FaceID' ? (
                  <Image
                    source={require('../assets/icons/face-id.png')}
                    style={{
                      resizeMode: 'contain',
                      width: 60 * BW(),
                      height: 60 * BW(),
                    }}
                  />
                ) : (
                  <Icon
                    name={'finger-print'}
                    size={45 * BW()}
                    color={colors.backgroundColor}
                  />
                )}
              </TouchableOpacity>
              <View
                style={[
                  style.row,
                  {width: '70%', marginTop: 26 * BW(), marginBottom: 20 * BW()},
                ]}>
                <Line
                  style={{
                    borderColor: colors.text + '55',
                    borderWidth: 0.3 * BW(),
                    flex: 1,
                  }}
                />
                <Text
                  h4
                  style={{
                    marginHorizontal: 20 * BW(),
                    color: colors.text + '99',
                  }}>
                  {t('OR')}
                </Text>
                <Line
                  style={{
                    borderColor: colors.text + '55',
                    borderWidth: 0.3 * BW(),
                    flex: 1,
                  }}
                />
              </View>
            </>
          ) : null}
          <View style={{marginHorizontal: 40 * BW()}}>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('UaePassWebView')}>
              <Image
                source={
                  isArabic()
                    ? require('../assets/login/AR_UAEPASS_Sign_in_Btn_Active.png')
                    : require('../assets/login/UAEPASS_Sign_in_Btn_Outline_Active.png')
                }
                style={style.uaepassLogin}
              />
            </TouchableOpacity>
            <Text
              h4
              medium
              style={{
                color: colors.textPrimaryColor,
                marginTop: 8 * BW(),
                textAlign: 'center',
              }}>
              {t('loginDescription')}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.mainBackground,
      paddingVertical: 40 * BW(),
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    uaepassLogin: {
      width: 300 * BW(),
      height: 45 * BW(),
      resizeMode: 'contain',
    },
  });
