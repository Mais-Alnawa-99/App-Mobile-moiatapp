import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Text from '../../../../component/Text';
import {BH, BW} from '../../../../style/theme';

export const ServiceContainer = ({
  value,
  index,
}: {
  value: string | number | null;
  index: number;
}) => {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      {/* <Text h1 bold style={styles.index}>
        {index}
      </Text> */}
      <Text h4 style={styles.label}>
        {value}
      </Text>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      borderRadius: 12 * BW(),
      paddingBottom: 12 * BW(),
      paddingHorizontal: 10 * BW(),
      margin: 4 * BW(),
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.white,
    },
    index: {
      color: colors.secondaryColor + '99',
      // borderWidth: 1,
      padding: 0 * BW(),
      //lineHeight: 25 * BW(),
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      //marginStart: 3 * BW(),
    },
    label: {
      color: colors.textPrimaryColor,
      marginTop: 20 * BW(),
    },
    circle: {
      position: 'absolute',
      top: -38 * BW(),
      left: -34 * BW(),
      width: 70 * BW(),
      height: 60 * BW(),
      borderRadius: 30 * BW(),
      backgroundColor: colors.secondaryColor + 30,
    },
  });
export default ServiceContainer;
