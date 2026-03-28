import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {isArabic} from '../../../locales';
import Text from '../../../component/Text';
import {BW} from '../../../style/theme';

const valuesData = [
  {
    // icon: require('../../../assets/about/Icon_Commitment.png'),
    en: 'Commitment and Transparency',
    ar: 'الالتزام والشفافية',
  },
  {
    // icon: require('../../../assets/about/Icon_Commitment.png'),
    en: 'Sustainability',
    ar: 'الاستدامة',
  },
  {
    icon: 'lightbulb',
    en: 'Innovation and Flexibility',
    ar: 'الابتكار والمرونة',
  },
  {
    icon: 'share-2',
    en: 'Collaboration and Integration',
    ar: 'التعاون والتكامل',
  },
  {
    icon: 'heart-pulse',
    en: 'Quality of Life',
    ar: 'جودة الحياة أولاً',
  },
];

export default function ValuesSection() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const styles = getStyle(colors);
  const arabic = isArabic();

  return (
    <View style={styles.container}>
      <Text h3 bold style={styles.header}>
        {arabic ? 'قيمنا' : 'Our Values'}
      </Text>
      <View style={styles.grid}>
        {valuesData.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* <Image source={item.icon} style={styles.icon} /> */}
            <Text h4>{arabic ? item.ar : item.en}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
      padding: 16 * BW(),
      paddingBottom: 18 * BW(),
      borderRadius: 10 * BW(),
    },
    header: {
      marginBottom: 16 * BW(),
      // color: colors.black,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 12 * BW(),
    },
    card: {
      minWidth: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12 * BW(),
      borderRadius: 8 * BW(),
      backgroundColor: colors.white,
    },
    icon: {
      tintColor: 'red',
      width: 22 * BW(),
      height: 22 * BW(),
    },
  });
