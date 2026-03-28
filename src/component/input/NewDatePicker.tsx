import React, {useState} from 'react';
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
import {isArabic} from '../../locales';

export default function NewCustomDatePicker(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate: any) => {
    Platform.OS === 'android' && setShow(false);
    if (selectedDate) {
      props?.setDate?.(selectedDate);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShow(!show);
        }}
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
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Image
              style={styles.image}
              source={require('../../assets/icons/calendar.png')}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {show && Platform.OS == 'android' && (
        <DateTimePicker
          value={props.dateValue ? new Date(props.dateValue) : new Date()}
          display="default"
          onChange={onChange}
          {...props.datePickerProps}
        />
      )}
      {Platform.OS == 'ios' && (
        <Modal visible={show} animationType="slide" transparent={true}>
          <Pressable style={styles.backdrop} onPress={() => setShow(false)}>
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
                  onChange={onChange}
                  {...props.datePickerProps}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShow(!show);
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
    backdrop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.45)'},
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
  });
