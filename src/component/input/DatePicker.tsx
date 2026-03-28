import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import theme, {BH, BW} from '../../style/theme';
import Text from '../Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../Button';
import {isArabic} from '../../locales';

export default function CustomDatePicker(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  return (
    <>
      <TouchableOpacity
        onPress={() => props.showDatepicker()}
        disabled={props.disabled}
        style={[
          props.disabled ? styles.inputDisable : styles.input,
          {
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            minHeight: 40 * BW(),
            borderColor: props.required || props.error ? 'red' : '#cccccc88',
            borderWidth: props.required || props.error ? 0.5 * BW() : 0 * BW(),
            borderRadius: 8 * BW(),
            marginTop: 2 * BW(),
            padding: 8 * BW(),
            ...props.styleInput,
          },
        ]}>
        <Text style={props.disabled ? styles.inputDisable : styles.input} h4>
          {props.value}
        </Text>
        {!props.disabled && (
          <TouchableOpacity onPress={() => props.showDatepicker()}>
            <Image
              style={styles.image}
              source={require('../../assets/icons/calendar.png')}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {props.show && Platform.OS == 'android' && (
        <DateTimePicker
          display={Platform.OS === 'android' ? 'default' : 'inline'}
          value={props.dateValue ? new Date(props.dateValue) : new Date()}
          style={{backgroundColor: colors?.lightgray + '99', padding: 2 * BW()}}
          // display="default"
          onChange={props.onChangeDateFrom}
          {...props.datePickerProps}
        />
      )}
      {Platform.OS == 'ios' && (
        <Modal visible={props.show} animationType="slide" transparent={true}>
          <Pressable
            style={styles.backdrop}
            onPress={() => props.showDatepicker()}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DateTimePicker
                  display={'inline'}
                  value={
                    props.dateValue ? new Date(props.dateValue) : new Date()
                  }
                  style={{
                    backgroundColor: colors?.gray + '99',
                    padding: 2 * BW(),
                  }}
                  // display="default"
                  onChange={props.onChangeDateFrom}
                  {...props.datePickerProps}
                />
                <TouchableOpacity
                  onPress={() => {
                    props.showDatepicker();
                  }}>
                  <Text h3 bold style={{color: colors?.secondaryColor}}>
                    {isArabic() ? 'تم' : 'Ok'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    modalView: {
      backgroundColor: colors?.gray,
      borderRadius: 12 * BW(),
      paddingHorizontal: 15 * BW(),
      paddingVertical: 10 * BW(),
      width: '90%',
      minHeight: '35%',
      borderColor: colors.gray + '99',
      borderWidth: 0.2 * BW(),
    },
    inputDisable: {
      color: colors.textColor + '80',
      backgroundColor: '#ffffff80',
    },
    input: {
      color: colors.textColor,
      backgroundColor: colors.backgroundColorInput,
    },
    backdrop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.45)'},
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
