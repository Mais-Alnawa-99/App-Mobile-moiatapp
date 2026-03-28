import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Animated, Image, StyleSheet, useColorScheme, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BH, BW} from '../../style/theme';
import {isArabic} from '../../locales';
import {useAppSelector} from '../../redux/store';

export default function LogoImage(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  const isDarkMode = useColorScheme() === 'dark';
  const {settings}: any = useAppSelector(state => state.settings);

  const getLogoSrc = () => {
    const isDark =
      (isDarkMode && settings.enabledDarkMode === undefined) ||
      settings.enabledDarkMode;

    const logoPaths = {
      arabic: {
        light: require('../../assets/logo/logo_ar.png'),
        dark: require('../../assets/logo/logoWhiteAR.png'),
      },
      english: {
        light: require('../../assets/logo/logo_en.png'),
        dark: require('../../assets/logo/logoWhiteEN.png'),
      },
    };

    const languageKey = isArabic() ? 'arabic' : 'english';
    const themeKey = props?.white || isDark ? 'dark' : 'light';

    return logoPaths[languageKey][themeKey];
  };

  return (
    <View style={[style.container, props.style]}>
      <Image
        source={getLogoSrc()}
        resizeMode={props?.resizeMode ? props?.resizeMode : 'cover'}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          ...props?.logoStyle,
        }}
      />
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 52 * BH(),
      marginTop: -4 * BH(),
      marginBottom: 8 * BH(),
      flex: 3,
    },
  });
