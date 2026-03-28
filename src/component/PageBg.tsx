import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

type TypeProps = {
  children?: React.ReactNode;
};
export default function PageBg({children}: TypeProps): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const customStyle = getStyle(colors);
  return (
    <View style={customStyle.appContainer}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        {children}
      </ImageBackground>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
  });
