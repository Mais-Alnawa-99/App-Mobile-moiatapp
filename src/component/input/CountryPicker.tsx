import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import theme, {BH, BW} from '../../style/theme';
import {replaceArabicNumerals} from '../Generalfunction';
import CountryPicker, {
  CountryCode,
  Country,
} from 'react-native-country-picker-modal';

export default function CustomCountryPicker(props: any): JSX.Element {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const [countryCode, setCountryCode] = useState<CountryCode>('AE');
  const [country, setCountry] = useState<Country>(null);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    props?.onSelectContry && props?.onSelectContry(country);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setCountryPickerVisible(true)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 5 * BW(),
          paddingTop: 5 * BW(),
          paddingBottom: 5 * BW(),
          borderColor: props.required || props.error ? 'red' : '#cccccc88',
          borderWidth: props.required || props.error ? 0.5 * BW() : 0.3 * BW(),
          backgroundColor: colors.backgroundColorInput,
          borderRadius: 8 * BW(),
          marginTop: 2 * BW(),
          padding: 8 * BW(),
          minHeight: 40 * BW(),
          ...props.styleInput,
        }}>
        <TextInput
          style={[
            props.disabled ? styles.inputDisable : styles.input,
            {
              fontFamily: theme.themeObject.currentFontFamily.normal,
            },
          ]}
          autoCapitalize="none"
          textContentType="name"
          editable={props.disabled ? false : true}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          value={country?.name}
          onBlur={text => {
            props.onBlur && props.onBlur(replaceArabicNumerals(text));
          }}
          {...props}
          onChangeText={text => {
            props.onChangeText &&
              props.onChangeText(replaceArabicNumerals(text));
          }}
        />
        <CountryPicker
          withAlphaFilter
          {...{
            countryCode,
            onSelect,
          }}
          onClose={() => setCountryPickerVisible(false)}
          visible={countryPickerVisible}
        />
      </View>
    </TouchableOpacity>
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
    viewStyle: {marginTop: 11 * BW()},
  });
