import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {isArabic} from '../../../locales';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import Text from '../../../component/Text';
import {BW} from '../../../style/theme';
import PrivacyPolicyContent from './PrivacyPolicyContent';

export default function PrivacyPolicy(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  return (
    <View style={style.appcontainer}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          ttsScopeId="PrivacyPolicy-scope"
          styles={{padding: 8 * BW(), paddingTop: 16 * BW()}}
          contentContainerStyle={{gap: 16 * BW()}}
          header={
            <Header
              title={t('PrivacyPolicy')}
              hideBack
              hideDrawer
              showBackDrawer
            />
          }
          withHeader>
          <PrivacyPolicyContent />
        </Page>
      </ImageBackground>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appcontainer: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
  });
