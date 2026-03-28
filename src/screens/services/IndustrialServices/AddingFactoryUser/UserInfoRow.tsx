import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Text from '../../../../component/Text';
import {BH, BW} from '../../../../style/theme';
import {Icon} from 'react-native-elements';

export const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number | null;
}) => {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Icon
        name={icon}
        color={colors.secondaryColor}
        style={{marginStart: 12 * BW(), marginEnd: 4 * BW()}}
      />
      <View style={{marginStart: 10 * BH()}}>
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
      backgroundColor: colors.white + 70,
      borderRadius: 16 * BW(),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 2 * BW(),
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
