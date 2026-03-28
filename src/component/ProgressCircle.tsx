import React from 'react';
import {View, Text as RNText, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Text from './Text';
import {BW} from '../style/theme';
import {useTheme} from '@react-navigation/native';

const CompletionCircle = ({
  percentage = 0,
  size = 50 * BW(),
  strokeWidth = 4,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const {colors}: any = useTheme();
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#eee"
          cx={size / 2}
          fill="none"
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={percentage == 100 ? colors.green : '#c53c2e'}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text h3 bold style={{}}>{`${percentage}%`}</Text>
        </View>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});

export default CompletionCircle;
