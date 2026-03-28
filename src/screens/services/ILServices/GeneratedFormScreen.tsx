import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, ImageBackground} from 'react-native';
import Input from '../../../component/input/Input';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../style/theme';

const GeneratedFormScreen = () => {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          styles={{
            padding: 8 * BW(),
            paddingTop: 16 * BW(),
          }}
          contentContainerStyle={{
            gap: 16 * BW(),
          }}
          header={<Header title={t('')} hideBack hideDrawer showBackDrawer />}
          withHeader></Page>
      </ImageBackground>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },
  });

export default GeneratedFormScreen;
