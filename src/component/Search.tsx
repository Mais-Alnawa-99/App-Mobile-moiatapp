import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Input from './input/Input';
import {BW} from '../style/theme';
export default function Search(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  return (
    <View
      style={[
        style.row,
        {
          borderBottomWidth: 1 * BW(),
          borderBottomColor: colors.gray,
          ...props.style,
        },
      ]}>
      <Image
        source={require('../assets/header/search.png')}
        resizeMode="center"
        style={style.icon}
      />
      <Input
        textInput
        viewStyle={{flex: 1, marginTop: 0, marginStart: 6 * BW()}}
        styleInput={style.searchInput}
        placeholder={t('Search')}
        value={props.search}
        onChangeText={(text: string) => props.setSearch(text)}
      />
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    searchInput: {
      borderRadius: 0,
      marginTop: 0,
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    row: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
    },

    icon: {
      width: 20 * BW(),
      height: 20 * BW(),
      resizeMode: 'center',
      tintColor: colors.lightPrimaryColor,
    },
  });
