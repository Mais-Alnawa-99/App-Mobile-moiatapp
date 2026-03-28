import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BW} from '../style/theme';
export default function Line(props: any): JSX.Element {
  const {colors} = useTheme();
  const styles = getStyle(colors);

  return <View style={[styles.line, {...props.style}]} />;
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    line: {
      borderTopWidth: 1 * BW(),
      borderTopColor: colors.gray,
      height: 0,
      marginVertical: 16 * BW(),
    },
  });
