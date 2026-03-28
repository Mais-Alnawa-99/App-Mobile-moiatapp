import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {BW} from '../../style/theme';
import Text from '../Text';
import {isArabic} from '../../locales';

export default function Radio(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  return (
    <View
      style={[
        props.row ? styles.rowView : styles.columnView,
        props.disabled && {opacity: 0.8},
      ]}>
      {props.title && (
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
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
              width: '90%',
              ...props.styleText,
            }}>
            {props.title}
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
      {props?.radioGroup &&
        props?.radioGroup.length > 0 &&
        props?.radioGroup.map((child: any, index: any) => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={props.disabled}
              onPress={() => {
                if (props.onPress) {
                  props.onPress(child);
                }
              }}
              key={index}
              style={[
                styles.radioDev,
                props.stylesRadio,
                {
                  borderColor:
                    props.stylesRadio &&
                    props?.value &&
                    props?.value == child?.value
                      ? colors.secondaryColor
                      : colors.gray,
                },
              ]}>
              <View style={styles.wrapper}>
                <Text h4>
                  {child.label
                    ? child.label
                    : child.text && isArabic()
                    ? child.text.ar
                    : child.text && !isArabic()
                    ? child.text.default
                    : ''}
                </Text>
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor:
                        props?.value == child?.value
                          ? colors.secondaryColor
                          : colors.gray,
                    },
                  ]}>
                  {props?.value && props?.value == child?.value && (
                    <View style={styles.radioSelected}></View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
    rowView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
    },
    radioSelected: {
      width: 14 * BW(),
      display: 'flex',
      height: 14 * BW(),
      borderRadius: 20 * BW(),
      backgroundColor: colors.secondaryColor,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      borderColor: colors.secondaryColor,
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
    radioDev: {},
    viewStyle: {marginTop: 11 * BW()},
  });
