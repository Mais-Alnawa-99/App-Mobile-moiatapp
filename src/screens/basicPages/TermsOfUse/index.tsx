import React from 'react';
import {StyleSheet, View, ScrollView, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {isArabic} from '../../../locales';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import Text from '../../../component/Text';
import {BW} from '../../../style/theme';

export default function TermsOfUse1(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const renderBullet = (text: string) => (
    <View style={style.bulletRow}>
      <Text h4 style={style.bulletText}>
        {text}
      </Text>
    </View>
  );

  const bulletKeys = ['1', '2', '3', '4', '5'];

  return (
    <View style={style.appcontainer}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{height: '100%', width: '100%'}}>
        <Page
          withStatusBar
          ttsScopeId="TermsOfUse1-scope"
          styles={{padding: 8 * BW(), paddingTop: 16 * BW()}}
          contentContainerStyle={{gap: 16 * BW()}}
          header={
            <Header
              title={t('TermsOfUse1.title')}
              hideBack
              hideDrawer
              showBackDrawer
            />
          }
          withHeader>
          <View style={{gap: 8 * BW()}}>
            <Text h4>{t('TermsOfUse1.intro')}</Text>
            <Text h4>{t('TermsOfUse1.warning')}</Text>
            {bulletKeys.map(key =>
              renderBullet(t(`TermsOfUse1.points.${key}`)),
            )}
          </View>
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
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8 * BW(),
      borderColor: colors.gray,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      paddingHorizontal: 10 * BW(),
      borderRadius: 4 * BW(),
    },
    bulletText: {
      flex: 1,
    },
  });
