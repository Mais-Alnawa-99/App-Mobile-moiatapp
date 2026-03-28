import React, {useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {FadeInRight, Easing} from 'react-native-reanimated';
import Text from './Text';
import {BW} from '../style/theme';
import {isArabic} from '../locales';

export default function ViewAll(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  return (
    <View style={style.titleContainer}>
      <Text
        h2
        speakable={false}
        bold
        style={{
          color: colors.textPrimaryColor,
        }}>
        {props.content}
      </Text>
      {props.showViewAll && (
        <TouchableOpacity
          onPress={
            !!props.onPress
              ? () => {
                  props.onPress();
                }
              : () => {}
          }
          style={style.alignItemsCenter}>
          <Text
            h4
            medium
            speakable={false}
            style={{
              color: colors.secondaryColor,
            }}>
            {t('viewAll')}
          </Text>
          <AntDesign
            name={'arrowright'}
            style={{
              marginStart: 4 * BW(),
              transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
            }}
            color={colors.secondaryColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 16 * BW(),
    },
    titleContainer: {flexDirection: 'row', justifyContent: 'space-between'},
    card: {
      width: 220 * BW(),
      height: 110 * BW(),
      borderRadius: 10 * BW(),
      borderColor: colors.background,
      borderWidth: 2 * BW(),
      backgroundColor: colors.background + '99',
      padding: 10 * BW(),
      justifyContent: 'space-between',
    },
    cardsContainer: {
      gap: 10,
      marginTop: 14 * BW(),
    },
    alignItemsCenter: {flexDirection: 'row', alignItems: 'center'},
  });
