/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {I18nManager, Platform, StyleSheet, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import i18n from 'i18next';
import './src/locales';
import 'react-native-gesture-handler';

import {reduxStorage, store} from './src/redux/store';
import {clearLangValue, setLangValue} from './src/redux/reducers/General/lang';
import Loader from './src/component/Loader';
import {Provider} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AppNavigator from './src/navigation/AppNavigator';
import {initTheme} from './src/style/theme';
import reactotron from 'reactotron-react-native';
import WelcomePop from './src/screens/home/WelcomePop';
import {Theme} from './src/style/theme';
import Text from './src/component/Text';
function App(): React.JSX.Element {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage]: any = useState(undefined);
  const [showWelcomeAfterHome, setShowWelcomeAfterHome] = useState(false);
  const [themeSelected, setThemeSelected] = useState(Theme);
  // const [textSelected, setTextSelected] = useState(Text);

  const inialLang = async (isRestarted: boolean) => {
    let lang = await reduxStorage.getItem('lang');
    if (lang == null) {
      lang = 'ar';
    }
    if (lang != null) {
      await store.dispatch(setLangValue(lang));
      if (lang === 'ar' || lang == 'ur') {
        if (Platform.OS !== 'ios') {
          I18nManager.allowRTL(true);
        }
        I18nManager.forceRTL(true);
        initTheme(true);
      } else {
        if (Platform.OS !== 'ios') {
          I18nManager.allowRTL(false);
        }
        I18nManager.forceRTL(false);
        initTheme(false);
      }
      await i18n.changeLanguage(lang);
    } else {
      store.dispatch(clearLangValue());
    }
    // store.dispatch(clearSkipedIntro());
    // store.dispatch(clearLangValue());

    await i18n.changeLanguage(lang);
    if (isRestarted === true) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    initLoading();
    inialLang(false);
  }, []);

  const initLoading = async () => {
    let isRestarted = await reduxStorage.getItem('isRestarted');
    if (isRestarted) {
      inialLang(isRestarted);

      setShowImage(false);
    } else {
      setShowImage(true);

      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  };

  return (
    <Provider store={store}>
      {/* {showWelcomeAfterHome && (
            <WelcomePop
             theme={themeSelected}
              onFinish={(choice) => {
                setShowWelcomeAfterHome(false);
              }}
            />
          )} */}
      <Loader isLoading={loading} showImage={showImage}>
        <View style={{flex: 1}}>
          <AppNavigator
            onReady={() => {
              setShowWelcomeAfterHome(true);
            }}
          />

          {showWelcomeAfterHome && (
            <WelcomePop
              theme={themeSelected}
              onFinish={choice => {
                setShowWelcomeAfterHome(false);
              }}
            />
          )}
        </View>
      </Loader>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
