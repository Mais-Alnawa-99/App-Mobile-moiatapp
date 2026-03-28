import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {LinearGradient} from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  FadeInRight,
  Easing,
} from 'react-native-reanimated';
import {BW} from '../style/theme';
import {BlurView} from '@react-native-community/blur';

export default function CardWithAnimation(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const translateY = useSharedValue(-80);
  const translateX = useSharedValue(-150);
  const opacity = useSharedValue(0.2);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(-150, {
          duration: 3000,
        }),
        withTiming(120, {
          duration: 3000,
        }),
        withTiming(300, {
          duration: 3500,
        }),
      ),
      -1,
      false,
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.2, {
          duration: 3000,
        }),
        withTiming(0.5, {
          duration: 3000,
        }),
        withTiming(0.2, {
          duration: 3500,
        }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  return (
    <View style={[style.card, {...props.style}]}>
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            colors.secondaryColor,
            'rgba(255, 255, 255, 0)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: 50,
            height: 200,
            transform: [{rotate: '20deg'}],
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
      </Animated.View>

      {props.children}

      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(148, 163, 184, 0.1)',
            'rgba(255, 255, 255, 0)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: 50,
            height: 200,
            transform: [{rotate: '30deg'}, {translateY: -50}],
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 4,
          }}
        />
      </Animated.View>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    card: {
      width: 105 * BW(),
      height: 100 * BW(),
      borderRadius: 10 * BW(),
      backgroundColor: colors.white,
      padding: 2 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
  });
