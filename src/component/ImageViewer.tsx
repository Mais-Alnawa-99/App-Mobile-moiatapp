import React, {useRef, createRef, useState} from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomImage from './CustomImage';
import {BW} from '../style/theme';
import {useTheme} from '@react-navigation/native';
import Button from './Button';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ImageViewer = ({fileUrl}: any) => {
  const {colors} = useTheme();
  const styles = getStyle(colors);
  const pinchRef = createRef();
  const panRef = createRef();

  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const scale = useRef(Animated.multiply(baseScale, pinchScale)).current;
  let lastScale = 1;

  const onPinchGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          scale: pinchScale,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const handlePinchStateChange = ({nativeEvent}: any) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      lastScale *= nativeEvent.scale;
      baseScale.setValue(lastScale);
      pinchScale.setValue(1);
    }
  };

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  let lastOffset = {x: 0, y: 0};

  const MAX_TRANSLATE_X = SCREEN_WIDTH / 2;
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 4;

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const handlePanStateChange = ({nativeEvent}: any) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      lastOffset.x = Math.max(
        -MAX_TRANSLATE_X,
        Math.min(lastOffset.x + nativeEvent.translationX, MAX_TRANSLATE_X),
      );
      lastOffset.y = Math.max(
        -MAX_TRANSLATE_Y,
        Math.min(lastOffset.y + nativeEvent.translationY, MAX_TRANSLATE_Y),
      );

      translateX.setOffset(lastOffset.x);
      translateX.setValue(0);
      translateY.setOffset(lastOffset.y);
      translateY.setValue(0);
    }
  };

  const [url, setUrl] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setUrl(fileUrl);
          setVisible(true);
        }}>
        <View style={styles.imageContainer}>
          <CustomImage
            url={fileUrl}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <Modal visible={visible} transparent>
        <View style={styles.modalContainer}>
          <View
            style={{
              position: 'absolute',
              right: 12 * BW(),
              top: 60 * BW(),
              zIndex: 1,
            }}>
            <Button
              onPress={() => {
                setVisible(false);
              }}
              icon={require('../assets/icons/close.png')}
              style={{
                ...styles.btnContainer,
              }}
              containerIcon={styles.btn}
            />
          </View>
          <View style={styles.modalView}>
            <GestureHandlerRootView style={styles.mainContainer}>
              <PanGestureHandler
                ref={panRef}
                onGestureEvent={onPanEvent}
                onHandlerStateChange={handlePanStateChange}
                shouldCancelWhenOutside>
                <Animated.View style={[styles.wrapper]}>
                  <PinchGestureHandler
                    ref={pinchRef}
                    simultaneousHandlers={panRef}
                    onGestureEvent={onPinchGestureEvent}
                    onHandlerStateChange={handlePinchStateChange}>
                    <Animated.View
                      style={styles.imageContainer}
                      collapsable={false}>
                      <Animated.Image
                        style={[
                          styles.pinchableImage,
                          {
                            transform: [
                              {scale: scale},
                              {
                                translateX: translateX.interpolate({
                                  inputRange: [
                                    -MAX_TRANSLATE_X,
                                    MAX_TRANSLATE_X,
                                  ],
                                  outputRange: [
                                    -MAX_TRANSLATE_X,
                                    MAX_TRANSLATE_X,
                                  ],
                                  extrapolate: 'clamp',
                                }),
                              },
                              {
                                translateY: translateY.interpolate({
                                  inputRange: [
                                    -MAX_TRANSLATE_Y,
                                    MAX_TRANSLATE_Y,
                                  ],
                                  outputRange: [
                                    -MAX_TRANSLATE_Y,
                                    MAX_TRANSLATE_Y,
                                  ],
                                  extrapolate: 'clamp',
                                }),
                              },
                            ],
                          },
                        ]}
                        source={{uri: url}}
                      />
                    </Animated.View>
                  </PinchGestureHandler>
                </Animated.View>
              </PanGestureHandler>
            </GestureHandlerRootView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ImageViewer;

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    errorText: {
      color: 'red',
      marginTop: 4 * BW(),
    },
    imageScrollContainer: {
      marginTop: 10 * BW(),
    },
    imageContainer: {
      marginRight: 10 * BW(),
      alignItems: 'center',
    },
    image: {
      width: 150 * BW(),
      height: 150 * BW(),
      borderRadius: 10 * BW(),
      borderWidth: 1 * BW(),
      borderColor: colors.border,
    },

    mainContainer: {
      flex: 1,
    },

    pinchableImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    wrapper: {
      flex: 1,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12 * BW(),
    },
    modalView: {
      height: '70%',
      backgroundColor: colors.mainWhite,
      width: '100%',
      overflow: 'hidden',
      borderRadius: 6 * BW(),
    },
    btnContainer: {
      width: 20 * BW(),
      height: 20 * BW(),
      zIndex: 6,
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      width: '100%',
      height: '100%',
    },
  });
