import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import Social from '../../component/Social';

export type Props = {
  name: string;
};

const DrawerFooter = (props: any) => {
  const {colors} = useTheme();
  const styles = getStyle(colors);

  return <Social />;
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16 * BW(),
      paddingTop: 8 * BW(),
      paddingBottom: 8 * BW(),
      bottom: 0,
      width: 'auto',
      minHeight: 60 * BW(),
      gap: 26 * BW(),
      marginTop: 16 * BW(),
      backgroundColor: colors.darkBlue,
      borderRadius: 8 * BW(),
      marginHorizontal: 16 * BW(),
    },
  });

export default DrawerFooter;
