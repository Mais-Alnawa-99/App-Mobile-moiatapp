import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '../../../component/Text';
import {BW} from '../../../style/theme';
import {useTheme} from '@react-navigation/native';
export default function Section({
  icon,
  title,
  endChildren,
  onPress,
  style,
}: {
  icon: any;
  title: string;
  endChildren?: React.ReactElement;
  onPress?: any;
  style?: {};
}) {
  const {colors}: any = useTheme();

  const styles = getStyles(colors);
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      activeOpacity={!!onPress ? 0.8 : 1}
      onPress={!!onPress ? onPress : () => {}}
      style={{...styles.row, ...style}}>
      <View style={styles.firstContainer}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
        <View style={styles.titleContainer}>
          <Text h3 medium style={{color: colors.lightPrimaryTextColor}}>
            {title}
          </Text>
        </View>
      </View>
      {endChildren}
    </TouchableOpacity>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      backgroundColor: colors.background,
      padding: 12 * BW(),
      marginVertical: 6 * BW(),
      borderRadius: 8 * BW(),
      alignItems: 'center',
      flexDirection: 'row',
    },
    firstContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
    },
    iconContainer: {
      width: 22 * BW(),
      height: 22 * BW(),
    },
    nextContainer: {
      width: 8 * BW(),
      height: 12 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: colors.lightPrimaryColor,
    },
    titleContainer: {
      flex: 1,
      marginStart: 12 * BW(),
    },
  });
