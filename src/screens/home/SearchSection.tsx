import React, {useRef, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Text from '../../component/Text';
import Input from '../../component/input/Input';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightLong} from '@fortawesome/free-solid-svg-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay,
  FadeInRight,
  Easing,
} from 'react-native-reanimated';
import {isArabic} from '../../locales';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {TouchableOpacity} from 'react-native';
import {inquereRequestStatus} from '../../redux/reducers/Services/thunk/services';
import {setModalData} from '../../redux/reducers/General/modal';
export default function SearchSection(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const [appNumber, setAppNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [required, setRequired] = useState(false);
  const dispatch = useAppDispatch();

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(isArabic() ? 50 : -50);

  const animated = () => {
    let ar = isArabic();
    const fadeInLeft = () => {
      opacity.value = withTiming(1, {duration: 1000});
      translateX.value = withTiming(0, {duration: 1000}, () => {
        runOnJS(fadeOutRight)();
      });
    };

    const fadeOutRight = () => {
      opacity.value = withDelay(1000, withTiming(0, {duration: 1000}));
      translateX.value = withDelay(
        1000,
        withTiming(ar ? -50 : 50, {duration: 1000}, () => {
          translateX.value = ar ? 50 : -50;
          runOnJS(fadeInLeft)();
        }),
      );
    };

    fadeInLeft();
  };

  React.useEffect(() => {
    animated();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}],
  }));

  const _inquereRequestStatus = () => {
    if (!!appNumber) {
      setIsLoading(true);
      setRequired(false);
      dispatch(inquereRequestStatus({number: appNumber})).then(res => {
        setIsLoading(false);
        if (res.meta.requestStatus == 'fulfilled') {
          if (res?.payload?.responseStatus == 2) {
            _openModal(
              isArabic()
                ? res?.payload?.responseMessageAr
                : res?.payload?.responseMessageEn,
            );
          }
          if (res?.payload?.responseStatus == 0) {
            _openModal(
              isArabic()
                ? res?.payload?.result[0]?.applicationStatusAr
                : res?.payload?.result[0]?.applicationStatusEn,
            );
          }
        }
      });
    }
    {
      setRequired(true);
    }
  };

  const _openModal = (msg: string) => {
    dispatch(
      setModalData({
        title: `${t('Result')}`,
        message: msg,
        minHeight: '25%',
        hideCancel: true,
      }),
    );
  };
  return (
    <Animated.View
      entering={FadeInRight.duration(700).easing(Easing.linear)} // Combine with a fade-in effect}
      style={style.container}>
      <Text
        h2
        bold
        style={{
          color: colors.textPrimaryColor,
          marginBottom: 2 * BW(),
        }}>
        {t('appStatus')}
      </Text>
      <Text
        h4
        style={{
          color: colors.textPrimaryColor,
        }}>
        {t('appStatusSearch')}
      </Text>
      <View style={style.searchContainer}>
        <Input
          textInput
          placeholder={t('appNumber')}
          value={appNumber}
          styleInput={{
            borderRadius: 50 * BW(),
            // borderColor: 'transparent',
            marginTop: 0,
            marginEnd: 6 * BW(),
          }}
          viewStyle={{marginTop: 0, flex: 1}}
          placeholderTextColor={colors.lightPrimaryColor}
          onChangeText={(value: any) => setAppNumber(value)}
          required={required && !appNumber}
        />
        <TouchableOpacity
          onPress={() => {
            _inquereRequestStatus();
          }}
          disabled={isLoading}
          style={style.searchButton}>
          {isLoading ? (
            <ActivityIndicator size={30 * BW()} color={colors.mainWhite} />
          ) : (
            <Animated.View style={animatedStyle}>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                color={colors.mainWhite}
                size={16 * BW()}
                style={{transform: [{rotate: isArabic() ? '180deg' : '0deg'}]}}
              />
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 12 * BW(),
    },
    searchContainer: {
      borderRadius: 50 * BW(),
      backgroundColor: colors.white,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5 * BW(),
      marginTop: 12 * BW(),
    },
    searchButton: {
      backgroundColor: colors.darkBlue,
      width: 40 * BW(),
      height: 40 * BW(),
      borderRadius: 50 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
  });
