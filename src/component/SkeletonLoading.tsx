import React, {useEffect, useState} from 'react';
import {Image, View, Animated, Dimensions} from 'react-native';
import Loader from './Loader';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../locales';
import LinearGradient from 'react-native-linear-gradient';
const SkeletonLoading = ({
  style,
  url,
  animated,
  sharedTransitionTag,
  fastImage,
  ...props
}: {
  style?: object;
  url?: string;
  animated?: boolean;
  fastImage?: boolean;
  sharedTransitionTag?: any;
}): JSX.Element => {
  const shimmerValue = React.useRef(new Animated.Value(-1)).current;

  const {colors}: any = useTheme();

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1500, // Duration of the shimmer animation
        useNativeDriver: true,
        delay: 0,
      }),
    ).start();
  }, [shimmerValue]);

  const shimmerTranslateX = shimmerValue.interpolate({
    inputRange: [-1, 1],
    outputRange: [
      -Dimensions.get('window').width,
      Dimensions.get('window').width,
    ],
  });
  const shimmerTranslateXaR = shimmerValue.interpolate({
    inputRange: [-1, 1],
    outputRange: [
      Dimensions.get('window').width,
      -Dimensions.get('window').width,
    ],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: [
          {translateX: isArabic() ? shimmerTranslateXaR : shimmerTranslateX},
        ],
      }}>
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.005)',
          colors.seleketonBackground,
          'rgba(255, 255, 255, 0.005)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          flex: 1,
          width: '200%',
        }}
      />
    </Animated.View>
  );
};
export default SkeletonLoading;
