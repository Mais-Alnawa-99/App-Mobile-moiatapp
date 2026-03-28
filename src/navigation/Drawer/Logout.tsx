import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BH, BW} from '../../style/theme';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Text from '../../component/Text';
import Button from '../../component/Button';
import {versionNumber, production} from '../../../app.json';
import {setModalData} from '../../redux/reducers/General/modal';
import NavigationService from '../NavigationService';
import {clearAuthValues} from '../../redux/reducers/User/startup';
import {clearUserDataStoredValues} from '../../redux/reducers/User/userDataStored';
import {eservicesURL} from '../../redux/network/apiEservices';
import {clearUserILDataValues} from '../../redux/reducers/User/userILData';
import {clearTokenValues} from '../../redux/reducers/User/userToken';
import {clearTokenPayload} from '../../redux/reducers/User/tokenPayload';

export type Props = {
  name: string;
};

const Logout = (props: any) => {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {isLoggedIn} = useAppSelector(state => state.auth);
  const {t} = useTranslation();

  const dispatch = useAppDispatch();

  const confirmLogout = () => {
    dispatch(clearAuthValues());
    dispatch(clearUserDataStoredValues());
    dispatch(clearTokenValues());
    dispatch(clearUserILDataValues());
    dispatch(clearTokenPayload());

    NavigationService.closeDrawer();
    NavigationService.reset('initialRoute');

    // NavigationService.navigate('WebViewScreen', {
    //   url: eservicesURL + '/logout',
    //   hideDrawer: true,
    //   logout: true,
    //   style: {width: 0, height: 0},
    // });
  };
  const _logOut = () => {
    dispatch(
      setModalData({
        modalVisible: true,
        title: t('LOGOUT'),
        message: t('SURE_LOGOUT'),
        fun: () => {
          confirmLogout();
        },
        minHeight: '25%',
      }),
    );
  };
  return (
    <View
      style={[
        styles.container,
        !isLoggedIn && {alignItems: 'center', justifyContent: 'center'},
      ]}>
      {isLoggedIn && (
        <Button
          onPress={() => {
            _logOut();
          }}
          icon={require('../../assets/drawer/SignOut.png')}
          style={styles.btnContainer}
          containerIcon={styles.btn}
          title={t('LOGOUT')}
          medium
          styleIcon={styles.icon}
          styleText={{color: colors.mainWhite, marginLeft: 6 * BW()}}
        />
      )}
      <Text h4 medium style={{color: colors.mainWhite}}>
        {t('AppVersion')} {versionNumber}
        {!production && ' STG'}
      </Text>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    btnContainer: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    btn: {
      width: 24 * BW(),
      height: 24 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'center',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 16 * BW(),
      marginTop: 12 * BW(),
      width: '100%',
      position: 'absolute',
      bottom: 80 * BW(),
      height: 40 * BW(),
      backgroundColor: colors.backgroundDrawer,
    },
  });

export default Logout;
