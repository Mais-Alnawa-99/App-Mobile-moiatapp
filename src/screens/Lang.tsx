import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  I18nManager,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import RNRestart from 'react-native-restart';

import Button from '../component/Button';
import {BH, BW} from '../style/theme';
import {reduxStorage, store, useAppSelector} from '../redux/store';
import i18n from 'i18next';
import Text from '../component/Text';
import Page from '../component/Page';
import {setLangValue} from '../redux/reducers/General/lang';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const _setLang = async (lang: string) => {
  const isLangRTL = lang === 'ar';

  await reduxStorage.setItem('lang', lang);
  await reduxStorage.setItem('isRestarted', true);
  await reduxStorage.setItem('skipSecurityOnce', '1');

  await i18n.changeLanguage(lang);

  if (Platform.OS !== 'ios') {
    await I18nManager.allowRTL(isLangRTL);
  }
  await I18nManager.forceRTL(isLangRTL);

  await sleep(400);

  RNRestart.restart();
};

function Lang(): JSX.Element {
  const {colors} = useTheme();
  const {isLandscape} = useAppSelector(state => state.dimensions);
  const styles = getStyle(colors, isLandscape);

  return (
    <View style={styles.appContainer}>
      <LinearGradient
        colors={[
          styles.white.color,
          styles.white.color,
          styles.lightPrimaryColor.color,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0.0581, 0.481, 0.9984]}
        style={styles.container}>
        <Page withStatusBar withOutDrawer>
          <Animatable.View
            duration={1000}
            delay={200}
            animation={'fadeInDownBig'}
            style={styles.logoContainer}>
            <Image
              source={require('../assets/logo/logo.png')}
              style={{
                width: 300 * BW(),
                height: 200 * BH(),
                resizeMode: 'contain',
              }}
            />
            <Image
              source={require('../assets/logo/stars1.png')}
              style={{
                width: 300 * BW(),
                height: 150 * BH(),
                resizeMode: 'contain',
                marginTop: 16 * BW(),
              }}
            />
          </Animatable.View>
          <Animatable.View
            duration={1000}
            delay={200}
            animation={'fadeInUpBig'}
            style={{flex: 1}}>
            <View style={styles.langView}>
              <Text medium h3 en style={{color: colors.primary}}>
                Choose your preferred Language
              </Text>
              <Text
                ar
                medium
                h3
                style={{marginTop: 8 * BW(), color: colors.primary}}>
                اختر لغتك المفضلة
              </Text>
            </View>
            <View style={styles.buttonsView}>
              <Button
                h3
                ar
                medium
                style={styles.buttonStyle}
                title={'عربي'}
                styleIcon={styles.styleIcon}
                styleText={{...styles.styleText, marginTop: -6 * BW()}}
                onPress={() => {
                  _setLang('ar');
                }}
              />
              <Button
                h3
                medium
                en
                title={'English'}
                style={styles.buttonStyle}
                styleText={styles.styleText}
                onPress={() => {
                  _setLang('en');
                }}
                styleIcon={styles.styleIcon}
              />
            </View>
          </Animatable.View>
        </Page>
      </LinearGradient>
    </View>
  );
}

const getStyle = (colors: any, isLandscape: boolean) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    logoContainer: {
      alignItems: 'center',
      flex: 1,
      marginTop: 14 * BW(),
    },
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: isLandscape ? 'row' : 'column',
      alignItems: 'center',
    },
    langView: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30 * BW(),
    },

    buttonStyle: {
      height: 60 * BH(),
      width: 120 * BW(),
      marginHorizontal: 5 * BW(),
      backgroundColor: colors.primary,
      borderRadius: 40 * BW(),
      padding: 4 * BW(),
      flexDirection: 'column-reverse',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
    },
    styleIcon: {
      width: 35 * BW(),
      height: 35 * BW(),
    },
    buttonsView: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 30 * BW(),
    },
    styleText: {
      color: colors.mainWhite,
    },
    white: {
      color: colors.white,
    },
    lightPrimaryColor: {
      color: colors.lightPrimaryColor,
    },
  });

export default Lang;
