import React from 'react';
import {ScrollView, Image, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Text from '../../../../component/Text';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import PageBg from '../../../../component/PageBg';
import {BW} from '../../../../style/theme';

const OpenDataPolicyScreen = () => {
  const {t} = useTranslation();

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="OpenDataPolicy-scope"
        styles={{padding: 8 * BW()}}
        header={
          <Header
            titleContainerStyle={{flex: 8}}
            title={t('OpenDataPolicy.BannerTitle')}
            hideDrawer
          />
        }
        withHeader>
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
            source={require('../../../../assets/OpenDataPolicy.jpg')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>

        <Text h3 bold>
          {t('OpenDataPolicy.PageTitle')}
        </Text>
        <Text h4>{t('OpenDataPolicy.PageIntro')}</Text>

        {[1, 2, 3, 4].map(i => (
          <View
            key={i}
            style={{flexDirection: 'row', gap: 12 * BW(), marginTop: 16}}>
            {/* <Image
              source={require('../../../assets/images/icon-placeholder.png')}
              style={{width: 24, height: 24}}
            /> */}
            <Text h4>{t(`OpenDataPolicy.Point${i}`)}</Text>
          </View>
        ))}

        <Text h3 bold style={{marginTop: 24 * BW()}}>
          {t('OpenDataPolicy.RightsTitle')}
        </Text>
        {[1, 2].map(i => (
          <Text h4 key={i}>
            {t(`OpenDataPolicy.Right${i}`)}
          </Text>
        ))}

        <Text h4 style={{marginTop: 12 * BW()}}>
          {t('OpenDataPolicy.ReusePoint1')}
        </Text>
        <Text h4 style={{marginTop: 12 * BW()}}>
          {t('OpenDataPolicy.ReusePoint2')}
        </Text>

        <Text h3 bold style={{marginTop: 24 * BW()}}>
          {t('OpenDataPolicy.ExceptionTitle')}
        </Text>
        <Text h4>{t('OpenDataPolicy.ExceptionDescription')}</Text>

        <Text h3 bold style={{marginTop: 24 * BW()}}>
          {t('OpenDataPolicy.ConditionTitle')}
        </Text>
        <Text h4>{t('OpenDataPolicy.ConditionDescription')}</Text>

        <Text h3 bold style={{marginTop: 24 * BW()}}>
          {t('OpenDataPolicy.MisuseTitle')}
        </Text>
        <Text h4>{t('OpenDataPolicy.MisuseDescription')}</Text>
      </Page>
    </PageBg>
  );
};

export default OpenDataPolicyScreen;
