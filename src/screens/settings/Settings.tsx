import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import Header from '../../component/Header';

import {BW} from '../../style/theme';
import {useTheme} from '@react-navigation/native';
import {_setLang} from '../Lang';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Page from '../../component/Page';
import Language from './Sections/Language';
import Biometric from './Sections/Biometric';
import Notification from './Sections/Notification';
import DarkMode from './Sections/DarkMode';
import Theme from './Sections/Theme';
import FontSize from './Sections/FontSize';

export default function Settings() {
  const {colors}: any = useTheme();

  const styles = getStyles(colors);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {fontSizeValue} = useAppSelector(state => state.fontSize);

  return (
    <View style={styles.appContainer}>
      <Page
        ttsScopeId="settings-scope"
        withStatusBar
        styles={{padding: 8 * BW()}}
        header={
          <Header
            title={t('settings')}
            hideBack
            showNotification
            hideDrawer
            showBackDrawer
          />
        }
        withHeader>
        {/* <Accessibility /> */}
        <Language />
        <Biometric />
        {/* <Notification /> */}
        <DarkMode />
        <Theme />
        <FontSize />
      </Page>
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },

    // row: {
    //   backgroundColor: '#fff',
    //   padding: 12 * BW(),
    //   marginVertical: 6 * BW(),
    //   borderRadius: 8 * BW(),
    //   alignItems: 'center',
    //   flexDirection: 'row',
    // },
    iconContainer: {
      width: 24 * BW(),
      height: 24 * BW(),
    },
    nextContainer: {
      width: 8 * BW(),
      height: 12 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: colors.lightPrimaryColor,
    },
    titleContainer: {
      flex: 1,
      marginStart: 12 * BW(),
    },

    font: {
      borderRadius: 50 * BW(),
      width: 20 * BW(),
      height: 20 * BW(),
      marginLeft: 10 * BW(),
    },
    A: {
      width: 33 * BW(),
      height: 33 * BW(),
      borderRadius: 5 * BW(),
      borderColor: colors.primaryColor,
      borderWidth: 1 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 65 * BW(),
      height: 32 * BW(),
      borderRadius: 15 * BW(),
      borderColor: colors.primaryColor,
      borderWidth: 1 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10 * BW(),
    },
  });
