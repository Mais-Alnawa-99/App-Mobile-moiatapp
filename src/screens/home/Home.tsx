import React, {useEffect} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Page from '../../component/Page';
import Header from '../../component/Header';
import LoginSection from './LoginSection';
import SearchSection from './SearchSection';
import ServiceCatalogSection from './ServiceCatalogSection';
import MostUsedServicesSection from './MostUsedServicesSection';
import HighlightsSection from './HighlightsSection';
import CustomerPulse from '../customerPulse/CustomerPulse';
import Button from '../../component/Button';
import NavigationService from '../../navigation/NavigationService';
import OpportunitiesSection from './OpportunitiesSection';

export default function Home(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  return (
    <View style={style.container}>
      <ImageBackground
        source={style.mainBackgroundImg.backgroundColor}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          ttsScopeId="home-scope"
          ttsQuietMs={2000}
          // styles={{paddingTop: 8 * BW()}}
          header={<Header hideBack showNotification showSearch showLang />}
          withHeader>
          <LoginSection />
          <SearchSection />
          {/* <StaticFormsBtn /> */}
          <Button
            title={t('home.serviceRequest')}
            onPress={() => {
              NavigationService.navigate('AddOpportunity');
            }}
          />

          <ServiceCatalogSection />

          <MostUsedServicesSection />
          <OpportunitiesSection />
          <HighlightsSection />
        </Page>
        <CustomerPulse />
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
    mainBackgroundImg: {
      backgroundColor: colors.mainBackgroundImg,
    },
  });
