import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import theme, {BH, BW} from '../../style/theme';
import Text from '../Text';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {CheckBox} from 'react-native-elements';
import {isArabic} from '../../locales';
import CustomTextInput from './TextInput';
import CustomPhoneInput from './PhoneInput';
import Select from './Select';
import Radio from './Radio';
import CustomCountryPicker from './CountryPicker';
import CustomDatePicker from './DatePicker';
import MultiSelectCom from './MultiSelect';
import NewCustomDatePicker from './NewDatePicker';

function Input(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  return (
    <>
      <View style={[styles.viewStyle, props.viewStyle]}>
        {props.label && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              h4={!props.h3 && !props.h2 && !props.h1}
              h3={props.h3}
              h2={props.h2}
              h5={props.h5}
              h1={props.h1}
              medium={props.medium}
              bold={props.bold}
              style={{
                color: colors.text,
                zIndex: 500,
                opacity: props.disabled ? 0.8 : 1,
                ...props.styleText,
              }}>
              {props.label}
            </Text>
            {props.requiredStar && (
              <Icon
                name="star-of-life"
                size={6 * BW()}
                color="#db2c43"
                style={{marginHorizontal: 4 * BW(), marginBottom: 4 * BW()}}
              />
            )}
          </View>
        )}
        {(props.textInput || props.type == 'textInput') && (
          <CustomTextInput {...props} />
        )}
        {(props.phoneInputType || props.type == 'phoneInputType') && (
          <CustomPhoneInput {...props} />
        )}
        {(props.dropdown || props.type == 'dropdown') && <Select {...props} />}
        {(props.multiSelect || props.type == 'multiSelect') && (
          <MultiSelectCom {...props} />
        )}

        {(props?.radio || props.type == 'radio') && <Radio {...props} />}
        {props?.checkbox && (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: props.fullWidth ? '100%' : '90%',
            }}>
            <CheckBox
              title={props.title}
              checked={props.checked}
              onPress={props.onPress}
              checkedColor={colors.secondaryColor}
              disabled={props.disabled}
              containerStyle={{
                backgroundColor: props.fullWidth
                  ? colors.backgroundColorInput
                  : 'transparent',
                marginTop: 0,
                borderColor: props.fullWidth ? '#cccccc88' : 'transparent',
                marginLeft: isArabic() ? -4 * BW() : 0,
                marginRight: -4 * BW(),
                paddingHorizontal: 0,
                borderRadius: 0,
                paddingVertical: 2 * BW(),
                marginBottom: 0,
                paddingLeft: 0,
                paddingStart: 0,
                paddingEnd: 0,
                paddingRight: 0,
                opacity: props.disabled ? 0.8 : 1,
              }}
              textStyle={{
                fontFamily: theme.themeObject.currentFontFamily.normal,
                fontSize: theme.themeObject.currentFontSize.h4,
                textAlign: isArabic() ? 'left' : 'right',
                fontWeight: 500,
                color: colors.text,
              }}
              {...props}
            />
            {props.requiredStar && (
              <Icon
                name="star-of-life"
                size={6 * BW()}
                color="#db2c43"
                style={{marginHorizontal: 4 * BW(), marginBottom: 4 * BW()}}
              />
            )}
          </View>
        )}
        {(props.countryPicker || props.type == 'countryPicker') && (
          <CustomCountryPicker {...props} />
        )}
        {(props.datePicker || props.type == 'datePicker') && (
          <CustomDatePicker {...props} />
        )}
        {(props.newDatePicker || props.type == 'newDatePicker') && (
          <NewCustomDatePicker {...props} />
        )}
        {!!props.error && typeof props.error == 'string' && (
          <Text style={styles.requiredText} h5>
            {props.error}
          </Text>
        )}
      </View>
    </>
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
    rowView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      marginTop: 8 * BW(),
    },
    radioSelected: {
      width: 10 * BW(),
      display: 'flex',
      height: 10 * BW(),
      borderRadius: 5 * BW(),
      backgroundColor: colors.darkgreen,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    columnView: {
      display: 'flex',
      flexDirection: 'column',

      width: '100%',
      justifyContent: 'center',
    },
    radio: {
      width: 20 * BW(),
      height: 20 * BW(),
      borderRadius: 10 * BW(),
      display: 'flex',

      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1 * BW(),
      margin: 8 * BW(),
      borderColor: colors.darkgreen,
    },
    image: {
      width: 15 * BW(),
      height: 15 * BW(),
      tintColor: '#CDCDCD',
      marginLeft: 8 * BW(),
    },
    renderItem: {
      paddingHorizontal: 10 * BW(),
      paddingVertical: 8 * BW(),
      backgroundColor: colors.backgroundColorInput,
      color: colors.text,
    },
    requiredText: {
      color: '#db2c43',
      fontSize: 8 * BW(),
      lineHeight: 20 * BW(),
    },
    radioDev: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: '48%',

      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 14,
      marginRight: 4,
      backgroundColor: colors.background,
    },
    viewStyle: {marginTop: 8 * BW()},
  });

export default React.memo(Input);
