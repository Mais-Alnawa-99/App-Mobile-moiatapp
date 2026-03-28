import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  reduxStorage,
  store,
  useAppDispatch,
  useAppSelector,
} from '../redux/store';
import {AppState, useColorScheme} from 'react-native';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import CustomDrawer from './Drawer/Drawer';
import LanguageNavigator from './LanguageNavigator';
import IntroPage from '../screens/intro/IntroPage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Bottomsheet from '../component/Bottomsheet';
import CustomModal from '../component/Modal';
import Loader from '../component/Loader';
import {getResourceKeyValues} from '../redux/reducers/E-Services/thunk/resourceKeyValues';

import {navigationRef} from './NavigationService';
import {darkTheme, Theme} from '../style/theme';

import AuthenticationPage from '../screens/Dashboard/AuthenticationPage';
import {setAuthenticated} from '../redux/reducers/General/securityAuth';
import SecurityNavigator from './SecurityNavigator';
import {setStackIndex} from '../redux/reducers/General/navigator';
import {setUserILID} from '../redux/reducers/User/userILData';
import FavoritesInitializer from '../screens/services/favouriteServices/FavouriteLayout';
import WelcomePop from "../screens/home/WelcomePop";
import Text from "../component/Text";
const initTheme = async (
  selectedTheme: any,
  theme: any,
  isDarkMode: any,
  settings: any,
  setThemeSelected: any,
) => {
  let updatedTheme = {...Theme};

  if (!!selectedTheme) {
    if (theme === 'brown') {
      updatedTheme.colors.secondaryColor = '#C79D65';
      updatedTheme.colors.lightSecondaryColor = '#D7BC6D';
    }
    if (theme === 'red') {
      updatedTheme.colors.secondaryColor = '#D83731';
      updatedTheme.colors.lightSecondaryColor = '#F2A1A0';
    }
    if (theme === 'green') {
      updatedTheme.colors.secondaryColor = '#3F8E50';
      updatedTheme.colors.lightSecondaryColor = '#8FCBA3';
    }
  }
  updatedTheme.colors = {
    ...updatedTheme.colors,
    ...Theme.colors,
  };
  updatedTheme.dark = false;
  if (
    (isDarkMode && settings.enabledDarkMode == undefined) ||
    !!settings.enabledDarkMode
  ) {
    updatedTheme.dark = true;
    updatedTheme.colors = {
      ...updatedTheme.colors,
      ...darkTheme,
    };
  }
  setThemeSelected(updatedTheme);
};

