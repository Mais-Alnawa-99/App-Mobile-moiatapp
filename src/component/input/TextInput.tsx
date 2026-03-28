import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';
import theme, {BH, BW} from '../../style/theme';
import {replaceArabicNumerals} from '../Generalfunction';
import {isArabic} from '../../locales';

export default function CustomTextInput(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  return (
    <TextInput
      style={[
        props.disabled ? styles.inputDisable : styles.input,
        {
          fontFamily: isArabic()
            ? theme.themeObject.currentFontFamilyAR.normal
            : theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          textAlign: isArabic() ? 'right' : 'left',
          borderColor: props.required || props.error ? 'red' : colors.border,
          borderWidth: props.required || props.error ? 0.5 * BW() : 0 * BW(),
          borderRadius: 8 * BW(),
          marginTop: 2 * BW(),
          padding: 8 * BW(),
          minHeight: 40 * BW(),
          ...props.styleInput,
        },
      ]}
      type
      autoCapitalize="none"
      textContentType="name"
      editable={props.disabled ? false : true}
      keyboardType={props.keyboardType ? props.keyboardType : 'default'}
      value={props.value?.toString() || ''}
      onBlur={e => {
        props.onBlur && props.onBlur(e);
      }}
      {...props}
      onChangeText={text => {
        props.onChangeText(text);
        !props.stopReplaceNumeric &&
          props.onChangeText(replaceArabicNumerals(text));
      }}
      name={props.name}
      placeholder={props.placeholder}
      placeholderTextColor={
        props.placeholderTextColor ? props.placeholderTextColor : colors.gray
      }
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
  });
