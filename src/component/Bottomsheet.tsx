import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {BH, BW, Theme} from '../style/theme';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {closeBottomSheet} from '../redux/reducers/General/bottomSheet';
import {BlurView} from '@react-native-community/blur';
import {isArabic} from '../locales';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function Bottomsheet({style}: {style?: {}}) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const dispatch = useAppDispatch();

  const context = useSharedValue({y: 0});
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5;
  const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 3;

  const {isVisible, content, hideBack} = useAppSelector(
    state => state.bottomSheet,
  );

  const _closeBottomSheet = () => {
    dispatch(closeBottomSheet());
  };
  let _BH = BH();
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(e => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -MIN_TRANSLATE_Y) {
        // runOnJS(_closeBottomSheet)();
        translateY.value = withSpring(translateY.value);
      } else if (translateY.value < -MIN_TRANSLATE_Y) {
        // runOnJS(_closeBottomSheet)();
        translateY.value = withSpring(translateY.value);
      }
      if (translateY.value > -MIN_TRANSLATE_Y + 200 * _BH) {
        runOnJS(_closeBottomSheet)();
        // translateY.value = withSpring(translateY.value);
      }
      if (translateY.value < -SCREEN_HEIGHT + 500 * _BH) {
        translateY.value = withSpring(-SCREEN_HEIGHT + 500 * _BH);
      }
    });

  const reanimatedBottomStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const scrollTo = (destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 50});
  };
  useEffect(() => {
    if (isVisible) {
      scrollTo(-SCREEN_HEIGHT / 3);
    } else {
      scrollTo(SCREEN_HEIGHT);
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <View style={styles.overlay}>
          <TouchableWithoutFeedback
            onPress={() => dispatch(closeBottomSheet())}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
        </View>
      )}

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.bottomsheetContainer, reanimatedBottomStyle, style]}>
          {isVisible && (
            <BlurView
              style={styles.blurBackground}
              blurType={colors.blurType}
              blurAmount={19} // Adjust the blur intensity
            />
          )}

          <TouchableOpacity
            style={{padding: 10 * BW()}}
            onPress={() => {
              dispatch(closeBottomSheet());
            }}>
            <View style={styles.line} />
          </TouchableOpacity>
          {!hideBack && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                backgroundColor: colors.secondaryColor,
                alignItems: 'center',
                justifyContent: 'center',
                right: -35 * BW(),
                width: 70 * BW(),
                height: 70 * BW(),
                top: 350 * BW(),
                borderRadius: 100 * BW(),
                zIndex: 9999,
              }}
              onPress={() => {
                dispatch(closeBottomSheet());
              }}>
              <Image
                style={{
                  transform: [{rotate: !isArabic() ? '180deg' : '0deg'}],
                  width: 18 * BW(),
                  height: 18 * BW(),
                  resizeMode: 'contain',
                  right: 12 * BW(),
                  tintColor: colors.mainWhite,
                }}
                source={require('../assets/icons/back.png')}
              />
            </TouchableOpacity>
          )}
          <View>{content}</View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}

type BottomsheetProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  children: React.ReactNode;
  hideBack?: boolean;
  style?: {};
};

export function BottomsheetState({
  isVisible,
  setIsVisible,
  children,
  hideBack = false,
  style,
}: BottomsheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const {colors}: any = useTheme();
  const styles = getStyles(colors);

  const context = useSharedValue({y: 0});
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5;
  const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 3;

  const _BH = BH();

  const _closeBottomSheet = () => {
    setIsVisible(false);
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(e => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -MIN_TRANSLATE_Y + 200 * _BH) {
        runOnJS(_closeBottomSheet)();
      } else if (translateY.value < -SCREEN_HEIGHT + 500 * _BH) {
        translateY.value = withSpring(-SCREEN_HEIGHT + 500 * _BH);
      } else {
        translateY.value = withSpring(translateY.value);
      }
    });

  const reanimatedBottomStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const scrollTo = (destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 50});
  };

  useEffect(() => {
    if (isVisible) {
      scrollTo(-SCREEN_HEIGHT / 3);
    } else {
      scrollTo(SCREEN_HEIGHT);
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={_closeBottomSheet}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
        </View>
      )}

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.bottomsheetContainer, reanimatedBottomStyle, style]}>
          {isVisible && (
            <BlurView
              style={styles.blurBackground}
              blurType={colors.blurType}
              blurAmount={10}
            />
          )}

          <TouchableOpacity
            style={{padding: 10 * BW()}}
            onPress={_closeBottomSheet}>
            <View style={styles.line}></View>
          </TouchableOpacity>

          {!hideBack && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                backgroundColor: colors.secondaryColor,
                alignItems: 'center',
                justifyContent: 'center',
                right: -35 * BW(),
                width: 70 * BW(),
                height: 70 * BW(),
                top: 350 * BW(),
                borderRadius: 100 * BW(),
              }}
              onPress={_closeBottomSheet}>
              <Image
                style={{
                  transform: [{rotate: !isArabic() ? '180deg' : '0deg'}],
                  width: 18 * BW(),
                  height: 18 * BW(),
                  resizeMode: 'contain',
                  right: 12 * BW(),
                  tintColor: colors.mainWhite,
                }}
                source={require('../assets/icons/back.png')}
              />
            </TouchableOpacity>
          )}

          <View>{children}</View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1000,
      backgroundColor: colors.black + '33',
    },
    background: {
      flex: 1,
    },
    bottomsheetContainer: {
      width: '100%',
      height: SCREEN_HEIGHT,
      position: 'absolute',
      top: SCREEN_HEIGHT / 1.8,
      zIndex: 99999,
      borderRadius: 0,
    },
    blurBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    line: {
      width: 75 * BW(),
      height: 4 * BW(),
      backgroundColor: colors.lightPrimaryColor,
      borderRadius: 20 * BW(),
      alignSelf: 'center',
      marginVertical: 10 * BW(),
    },
  });
