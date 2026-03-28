import React from 'react';
import {StyleSheet} from 'react-native';
import {BW} from '../../style/theme';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import CustomStatusBar from '../../component/Statusbar';
import Header from '../../component/Header';

export default function DrawerHeader(props: any) {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();

  return (
    <>
      <CustomStatusBar
        withoutStatusbar
        backgroundColor={colors.backgroundDrawer}
      />
      <Header
        hideBack
        showDrawerClose
        hideDrawer
        draweHeader
        showNotification
        showSearch
        style={styles.headerContainer}
        hideProfile
        hideHome
        ttsScopeId="menus-scope"
        showTTSButton
        ttstext={` ${t('AboutUs')}. ${t('PrivacyPolicy')}. ${t(
          'TermsOfUse',
        )}. ${t('Programs')}. ${t('MakeItInTheEmirates')}. ${t(
          'OpenData',
        )}. ${t('TheGovernmentCharter')}. ${t('ApplicationTour')}. ${t(
          'settings',
        )}. `}
      />
    </>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      padding: 12 * BW(),
    },
    headerContainer: {
      width: '100%',
      backgroundColor: 'transparent',
      borderBottomWidth: 0 * BW(),
    },
    btn: {
      width: 35 * BW(),
      height: 35 * BW(),
      borderRadius: 0 * BW(),
      padding: 0,
      backgroundColor: colors.primaryColor,
      zIndex: 99,
    },
    containerIcon: {
      width: '100%',
      height: '100%',
    },
    styleIcon: {
      tintColor: colors.tintColorDrawerHeader,
      resizeMode: 'center',
      width: '100%',
      height: '100%',
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    logoContainer: {
      flex: 4,
      height: 60 * BW(),
      alignItems: 'flex-start',
      paddingEnd: 16 * BW(),
    },
    logoStyle: {
      resizeMode: 'contain',
      width: '70%',
    },
  });
