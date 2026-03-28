import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BH, BW} from '../../style/theme';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../redux/store';
import DrawerLabel from './DrawerLabel';
export type Props = {
  name: string;
};

const DrawerScreen = (props: any) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {props.state.routes.map((route: any, i: any) => (
          <DrawerLabel
            title={t(`${route.name}`)}
            icon={route.icon}
            focused={i === props.state.index}
            onPress={!!route.onPress && route.onPress}
            route={route}
          />
        ))}
      </ScrollView>
    </>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
    },
    navigationContainer: {
      paddingHorizontal: 30 * BW(),
      marginTop: 10 * BW(),
    },
    btn: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: colors.primaryColor + '1A',
      width: '100%',
      height: 'auto',
      marginTop: 8 * BW(),
      borderRadius: 10 * BW(),
      paddingHorizontal: 20 * BW(),
    },
    activeBtn: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: colors.primaryColor + 'BB',
      width: '100%',
      height: 'auto',
      marginTop: 8 * BW(),
      paddingHorizontal: 20 * BW(),
      borderRadius: 10 * BW(),
    },
    iconUP: {
      width: 15 * BW(),
      height: 15 * BW(),
    },

    iconDown: {
      width: 15 * BW(),
      height: 15 * BW(),
    },
    activeSubBtn: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: colors.primaryColor + 'AA',
      width: '100%',
      height: 'auto',
      marginTop: 8 * BW(),
      borderRadius: 10 * BW(),
    },
    subBtn: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      width: '100%',
      height: 'auto',
      borderRadius: 10 * BW(),
    },
    logoContainer: {
      width: 140 * BW(),
      height: 90 * BH(),
      alignSelf: 'center',
      marginTop: 30 * BW(),
    },
    logo: {
      resizeMode: 'contain',
      width: '100%',
      height: '100%',
    },
    c: {
      fontSize: 7 * BW(),
      color: '#939598',
    },
    grayLogo: {
      position: 'absolute',
      left: -20 * BW(),
      width: 150 * BW(),
      top: 10 * BW(),
      height: 120 * BH(),
    },
    grayLogoImg: {
      tintColor: 'rgba(0,0,0,0.2)',
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
    },
  });

export default DrawerScreen;
