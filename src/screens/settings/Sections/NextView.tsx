import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {BW} from '../../../style/theme';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../../../locales';
export default function NextView(props: any) {
  const {colors}: any = useTheme();

  const styles = getStyles(colors);

  return (
    <View style={styles.nextContainer}>
      <Image
        style={[styles.icon]}
        source={require('../../../assets/icons/next.png')}
      />
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    nextContainer: {
      width: 8 * BW(),
      height: 12 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: colors.lightPrimaryColor,
      transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
    },
  });
