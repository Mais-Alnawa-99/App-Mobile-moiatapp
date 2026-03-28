import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {BW} from '../../style/theme';
import CustomImage from '../../component/CustomImage';
import Text from '../../component/Text';
import {isArabic} from '../../locales';
import NavigationService from '../../navigation/NavigationService';

export default function MediaCard(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  return (
    <Animatable.View
      key={props.index}
      duration={700}
      delay={100 * props.index < 1000 ? 100 * props.index : 1000}
      style={{
        width: props.listView ? '100%' : '48%',
      }}
      animation={
        props.index % 2 != 0
          ? isArabic()
            ? 'fadeInLeft'
            : 'fadeInRight'
          : isArabic()
          ? 'fadeInRight'
          : 'fadeInLeft'
      }>
      <TouchableOpacity
        key={props?.index}
        onPress={() => {
          NavigationService.navigate('MediaDetails', props?.item);
        }}
        style={{
          flexDirection: !props.listView ? 'column' : 'row',
        }}>
        {!!props?.item?.FieldValues?.MainImage_FullUrl ? (
          <CustomImage
            url={props?.item?.FieldValues?.MainImage_FullUrl}
            fastImage
            style={{
              height: 100 * BW(),
              borderRadius: 15 * BW(),
              width: props.listView ? 150 * BW() : 'auto',
              resizeMode: 'cover',
              minWidth: 150 * BW(),
            }}
          />
        ) : (
          <Image
            source={require('../../assets/logo/logo.png')}
            style={{
              height: 100 * BW(),
              borderRadius: 15 * BW(),
              width: props.listView ? 150 * BW() : 'auto',
              resizeMode: 'stretch',
              minWidth: 150 * BW(),
            }}
          />
        )}
        <View
          style={{
            marginTop: props.listView ? 4 * BW() : 8 * BW(),
            marginHorizontal: 10 * BW(),
            flex: 1,
          }}>
          <Text
            h5
            speakable={false}
            style={{
              color: colors.secondaryColor,
            }}>
            {props?.item?.FieldValues?.MediaDate}
          </Text>
          <Text
            h4
            medium
            numberOfLines={props.listView ? 3 : 2}
            style={{
              marginTop: 4 * BW(),
              color: colors.textPrimaryColor,
            }}>
            {props?.item?.FieldValues?.Title}
          </Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const getStyle = (colors: any) => StyleSheet.create({});
