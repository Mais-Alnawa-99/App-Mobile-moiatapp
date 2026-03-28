import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {BW} from '../../style/theme';
import {useTheme} from '@react-navigation/native';
import Text from '../../component/Text';
import {useTranslation} from 'react-i18next';
import {isArabic} from '../../locales';

export default function OpportunitiesSection(): JSX.Element {
  const {colors}: any = useTheme();
  const {t} = useTranslation();
  const styles = getStyle(colors);
  return (
    <View style={{paddingVertical: 30 * BW()}}>
      <Text style={styles.sectionTitle}>{t('opportunities.sectionTitle')}</Text>
      <Text style={styles.sectionSubtitle}>
        {t('opportunities.sectionSubtitle')}{' '}
      </Text>
      <View>
        <ScrollView
          contentContainerStyle={{
            gap: 10 * BW(),
          }}>
          <View style={styles.row}>
            <Card
              title={t('opportunities.serviceIndustrial')}
              text={t('opportunities.serviceIndustrialDesc')}
              extraText={t('opportunities.exploreOpportunities')}
              icon={require('../../assets/opportunities/setting.png')}
            />

            <Card
              title={t('opportunities.industrialOpportunities')}
              text={t('opportunities.industrialOpportunitiesDesc')}
              extraText={t('opportunities.exploreOpportunities')}
              icon={require('../../assets/opportunities/search-status.png')}
            />
          </View>

          <View style={styles.row}>
            <Card
              title={t('opportunities.nationalEmpowermentCenter')}
              text={t('opportunities.nationalEmpowermentCenterDesc')}
              icon={require('../../assets/opportunities/medal-star.png')}
              extraText={t('opportunities.getStarted')}
            />

            <Card
              title={t('opportunities.industryAnalytics')}
              text={t('opportunities.industryAnalyticsDesc')}
              icon={require('../../assets/opportunities/chart.png')}
              extraText={t('opportunities.viewIndicators')}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function Card({title, text, extraText, icon}) {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  return (
    <TouchableOpacity style={styles.card}>
      <ImageBackground
        source={require('../../assets/opportunities/Frame.png')}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        {icon && (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        )}

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <Text style={styles.text} numberOfLines={3}>
            {text}
          </Text>
        </View>

        {extraText && (
          <View style={styles.extraContainer}>
            {isArabic() ? (
              <>
                <Image
                  source={require('../../assets/opportunities/Vector.png')}
                  style={styles.extraIcon}
                  resizeMode="contain"
                />
                <Text style={styles.extraText}>{extraText}</Text>
              </>
            ) : (
              <>
                <Text style={styles.extraText}>{extraText}</Text>
                <Image
                  source={require('../../assets/opportunities/Vector.png')}
                  style={styles.extraIcon}
                  resizeMode="contain"
                />
              </>
            )}
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    fullBackground: {
      flex: 1,
    },

    sectionTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.primary,
      direction: isArabic() ? 'rtl' : 'ltr',
      top: 12 * BW(),
    },
    sectionSubtitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.primary,
      direction: isArabic() ? 'rtl' : 'ltr',
      marginBottom: 16,
      top: 8 * BW(),
    },

    extraText: {
      fontSize: 14,
      color: colors.primary,

      fontWeight: '700',
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10 * BW(),
    },

    card: {
      height: 250 * BW(),

      flex: 1,
      borderColor: colors.white,
      borderWidth: 1,
      borderRadius: 15,
      flexDirection: isArabic() ? 'row-reverse' : 'row',
    },

    title: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.primary,
      alignSelf: 'flex-start',
    },

    text: {
      fontSize: 13,
      color: colors.primary,
      alignSelf: 'flex-start',
      marginTop: -2 * BW(),
    },

    content: {
      flex: 1,
      marginTop: 150,
      // alignItems: isArabic() ? "flex-end" : "flex-start",
    },
    icon: {
      width: 28 * BW(),
      height: 28 * BW(),
      position: 'absolute',
      bottom: 210 * BW(),
      direction: isArabic() ? 'rtl' : 'ltr',
    },

    imageBackground: {
      flex: 1,
      justifyContent: 'flex-end',
    },

    imageStyle: {
      borderRadius: 15,
    },
    extraContainer: {
      flexDirection: isArabic() ? 'row-reverse' : 'row',
      alignItems: 'center',
    },

    extraIcon: {
      width: 12 * BW(),
      height: 12 * BW(),
      marginHorizontal: 6,
      transform: [{scaleX: isArabic() ? 1 : -1}],
    },
  });