const AppNavigator = ({ onReady }: { onReady?: () => void }) => {
  const {selectedLang} = useAppSelector(state => state.lang);
  const {skipedIntro} = useAppSelector(state => state.intro);
  const {theme, selectedTheme} = useAppSelector(state => state.theme);
  const {authenticated} = useAppSelector(state => state.securityAuth);

  const {settings}: any = useAppSelector(state => state.settings);

  const [themeSelected, setThemeSelected] = useState(Theme);
  const [loading, setLoading] = useState(true);
  const {loadingModal} = useAppSelector(state => state.loader);
  const isDarkMode = useColorScheme() === 'dark';
  const [hasLangSet, setHasLangSet] = useState(false);
  const [homePageReady, setHomePageReady] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [showWelcomeAfterHome, setShowWelcomeAfterHome] = useState(false);

  


    useEffect(() => {
    
    if (authenticated && hasLangSet && skipedIntro && !homePageReady) {
      setHomePageReady(true);
      if (onReady) {
        onReady(); 
      }
    }
  }, [authenticated, hasLangSet, skipedIntro, homePageReady, onReady]);
  useEffect(() => {
    (async () => {
      let lang = await reduxStorage.getItem('lang');
      setHasLangSet(!!lang);
    })();
  }, []);
  const dispatch = useAppDispatch();
  useEffect(() => {
    initTheme(selectedTheme, theme, isDarkMode, settings, setThemeSelected);
  }, [theme, selectedTheme, settings.enabledDarkMode, isDarkMode, settings]);

  const getInitialRoot = () => {
    if (loading) {
      return <Loader isLoading={loading} />;
    } else {
      if (!authenticated) {
        return <SecurityNavigator />;
      } else {
        if (!hasLangSet) {
          return <LanguageNavigator />;
        } else if (!skipedIntro) {
          return <IntroPage />;
        } else {
          return <CustomDrawer />;
        }
      }
    }
  };

  const [idleTime, setIdleTime] = useState(0);
  let interval: any = null;
  const IDLE_TIME_LIMIT = 20 * 60;

  const resetIdleTimer = () => {
    setIdleTime(0);
    clearInterval(interval);
    interval = setInterval(() => {
      setIdleTime(prevTime => prevTime + 1);
    }, 1000);
  };
  let backgroundTime: any = new Date();
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        resetIdleTimer();
        const now: any = new Date();
        const diffInSeconds = Math.floor((now - backgroundTime) / 1000);
        backgroundTime = new Date();

        if (diffInSeconds >= IDLE_TIME_LIMIT) {
          initAuth();
        }
      }
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // initAuth();
        backgroundTime = new Date();
      }
    });
    resetIdleTimer();
    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (idleTime >= IDLE_TIME_LIMIT && authenticated) {
      initAuth();
      setIdleTime(0);
    }
  }, [idleTime]);

  useEffect(() => {
    initAuth();
    // dispatch(setUserILID({userId: '4DEF6CD6-5ABF-4232-BB3A-C886617858EA'}));
  }, []);

  const initAuth = async () => {
    _authenticate();
  };

  const _authenticate = async () => {
    const skipOnce = await reduxStorage.getItem('skipSecurityOnce');
    if (skipOnce) {
      await reduxStorage.removeItem('skipSecurityOnce');
      dispatch(setAuthenticated(true));
      setLoading(false);
      return;
    }

    const isLoggedInVar = store.getState().auth.isLoggedIn;

    if (
      (!settings.enabledBiometric || settings.enabledBiometric == undefined) &&
      !isLoggedInVar
    ) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setAuthenticated(false));
    }
    setLoading(false);
  };

  const _getResourceKeyValues = () => {
    dispatch(getResourceKeyValues()).then(async res => {
      if (res.meta.requestStatus == 'fulfilled') {
        const result: any = Object.values(res.payload).reduce(
          (acc: any, item: any) => {
            if (!acc[item.category]) {
              acc[item.category] = {};
            }
            acc[item.category][item.key] = item.value;
            return acc;
          },
          {},
        );

        let lang =
          (await reduxStorage.getItem('lang')) ||
          store.getState().lang.selectedLang;
        if (lang === 'ar') {
          i18n.addResourceBundle('ar', 'translation', {...result}, true, true);
        } else {
          i18n.addResourceBundle('en', 'translation', {...result}, true, true);
        }

        await i18n.changeLanguage(lang);
      }
    });
  };
  function walk(s: any): number {
    if (!s || !s.routes || s.index == null) return 0;
    const route = s.routes[s.index];

    if (s.type === 'tab' || s.type === 'drawer') {
      return walk(route.state);
    }

    if (s.type === 'stack') {
      if (route.state) return walk(route.state);

      return s.index;
    }

    return 0;
  }
  useEffect(() => {
    _getResourceKeyValues();
  }, []);
  return (
    <NavigationContainer
     
      ref={navigationRef}
      theme={themeSelected}
      onStateChange={state => {

    const routes = state?.routes;
    const index = state?.index ?? 0;
    const currentRoute = routes ? routes[index]?.name : null;

    if (
      currentRoute === "CustomDrawer" &&   
      !hasShownWelcome
    ) {
      onReady();
      setHasShownWelcome(true);
    }

    const ind = walk(state);
    store.dispatch(setStackIndex(ind));
  }}>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
        onTouchEnd={() => {
          setIdleTime(0);
        }}>
        <Bottomsheet />
        <CustomModal />
        <FavoritesInitializer />

        {getInitialRoot()}
        <AuthenticationPage />
        
        <Loader isLoading={loadingModal} modal />
         {/* {showWelcomeAfterHome && (
          <WelcomePop
            text={Text}
            theme={themeSelected}
            onFinish={(choice) => {
              setShowWelcomeAfterHome(false);
            }}
          />
        )} */}
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
export default AppNavigator;
