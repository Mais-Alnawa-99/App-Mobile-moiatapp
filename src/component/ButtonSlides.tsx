import React, {useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated as Anim,
  Easing,
} from 'react-native';
import theme, {BH, BW} from '../style/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Text from './Text';
import Animated from 'react-native-reanimated';
import {isArabic} from '../locales';
export default function ButtonSlides(props: any): JSX.Element {
  const styles = getStyles();

  // const SlidingText = ({ text, width = 180, speed = 8000 }) => {
  const translateX = useRef(new Anim.Value(0)).current;

  useEffect(() => {
    let isMounted = true;
    let width = 20;
    const animate = () => {
      translateX.setValue(isArabic() ? -width : width);

      Anim.timing(translateX, {
        toValue: isArabic() ? width : -width,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        if (isMounted) animate();
      });
    };

    animate();

    return () => {
      isMounted = false;
    };
  }, [translateX]);

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props?.loading ? () => {} : props.onPress}
      onLongPress={props.onLongPress}
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.4}
      style={[
        styles.btn,
        {...props.style},
        props.backgroundColorDisabled && {
          backgroundColor: props.backgroundColorDisabled,
        },
        props.shadow && {...theme.shadow},
      ]}>
      {props?.loading && (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            size="small"
            color={
              props.loadingColor
                ? props.loadingColor
                : theme.themeObject.colors.primary
            }
          />
        </View>
      )}
      {!props?.loading && !!props?.icon && !props?.sharedTransitionTag && (
        <View style={[styles.containerIcon, {...props.containerIcon}]}>
          <Image
            source={props?.icon}
            resizeMode="center"
            style={[styles.icon, {...props.styleIcon}]}
          />
        </View>
      )}
      {!props?.loading && !!props?.sharedTransitionTag && !!props?.icon && (
        <View style={[styles.containerIcon, {...props.containerIcon}]}>
          <Animated.Image
            source={props?.icon}
            sharedTransitionTag={props.sharedTransitionTag}
            style={[styles.icon, {...props.styleIcon}]}
          />
        </View>
      )}
      {!props?.loading && !!props?.title && (
        <View style={{width: 120 * BW(), overflow: 'hidden'}}>
          <Anim.View style={{transform: [{translateX}]}}>
            <Text
              h4={!props.h3 && !props.h2 && !props.h1 && !props.fontSize}
              h3={props.h3}
              h2={props.h2}
              h1={props.h1}
              h5={props.h5}
              h6={props.h6}
              bold={props.bold}
              medium={props.medium}
              style={props.styleText}
              ar={props.ar}
              en={props.en}>
              {props?.title}
            </Text>
          </Anim.View>
        </View>
      )}
      {props?.type === 'chabter' && (
        <Icon name="angle-left" size={14} color="#C79D65" />
      )}
      {!props?.loading && !!props?.antDesign && (
        <AntDesign
          name={props?.antDesign}
          size={props?.antDesignSize || 20 * BW()}
          color={props?.antDesignColor || '#C79D65'}
          style={props.styleIcon}
        />
      )}
      {!props?.loading && !!props?.Entypo && (
        <Entypo
          name={props?.Entypo}
          size={props?.EntypoSize || 20 * BW()}
          color={props?.EntypoColor || '#C79D65'}
          style={props.styleIcon}
        />
      )}
      {!props?.loading && !!props?.ionicons && (
        <MaterialIcons
          name={props?.ionicons}
          size={props?.ioniconsSize || 20 * BW()}
          color={props?.ioniconsColor || '#C79D65'}
        />
      )}
      {!props?.loading && !!props?.octicons && (
        <Octicons
          name={props?.octicons}
          size={props?.octiconsSize || 20 * BW()}
          color={props?.octiconsColor || '#C79D65'}
          style={props.styleIcon}
        />
      )}
      {!props?.loading && !!props?.Fontisto && (
        <Fontisto
          name={props?.Fontisto}
          size={props?.FontistoSize || 20 * BW()}
          color={props?.FontistoColor || '#C79D65'}
        />
      )}

      {!props?.loading && !!props?.fontAwesome5 && (
        <FontAwesome5
          name={props?.fontAwesome5}
          size={props?.fontAwesome5Size || 20 * BW()}
          color={props?.fontAwesome5Color || '#C79D65'}
        />
      )}
    </TouchableOpacity>
  );
}

const getStyles = () =>
  StyleSheet.create({
    btn: {
      height: 80 * BH(),
      borderRadius: 8 * BW(),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
      padding: 10 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    containerIcon: {
      width: 30 * BW(),
      height: 30 * BH(),
      alignItems: 'center',
      justifyContent: 'center',
      resizeMode: 'center',
    },
    imgCover: {
      width: '100%',
      height: '100%',
      tintColor: 'rgba(0,0,0,0.3)',
      resizeMode: 'contain',
    },
    logoContainer: {
      width: '100%',
      height: '80%',
      position: 'absolute',
      alignSelf: 'flex-start',
      justifyContent: 'flex-end',
      bottom: 5 * BW(),
      left: 5 * BW(),
    },
  });
