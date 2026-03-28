import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  useColorScheme,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import CustomStatusBar from './Statusbar';
import {BH, BW} from '../style/theme';
import {useDrawerStatus} from '@react-navigation/drawer';
import {RefreshControl} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {setSetting} from '../redux/reducers/General/settings';
import {TTSScope} from './tts/screenTextRegistry';

type TypeProps = {
  styles?: StyleProp<ViewStyle>;
  withStatusBar?: Boolean;
  children?: React.ReactNode;
  backgroundColor?: string;
  barStyle?: string;
  withHeader?: boolean;
  scrollEnabled?: boolean;
  withOutDrawer?: boolean;
  header?: React.ReactNode;
  contentContainerStyle?: {};
  onRefresh?: () => void;
  withOutScrollView?: boolean;
  withForm?: boolean;
  hideBottomTab?: boolean;
  ttsScopeId?: string;
  ttsQuietMs?: number;
};
export default function Page({
  styles,
  withStatusBar,
  children,
  backgroundColor,
  barStyle,
  withHeader,
  header,
  scrollEnabled = true,
  contentContainerStyle,
  withOutDrawer,
  onRefresh,
  withOutScrollView,
  withForm,
  hideBottomTab,
  ttsScopeId,
  ttsQuietMs = 800,
  ...props
}: TypeProps): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const customStyle = getStyle(colors);
  let drawerStatus = null;

  if (!withOutDrawer) {
    drawerStatus = useDrawerStatus();
  }

  const [drawerBarStyle, setDrawerBarStyle] = useState(barStyle);
  const [drawerBackgroundColor, setDrawerBackgroundColor] = useState(
    colors.mainBackground,
  );
  const {settings}: any = useAppSelector(state => state.settings);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (drawerStatus != null && drawerStatus === 'open') {
      setDrawerBarStyle('light-content');
      setDrawerBackgroundColor(colors.backgroundDrawer);
    } else {
      setDrawerBarStyle(
        settings?.enabledDarkMode ? 'light-content' : 'dark-content',
      );
      setDrawerBackgroundColor(
        settings?.enabledDarkMode ? '#0f1214' : '#F5F7FA',
      );
    }
  }, [drawerStatus, settings?.enabledDarkMode]);

  const dispatch = useAppDispatch();

  const setIsDarkModeDefault = () => {
    if (isDarkMode && settings.enabledDarkMode == undefined) {
      dispatch(setSetting({enabledDarkMode: true}));
    }
  };
  useEffect(() => {
    setIsDarkModeDefault();
  }, []);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const parentNavigator = navigation.getParent();

      if (hideBottomTab) {
        parentNavigator?.setOptions({
          tabBarStyle: {display: 'none'},
        });
      } else {
        parentNavigator?.setOptions({
          tabBarStyle: {
            padding: 10 * BW(),
            minHeight: Platform.OS == 'android' ? 80 * BH() : 100 * BH(),
            paddingBottom: 16 * BW(),
          },
        });
      }
    }, [hideBottomTab]),
  );

  const headerNode =
    withHeader && header
      ? React.isValidElement(header) && ttsScopeId
        ? React.cloneElement(header as any, {
            showTTSButton: true,
            ttsScopeId,
          })
        : header
      : null;

  return (
    <>
      {withStatusBar && (
        <CustomStatusBar
          backgroundColor={
            backgroundColor ? backgroundColor : drawerBackgroundColor
          }
          barStyle={drawerBarStyle}
          withoutStatusbar={false}
        />
      )}
      {headerNode}
      <TTSScope scopeId={ttsScopeId ?? '_page_no_tts_'}>
        <View style={{...customStyle.container, ...styles}}>
          {withOutScrollView ? (
            children
          ) : (
            <ScrollView
              automaticallyAdjustKeyboardInsets={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              scrollEnabled={scrollEnabled}
              {...props}
              refreshControl={
                !!onRefresh ? (
                  <RefreshControl
                    refreshing={false}
                    tintColor={colors.primary}
                    onRefresh={onRefresh}
                  />
                ) : (
                  <></>
                )
              }
              contentContainerStyle={{
                paddingBottom: 16 * BW(),
                flexGrow: 1,
                ...contentContainerStyle,
              }}>
              {withForm ? (
                <KeyboardAvoidingView
                  behavior={'height'}
                  style={{
                    flexGrow: 1,
                  }}>
                  {children}
                </KeyboardAvoidingView>
              ) : (
                children
              )}
            </ScrollView>
          )}
        </View>
      </TTSScope>
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingHorizontal: 16 * BW(),
      width: '100%',
    },
  });
