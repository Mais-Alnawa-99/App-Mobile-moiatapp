import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as Animatable from 'react-native-animatable';

import Text from '../../../component/Text';
import {useTheme} from '@react-navigation/native';
import {BH, BW} from '../../../style/theme';
import {Image} from 'react-native';
import {isArabic} from '../../../locales';

export default function CardStat(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  return (
    <Animatable.View
      key={props.index}
      style={{
        minWidth: '48%',
        flex: 1,
      }}
      animation={
        props.index % 2 == 0
          ? isArabic()
            ? 'fadeInRight'
            : 'fadeInLeft'
          : isArabic()
          ? 'fadeInLeft'
          : 'fadeInRight'
      }
      delay={100 + 100 * props.index}>
      <TouchableOpacity
        onPress={() => {
          props?.onPress && props?.onPress();
        }}
        activeOpacity={0.4}
        style={[styles.card, props.style]}>
        <View style={styles.row}>
          <Image
            resizeMode="center"
            style={[styles.icon, props.styleIcon]}
            source={props.icon}
          />
          <Text
            style={props.styleFirstText}
            h2={!props.firstTextH3}
            h4={props.firstTextH3}
            bold={props.firstTextBold}
            medium={props.firstTextMedium}>
            {props.firstText}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={props.styleSecondText}
            h2={props.secondTextH2}
            h4={!props.secondTextH2}
            bold={props.secondTextBold}
            medium={props.secondTextMedium}>
            {props.secondText}
          </Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.white,
      borderRadius: 8 * BW(),
      padding: 8 * BW(),
      minWidth: '46%',
      minHeight: 40 * BW(),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icon: {
      width: 24 * BW(),
      height: 24 * BW(),
      resizeMode: 'center',
    },
  });
