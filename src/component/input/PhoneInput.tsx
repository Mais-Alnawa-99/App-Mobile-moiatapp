import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import theme, {BW} from '../../style/theme';
import {replaceArabicNumerals} from '../Generalfunction';
import PhoneInput from 'react-native-phone-number-input';

export default function CustomPhoneInput(props: any): JSX.Element {
  const {colors} = useTheme();
  const styles = getStyles(colors);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <PhoneInput
        ref={props.phoneInput}
        defaultCode={props?.defaultCode ? props?.defaultCode : 'AE'}
        placeholder={props.placeholder ? props.placeholder : '5xxxxxxxx'}
        disableArrowIcon={true}
        disabled={props.disabled}
        value={props.value}
        onChangeText={text => {
          if (text.charAt(0) === '0' || text.charAt(0) === '٠') {
            text = text.substring(1);
          }
          props.onChangeText &&
            props.onChangeText(
              props.phoneInput?.current?.getCallingCode() +
                replaceArabicNumerals(text),
            );
          props?.setFieldValue &&
            props?.name &&
            props.setFieldValue(
              props?.name,
              props.phoneInput?.current?.getCallingCode() +
                replaceArabicNumerals(text),
            );
          props?.setCustomNumber &&
            props.setCustomNumber(replaceArabicNumerals(text));
          props?.setCountryCode &&
            props.setCountryCode(props.phoneInput?.current?.getCallingCode());
        }}
        textContainerStyle={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          backgroundColor: 'transparent',
          flexDirection: 'row-reverse',
        }}
        textInputStyle={[
          props.disabled ? styles.inputDisable : styles.input,
          {
            paddingVertical: 0,
            height: '100%',
            fontFamily: theme.themeObject.currentFontFamily.normal,
            fontSize: theme.themeObject.currentFontSize.h4,
            backgroundColor: 'transparent',
            textAlign: 'right',
          },
        ]}
        containerStyle={[
          props.disabled ? styles.inputDisable : styles.input,
          {
            width: 'auto',
            flexDirection: 'row-reverse',
            paddingHorizontal: 5 * BW(),
            paddingTop: 4 * BW(),
            paddingBottom: 4 * BW(),
            borderColor: props.required || props.error ? 'red' : '#cccccc88',
            borderWidth:
              props.required || props.error ? 0.5 * BW() : 0.6 * BW(),
            borderRadius: 8 * BW(),
            marginTop: 2 * BW(),
            padding: 8 * BW(),
            minHeight: 40 * BW(),
            ...props.styleInput,
          },
        ]}
        flagButtonStyle={{width: 'auto'}}
        codeTextStyle={[
          props.disabled && styles.inputDisable,
          {
            fontFamily: theme.themeObject.currentFontFamily.normal,
            fontSize: theme.themeObject.currentFontSize.h4,
          },
        ]}
        onChangeCountry={coun => {
          props?.setFieldValue &&
            props?.name &&
            coun.callingCode &&
            coun.callingCode[0] &&
            props.setFieldValue(
              props?.name,
              coun.callingCode[0] + replaceArabicNumerals(props.value),
            );

          props?.setCountryCode && props.setCountryCode(coun.callingCode[0]);
        }}
        {...props}
      />
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    inputDisable: {
      color: colors.textColor + '80',
      backgroundColor: '#ffffff80',
    },
    input: {
      color: colors.textColor,
      backgroundColor: colors.backgroundColorInput,
    },
  });
