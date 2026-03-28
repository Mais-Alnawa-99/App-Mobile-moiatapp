import {Dimensions, Platform} from 'react-native';
import {reduxStorage, store} from '../redux/store';
import {DefaultTheme} from '@react-navigation/native';
import {setFontValue} from '../redux/reducers/General/fontSize';
import {setFontFamilyValue} from '../redux/reducers/General/fontFamily';
import {setThemeValue} from '../redux/reducers/General/theme';

let width: number = Dimensions.get('window').width;
let height: number = Dimensions.get('window').height;

export const getWidth = () => {
  const deviceDeminsions = store?.getState().dimensions.width;

  if (!deviceDeminsions) return width;
  return width;
};

export const getHeight = () => {
  const deviceDeminsions = store?.getState().dimensions.height;

  if (!deviceDeminsions) return height;
  return height;
};
const isPortrait = () => {
  return getHeight() >= getWidth();
};
export function BW(): number {
  if (isPortrait()) {
    return getWidth() / 375;
  } else {
    return getWidth() / 910;
  }
}
export function BH(): number {
  if (isPortrait()) {
    return getHeight() / 910;
  } else {
    return getHeight() / 375;
  }
}

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: 'rgba(0, 0, 0)',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
    },
    android: {
      elevation: 4,
    },
  }),
};
export const Theme = {
  ...DefaultTheme,
  colors: {
    primaryColor: '#334155',
    primary: '#334155',
    textPrimaryColor: '#334155',
    backgroundDrawer: '#334155',
    iconPrimaryColor: '#334155',
    lightPrimaryColor: '#94A3B8',
    lightPrimaryTextColor: '#64748B',
    secondaryColor: '#92722A',
    lightSecondaryColor: '#D7BC6D',
    mainBackground: '#F5F7FA',
    tintColorDrawerHeader: '#fff',
    backgroundDrawerContent: '#475569',
    tintColor: '#0f1214',
    white: '#ffffff',
    darkBlue: '#1E293B',
    background: '#ffffff',
    darkgreen: '#3B7272',
    black: '#000000',
    textColor: '#303030',
    green: '#2E9D7A',
    gray: '#CBD5E1',
    card: '#F5F6FA',
    text: '#2B2B2B',
    border: '#D9D9D9',
    notification: 'rgb(255, 69, 58)',
    lightgray: '#DEE0E1',
    lightRed: 'rgba(229, 108, 108, 1)',
    darkWhite: '#FEFEFE',
    lightGold: 'rgba(190, 150, 97, 0.08)',
    blue: '#8BBDEC',
    golden: '#92722A',
    backgroundColorInput: '#fff',
    textGray: '#A6A6A6',
    backgroundDark: '#3D3D3D',
    darkGray: '#50535bff',
    ratingBackground: '#F1F3F6',
    softGold: '#F8E2C8',
    goldeText: '#CE9C56',
    yellow: '#FFB74A',
    red: '#D83731',
    darkBorder: '#575757',
    mainWhite: '#ffffff',
    mainBackgroundImg: require('../assets/background/imageBackground.png'),
    introBackgroundImg: require('../assets/background/introBackground.png'),
    blurType: 'xlight',
    seleketonBackground: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(122, 135, 138, 0.6)',
  },
};

export const darkTheme = {
  mainBackground: '#0f1214',
  background: '#1c1c1c',
  backgroundColorInput: '#1c1c1c',
  white: '#1c1c1c',
  lightPrimaryColor: '#CBD5E1',
  lightPrimaryTextColor: '#CBD5E1',
  textColor: '#CBD5E1',
  text: '#CBD5E1',
  iconPrimaryColor: '#CBD5E1',
  textPrimaryColor: '#CBD5E1',
  mainWhite: '#CBD5E1',
  mainBackgroundImg: require('../assets/background/bgHomeDark.png'),
  introBackgroundImg: require('../assets/background/bgTourDark.png'),
  backgroundDrawerContent: '#1c1c1c',
  backgroundDrawer: '#0f1214',
  darkBlue: '#0f1214',
  primaryColor: '#1c1c1c',
  primary: '#1c1c1c',
  blurType: 'dark',
  seleketonBackground: 'rgba(255, 255, 255, 0.25)',
  tawasulColor: '#CBD5E1',
  darkGray: '#CBD5E1',
};

const goldColors = Theme.colors;

const normalFontSize = {
  h1: 18 * BW(),
  h2: 16 * BW(),
  h3: 14 * BW(),
  h4: 12 * BW(),
  h5: 10 * BW(),
  h6: 8 * BW(),
};

export const normalMontserratFontSize = {
  h1: 15 * BW(),
  h2: 13 * BW(),
  h3: 11 * BW(),
  h4: 9.5 * BW(),
};

const mediumFontSize = {
  h1: 20 * BW(),
  h2: 18 * BW(),
  h3: 16 * BW(),
  h4: 14 * BW(),
  h5: 12 * BW(),
  h6: 10 * BW(),
};

const largFontSize = {
  h1: 22 * BW(),
  h2: 20 * BW(),
  h3: 18 * BW(),
  h4: 16 * BW(),
  h5: 14 * BW(),
  h6: 12 * BW(),
};

const notoKontTypeKufi = {
  normal: 'NotoKufiArabic-Regular',
  medium: 'NotoKufiArabic-Medium',
  bold: 'NotoKufiArabic-Bold',
};

const fontTypeRoboto = {
  normal: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
};

let fonts = {
  currentFontFamilyEN: fontTypeRoboto,
  fontFamilyEN: 'Roboto',
  currentFontFamilyAR: notoKontTypeKufi,
  fontFamilyAR: 'notoKufi',
};

const themeObject = {
  currentFontFamily: fontTypeRoboto,
  fontFamily: 'Roboto',
  currentFontSize: normalFontSize,
  fontSize: 'normal',
  colors: goldColors,
  currentTheme: 'brown',
  ...fonts,
};

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
};
export default {
  themeObject,
  shadow,
  normalMontserratFontSize,
};

export const initTheme = async (isArabic: boolean) => {
  if (isArabic) {
    themeObject.currentFontFamily = fonts.currentFontFamilyAR;
    themeObject.fontFamily = fonts.fontFamilyAR;
  } else {
    themeObject.currentFontFamily = fonts.currentFontFamilyEN;
    themeObject.fontFamily = fonts.fontFamilyEN;
  }

  let fontSize = await reduxStorage.getItem('@fontSize');
  if (!fontSize) {
    themeObject.currentFontSize = normalFontSize;
  } else {
    if (fontSize === 'normal') {
      themeObject.currentFontSize = normalFontSize;
      themeObject.fontSize = 'normal';
    } else if (fontSize === 'medium') {
      themeObject.currentFontSize = mediumFontSize;
      themeObject.fontSize = 'medium';
    } else if (fontSize === 'larg') {
      themeObject.currentFontSize = largFontSize;
      themeObject.fontSize = 'larg';
    }
  }
};

export const setFontSize = async (selected: any) => {
  store.dispatch(setFontValue(selected));
  await reduxStorage.setItem('@fontSize', selected);
  // RNRestart.Restart();
};

export const setFontFamily = async (font: any) => {
  store.dispatch(setFontFamilyValue(font));
  await reduxStorage.setItem('@fontFamily', font);
  // RNRestart.Restart();
};

export const setTheme = async (theme: any) => {
  store.dispatch(setThemeValue(theme));
  await reduxStorage.setItem('@theme', theme);
  // RNRestart.Restart();
};
