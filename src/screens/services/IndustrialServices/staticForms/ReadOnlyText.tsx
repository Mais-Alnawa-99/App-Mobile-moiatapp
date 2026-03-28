import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {isArabic} from '../../../../locales';
import Text from '../../../../component/Text';

interface ReadOnlyInputProps {
  label: string;
  value?: string | number;
  requiredStar?: boolean;
  styleText?: any;
  viewStyle?: any;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  bold?: boolean;
  medium?: boolean;
}

export default function ReadOnlyInput(props: ReadOnlyInputProps): JSX.Element {
  const {colors} = useTheme();
  const styles = getStyles(colors);

  return (
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
              opacity: 0.8,
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

      <View style={styles.inputDisable}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.textColor + 'aa',
          }}>
          {props.value?.toString() ?? ''}
        </Text>
      </View>
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    viewStyle: {
      marginTop: 8 * BW(),
    },
    inputDisable: {
      padding: 8 * BW(),
      backgroundColor: '#ffffff80',
      minHeight: 40 * BW(),
      borderRadius: 8 * BW(),
      justifyContent: 'center',
      borderWidth: 0.5 * BW(),
      borderColor: '#cccccc88',
    },
  });
