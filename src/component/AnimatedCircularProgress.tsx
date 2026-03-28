import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Text from './Text';

type Props = {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  duration?: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedCircularProgress = ({
  current,
  total,
  size = 80,
  strokeWidth = 8,
  progressColor = '#b59d6b',
  backgroundColor = '#e6eef7',
  duration = 600,
}: Props) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // animated values
  const progressAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const safeTotal = total > 0 ? total : 1;
    const safeProgress = Math.min(current / safeTotal, 1); // clamp between 0–1

    // reset for re-runs
    progressAnim.setValue(0);
    flipAnim.setValue(0);

    Animated.sequence([
      // Animate circle progress
      Animated.timing(progressAnim, {
        toValue: safeProgress,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),

      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [current, total]);

  // stroke interpolation
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  // flip interpolation
  const rotateX = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'],
  });

  const rotateY = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '0deg'], // horizontal flip
  });

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Svg width={size} height={size}>
        {/* background circle */}
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* animated progress circle */}
        <AnimatedCircle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFillObject, styles.center]}>
        <Animated.View
          style={{
            transform: [
              {perspective: 1000}, // 👈 prevents distortion
              {rotateY}, // 👈 horizontal flip
            ],
          }}>
          <Text bold h2 style={styles.text}>
            {`${current}/${total > 0 ? total : 1}`}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AnimatedCircularProgress;
