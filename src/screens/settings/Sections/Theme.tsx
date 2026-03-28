import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '../../../component/Text';
import {BW, setTheme} from '../../../style/theme';
import {useTheme} from '@react-navigation/native';
import Section from './Section';
import {isArabic} from '../../../locales';
import {_setLang} from '../../Lang';
import {useAppSelector} from '../../../redux/store';
export default function Theme() {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {theme} = useAppSelector(state => state.theme);

  const themes = [
    {
      backgroundColor: '#C79D65',
      id: 'brown',
    },
    {
      backgroundColor: '#3F8E50',
      id: 'green',
    },
    {
      backgroundColor: '#D83731',
      id: 'red',
    },
  ];
  return (
    <Section
      icon={require('../../../assets/settings/Palette.png')}
      title={t('Theme')}
      endChildren={
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          {themes.map((item, index): any => (
            <TouchableOpacity
              key={index}
              style={theme == item.id ? styles.active : {marginLeft: 10 * BW()}}
              onPress={() => setTheme(item.id)}>
              <View
                style={[styles.font, {backgroundColor: item.backgroundColor}]}
              />
            </TouchableOpacity>
          ))}
        </View>
      }
    />
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    font: {
      borderRadius: 50 * BW(),
      width: 20 * BW(),
      height: 20 * BW(),
    },
    active: {
      borderColor: colors.lightPrimaryColor,
      borderRadius: 50 * BW(),
      marginLeft: 10 * BW(),
      borderWidth: 1 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      width: 26 * BW(),
      height: 26 * BW(),
    },
  });
