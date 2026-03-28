import React, {useState, useEffect} from 'react';
import {ImageBackground, LayoutAnimation, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch} from '../../../../redux/store';
import Page from '../../../../component/Page';
import {BW} from '../../../../style/theme';
import Header from '../../../../component/Header';
import {isArabic} from '../../../../locales';
import Text from '../../../../component/Text';
import DashedLine from '../../../../component/DashedLine';
import VersionCard from './VersionCard';

export default function StandardsDetails(props: any): JSX.Element {
  const params = props.route?.params;
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const dispatch = useAppDispatch();
  const fields = [
    {label: t('Custom_Labels.StandardNumber'), value: params?.StandardNumber},
    {label: t('Custom_Labels.ICSNumber'), value: params?.ICSNumber},
    {
      label: t('Custom_Labels.StandardsTitleEnglish'),
      value: params?.TitleEnglish,
    },
    {
      label: t('Custom_Labels.StandardsTitleArabic'),
      value: params?.TitleArabic,
    },
    {
      label: t('Custom_Labels.StandardsAbstractEnglish'),
      value: params?.AbstractEnglish,
    },
    {
      label: t('Custom_Labels.StandardsAbstractArabic'),
      value: params?.AbstractArabic,
    },
    {label: t('Custom_Labels.StandardType'), value: params?.StandardType},
    {
      label: t('Custom_Labels.StandardsLegalStatus'),
      value: params?.LegalStatus,
    },
    {
      label: t('Custom_Labels.StandardsDocumentStatus'),
      value: params?.DocumentStatus,
    },
    {
      label: t('Custom_Labels.StandardsPublishDate'),
      value: params?.PublishDate?.split('T')[0],
    },
  ];
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
          styles={{padding: 8 * BW()}}
          header={
            <Header
              title={isArabic() ? params?.TitleArabic : params?.TitleEnglish}
              showNotification
              hideDrawer
              titleContainerStyle={{flex: 8}}
              style={{
                borderBottomColor: colors.gray,
                borderBottomWidth: 0.4 * BW(),
              }}
            />
          }
          withHeader>
          <View style={styles.card}>
            {fields.map((field, idx) => (
              <React.Fragment key={idx}>
                <View style={styles.row}>
                  <Text h4 bold>
                    {field.label}
                  </Text>
                  <Text h4>{field.value}</Text>
                </View>
                {idx !== fields.length - 1 && (
                  <DashedLine
                    style={{marginVertical: 0 * BW()}}
                    dashColor={colors.lightPrimaryColor}
                  />
                )}
              </React.Fragment>
            ))}
            <DashedLine
              style={{marginVertical: 0 * BW()}}
              dashColor={colors.lightPrimaryColor}
            />
            <VersionCard item={params} />
          </View>
        </Page>
      </ImageBackground>
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
      flexDirection: 'column',
      flex: 1,
    },
    card: {
      gap: 8 * BW(),
    },
    versionActions: {
      flexDirection: 'row',
      marginTop: 4 * BW(),
    },
    actionBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 24 * BW(),
      marginEnd: 6 * BW(),
      padding: 4 * BW(),
      backgroundColor: colors.secondaryColor,
    },
    previewBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 24 * BW(),
      marginEnd: 6 * BW(),
      padding: 4 * BW(),
      backgroundColor: colors.white,
      borderColor: colors.textPrimaryColor,
      borderWidth: 1 * BW(),
    },
  });
