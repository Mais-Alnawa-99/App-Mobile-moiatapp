import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';

import theme, {BH, BW} from '../style/theme';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../locales';
import {useAppSelector} from '../redux/store';
import {useRegisterSpeakableText} from './tts/TTSCollector';

type TypeProps = {
  style?: object;
  bold?: boolean;
  medium?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  justify?: boolean;
  numberOfLines?: any;
  onTextLayout?: any;
  children?: React.ReactNode;
  lineHeight?: boolean;
  ar?: boolean;
  en?: boolean;
  speakable?: boolean;
  speakScopeId?: string;
};
export default ({
  style,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  bold,
  medium,
  children,
  numberOfLines,
  onTextLayout,
  justify,
  lineHeight,
  ar,
  en,
  speakable = true,
  speakScopeId,
  ...props
}: TypeProps): JSX.Element => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {fontSizeValue} = useAppSelector(state => state.fontSize);

  let currentStyle = Object([
    styles.defaultTextStyle,
    {
      color: colors?.text,
      fontFamily:
        ar || isArabic()
          ? theme.themeObject.currentFontFamilyAR.normal
          : en
          ? theme.themeObject.currentFontFamilyEN.normal
          : theme.themeObject.currentFontFamily.normal,
      ...style,
    },
  ]);
  if (bold) {
    currentStyle = [
      ...currentStyle,
      {
        fontFamily:
          ar || isArabic()
            ? theme.themeObject.currentFontFamilyAR.bold
            : en
            ? theme.themeObject.currentFontFamilyEN.bold
            : theme.themeObject.currentFontFamily.bold,
        fontWeight: Platform.OS == 'android' ? '500' : 'bold',
      },
    ];
  }
  if (medium) {
    currentStyle = [
      ...currentStyle,
      {
        fontFamily:
          ar || isArabic()
            ? theme.themeObject.currentFontFamilyAR.medium
            : en
            ? theme.themeObject.currentFontFamilyEN.medium
            : theme.themeObject.currentFontFamily.medium,
        fontWeight: 500,
      },
    ];
  }
  if (justify) {
    currentStyle = [
      ...currentStyle,
      {textAlign: 'justify', writingDirection: 'rtl'},
    ];
  }

  if (h1) {
    currentStyle = [
      ...currentStyle,
      {fontSize: theme.themeObject.currentFontSize.h1 + fontSizeValue},
    ];
  }

  if (h2) {
    currentStyle = [
      ...currentStyle,
      {fontSize: theme.themeObject.currentFontSize.h2 + fontSizeValue},
    ];
  }
  if (h3) {
    currentStyle = [
      ...currentStyle,
      {fontSize: theme.themeObject.currentFontSize.h3 + fontSizeValue},
    ];
  }
  if (h4) {
    currentStyle = [
      ...currentStyle,
      {fontSize: theme.themeObject.currentFontSize.h4 + fontSizeValue},
    ];
  }
  if (h5) {
    currentStyle = [
      ...currentStyle,
      {fontSize: theme.themeObject.currentFontSize.h5 + fontSizeValue},
    ];
  }
  if (h6) {
    currentStyle = [
      ...currentStyle,
      {fontSize: theme.themeObject.currentFontSize.h6 + fontSizeValue},
    ];
  }
  if (lineHeight) {
    currentStyle = [{lineHeight: 26 * BH()}, ...currentStyle];
  }

  function ensureTrailingDot(s: string) {
    const str = (s || '').trim();
    if (!str) return '';
    if (/[.!?؟…]$/.test(str)) return str;
    return str + '.';
  }
  const plain =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
      ? children.filter(Boolean).join(' ')
      : typeof children === 'number'
      ? String(children)
      : '';

  useRegisterSpeakableText(ensureTrailingDot(plain), speakable, speakScopeId);

  return (
    <Text
      accessible={true}
      style={currentStyle}
      numberOfLines={numberOfLines}
      {...props}
      onTextLayout={onTextLayout}>
      {children}
    </Text>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    defaultTextStyle: {
      fontFamily: theme.themeObject.currentFontFamily.normal,
      fontSize: 10 * BW(),
      color: colors.textColor,
      textAlign: 'left',
      lineHeight: isArabic() ? undefined : 26 * BH(),
    },
  });
