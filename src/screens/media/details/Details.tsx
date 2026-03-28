import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import {BW} from '../../../style/theme';
import CustomImage from '../../../component/CustomImage';
import Text from '../../../component/Text';

export default function MediaDetails(props: any): JSX.Element {
  const params = props?.route?.params;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  return (
    <View style={style.container}>
      <Page
        withStatusBar
        styles={{padding: 8 * BW(), paddingBottom: 16 * BW()}}
        ttsScopeId="Details-scope"
        header={<Header title={t('Details')} hideDrawer showNotification />}
        withHeader>
        <CustomImage
          url={params?.FieldValues?.MainImage_FullUrl}
          fastImage
          style={{
            height: 200 * BW(),
            borderRadius: 15 * BW(),
            width: '100%',
            resizeMode: 'cover',
            minWidth: 150 * BW(),
          }}
        />
        <View style={{marginVertical: 12 * BW()}}>
          <Text h3 medium>
            {params?.FieldValues?.Title}
          </Text>
        </View>
        <View>
          <Text h4 style={{lineHeight: 24 * BW()}}>
            {params?.FieldValues?.BodyDescription}
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
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
