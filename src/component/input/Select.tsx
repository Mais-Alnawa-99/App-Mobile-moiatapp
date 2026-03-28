import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import theme, {BH, BW} from '../../style/theme';
import Text from '../Text';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isArabic} from '../../locales';

export default function Select(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();

  return (
    <Dropdown
      disable={props.disabled}
      search={props.search || props.items?.length > 10}
      value={props.value || ''}
      data={props.items}
      placeholder={props.placeholder || t('Select')}
      labelField="label"
      valueField="value"
      onChange={
        props.onChangeValue
          ? item => {
              props.onChangeValue(item);
            }
          : () => {}
      }
      searchPlaceholder={t('Search')}
      inputSearchStyle={{
        fontFamily: theme.themeObject.currentFontFamily.normal,
        fontSize: theme.themeObject.currentFontSize.h4,
        backgroundColor: colors.backgroundColorInput,
        color: colors.text,
        margin: 0,
        marginBottom: 0,
      }}
      placeholderStyle={{
        fontFamily: theme.themeObject.currentFontFamily.normal,
        fontSize: theme.themeObject.currentFontSize.h4,
        color: props.disabled ? colors.gray : colors.text,
      }}
      itemTextStyle={{
        fontFamily: theme.themeObject.currentFontFamily.normal,
        fontSize: theme.themeObject.currentFontSize.h4,
      }}
      selectedTextStyle={{
        fontFamily: theme.themeObject.currentFontFamily.normal,
        fontSize: theme.themeObject.currentFontSize.h4,
        color: props.disabled ? colors.text + 'aa' : colors.text,
      }}
      style={[
        props.disabled ? styles.inputDisable : styles.input,
        {
          zIndex: 2000,
          borderColor: props.required || props.error ? 'red' : '#cccccc88',
          borderWidth: props.required || props.error ? 0.5 * BW() : 0 * BW(),
          paddingVertical: 5 * BW(),
          borderRadius: 8 * BW(),
          marginTop: 2 * BW(),
          padding: 8 * BW(),
          minHeight: 40 * BW(),
          ...props.styleInput,
        },
      ]}
      dropdownPosition={'auto'}
      renderRightIcon={
        isArabic()
          ? () => {}
          : () => (
              <AntDesign
                name={'down'}
                size={15 * BW()}
                color={props.disabled ? colors.gray : colors.text}
              />
            )
      }
      renderLeftIcon={
        isArabic()
          ? () => (
              <AntDesign
                name={'down'}
                size={15 * BW()}
                color={props.disabled ? colors.gray : colors.text}
              />
            )
          : () => {}
      }
      renderItem={
        props?.renderItemProps
          ? props?.renderItemProps
          : (item: any) => {
              return (
                <View style={styles.renderItem}>
                  <Text h4>{item?.name || item?.label}</Text>
                </View>
              );
            }
      }
      {...props}
    />
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    inputDisable: {
      color: colors.textColor + 'aa',
      backgroundColor: '#ffffff80',
    },
    input: {
      color: colors.textColor,
      backgroundColor: colors.backgroundColorInput,
    },
    renderItem: {
      paddingHorizontal: 10 * BW(),
      paddingVertical: 8 * BW(),
      backgroundColor: colors.backgroundColorInput,
      color: colors.text,
    },
  });
