import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import {BW} from '../../../style/theme';
import NavigationService from '../../../navigation/NavigationService';
import {isArabic} from '../../../locales';
import Text from '../../../component/Text';

export default function LoginScreen(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  return (
    <View style={style.container}>
      <Page
        withStatusBar
        ttsScopeId="login-scope"
        withOutScrollView
        header={
          <Header
            hideBack
            showLogo
            hideBackDrawer
            showNotification
            showSearch
            showLang
          />
        }
        withHeader>
        <View style={style.container}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('UaePassWebView')}>
            <Image
              source={
                isArabic()
                  ? require('../../../assets/login/AR_UAEPASS_Sign_in_Btn_Active.png')
                  : require('../../../assets/login/UAEPASS_Sign_in_Btn_Outline_Active.png')
              }
              style={style.uaepassLogin}
            />
          </TouchableOpacity>

          <Text
            h4
            medium
            style={{
              color: colors.textPrimaryColor,
              marginTop: 16 * BW(),
              paddingHorizontal: 20 * BW(),
              textAlign: 'center',
            }}>
            {t('loginDescription')}
            {/* UAEPASSLogin */}
          </Text>
        </View>
      </Page>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainBackgroundImg: {
      backgroundColor: colors.mainBackgroundImg,
    },

    uaepassLogin: {
      width: 320 * BW(),
      height: 48 * BW(),
      marginTop: 4 * BW(),
      resizeMode: 'contain',
    },
  });
