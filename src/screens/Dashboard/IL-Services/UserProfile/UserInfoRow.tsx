import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Text from '../../../../component/Text';
import {BH, BW} from '../../../../style/theme';
import {Icon} from 'react-native-elements';

export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <View style={{marginStart: 8 * BH()}}>
        <Text h4 style={{color: colors.lightPrimaryTextColor}}>
          {label} :
        </Text>
        <Text h4 style={{flex: 1, color: colors.textPrimaryColor}} medium>
          {value}
        </Text>
      </View>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white + 90,
      borderRadius: 8 * BW(),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 8 * BW(),
      marginTop: 8 * BW(),
    },
    label: {
      color: colors.lightPrimaryTextColor,
    },
    value: {
      flex: 1,
      color: colors.textPrimaryColor,
    },
  });

export default InfoRow;
