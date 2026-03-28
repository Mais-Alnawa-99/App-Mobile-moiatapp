import React, {Fragment, useEffect, useState} from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Text from '../../../component/Text';
import {BH, BW} from '../../../style/theme';
import PageBg from '../../../component/PageBg';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import {isArabic} from '../../../locales';
import {URL} from '../../../redux/network/api';
import ServiceStats from './ServiceStats';
import NavigationService from '../../../navigation/NavigationService';

export default function OpenData(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const openDataItems = [
    {
      title: t('OpenDataObj.Page.InteractiveOpenData'),
      url: URL + '/open-data',
      toScreen: 'OpenDataMap',
    },
    {
      title: t('OpenDataObj.Page.NationalICV'),
      toScreen: 'NationalICV',
      url: URL + '/open-data/national-icv',
    },
    {
      toScreen: 'NotifiedBodies',
      title: t('OpenDataObj.Page.NotifiedBodies'),
      url: URL + '/open-data/notified-bodies',
    },
    {
      title: t('OpenDataObj.Page.HalalCertifiedBodies'),
      toScreen: 'HalalCertifiedBodies',
      url: URL + '/open-data/notified-bodies',
    },

    {
      title: t('OpenDataObj.Page.OpenDataPolicy'),
      url: URL + '/open-data/open-data-policy',
      toScreen: 'OpenDataPolicyScreen',
    },
    {
      title: t('OpenDataObj.Page.NationalAccreditationDepartment'),
      url: URL + '/open-data/national-accreditation-department',
      toScreen: 'ConformityAssessmentBodies',
    },
    {
      title: t('OpenDataObj.Page.ProposeOrRequestData'),
      url: URL + '/open-data/propose-or-request-data',
      toScreen: 'ProposeOrRequestData',
    },
    {
      title: t('OpenDataObj.Page.ProductConformity'),
      url: 'https://conformityhub.moiat.gov.ae/home',
    },
  ];

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="OpenData-scope"
        styles={{padding: 8 * BW()}}
        header={
          <Header showBackDrawer hideDrawer hideBack title={t('OpenData')} />
        }
        withHeader>
        <View style={{}}>
          <View
            style={{
              borderRadius: 8 * BW(),
              overflow: 'hidden',
              width: '100%',
              height: 250 * BW(),
              marginBottom: 6 * BW(),
            }}>
            <Image
              resizeMode="cover"
              source={require('../../../assets/OpenData.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
          </View>
          <Text h3 bold>
            {t('OpenDataObj.Page.Title')}
          </Text>
          <Text h4>{t('OpenDataObj.Page.Description')}</Text>

          <View style={{marginTop: 16 * BW(), gap: 16 * BW()}}>
            <ServiceStats />
            {openDataItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  item?.toScreen
                    ? NavigationService.navigate(item?.toScreen, {
                        title: item.title,
                      })
                    : Linking.openURL(item?.url);
                }}
                style={{
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  // paddingVertical: 4 * BW(),
                  // gap: 8 * BW(),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  backgroundColor: colors.white,
                  width: '100%',
                  minHeight: 50 * BH(),
                  borderRadius: 6 * BW(),
                  paddingHorizontal: 16 * BW(),
                  paddingVertical: 8 * BW(),
                }}>
                <Text h4 bold>
                  {item.title}
                </Text>
                {/* <AntDesign
                  name={'arrowright'}
                  size={14}
                  style={{
                    transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
                  }}
                  color={colors.secondaryColor}
                /> */}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {},
    title: {
      marginTop: 16 * BW(),
    },
    subtitle: {
      color: colors.textColor,
      marginBottom: 8 * BW(),
    },

    submit: {
      marginTop: 20 * BW(),
      backgroundColor: colors.secondaryColor,
      minHeight: 40 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
    },
  });
