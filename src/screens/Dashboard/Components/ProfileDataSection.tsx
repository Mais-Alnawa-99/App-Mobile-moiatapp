import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as Animatable from 'react-native-animatable';

import Text from '../../../component/Text';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../style/theme';
import {isArabic} from '../../../locales';
import NavigationService from '../../../navigation/NavigationService';
import {useAppSelector} from '../../../redux/store';
import Button from '../../../component/Button';
import Logout from '../../../component/Logout';
import {SSO_URL} from '../../../redux/network/api';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import CustomImage from '../../../component/CustomImage';

export default function ProfileDataSection({
  showSwitchProfile,
  showSwitchFactories,
  showEditProfile,
}: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const {userName, isLoggedIn, userNameAR, userNameEN} = useAppSelector(
    state => state.auth,
  );

  const {userHasProfiles} = useAppSelector(state => state.userToken);
  const userImgProfile = useAppSelector(
    store => store.userImgProfile.userImgProfile,
  );
  return (
    <>
      <Animatable.View
        animation={'fadeIn'}
        style={[
          style.container,
          showSwitchProfile && {paddingBottom: 24 * BW()},
        ]}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            NavigationService.navigate('UserDetails');
          }}>
          <View style={style.userImage}>
            {!!userImgProfile ? (
              <CustomImage
                url={userImgProfile}
                style={{height: '100%', width: '100%'}}
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                color={colors.lightgray}
                size={24 * BW()}
              />
            )}
          </View>
          <Text h3 medium style={style.userName}>
            {isArabic() && !!userNameAR
              ? userNameAR
              : !isArabic() && !!userNameEN
              ? userNameEN
              : userName}
          </Text>
        </TouchableOpacity>
        <View
          style={[style.row, !showEditProfile && {justifyContent: 'flex-end'}]}>
          <View
            style={{
              width: 32 * BW(),
              height: 32 * BW(),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20 * BW(),
              padding: 6 * BW(),
              backgroundColor: colors.mainWhite + '22',
            }}>
            <Logout hideTitle style={style.btnContainer} />
          </View>
          {showEditProfile && (
            <Button
              style={style.btnContainer}
              title={t('Labels.EditProfile')}
              medium
              icon={require('../../../assets/icons/edit.png')}
              containerIcon={style.containerIcon}
              styleIcon={style.icon}
              styleText={{color: colors.mainWhite, marginLeft: 6 * BW()}}
              onPress={() =>
                NavigationService.navigate('WebViewScreen', {
                  url: SSO_URL + '/Account/EditProfile/?client_id=',
                })
              }
            />
          )}
        </View>
      </Animatable.View>
      {showSwitchProfile && userHasProfiles != 'no' && (
        <Animatable.View animation={'fadeIn'} delay={200}>
          <Button
            style={{...style.btnContainer, ...style.switchBtn}}
            title={t('Labels.SwitchProfile')}
            medium
            activeOpacity={0.8}
            // icon={require('../../../assets/icons/edit.png')}
            containerIcon={style.containerIcon}
            styleIcon={style.icon}
            styleText={{color: colors.mainWhite, marginLeft: 6 * BW()}}
            onPress={() => NavigationService.navigate('SelectProfile')}
          />
        </Animatable.View>
      )}
      {showSwitchFactories && (
        <Animatable.View animation={'fadeIn'} delay={200}>
          <Button
            style={{...style.btnContainer, ...style.switchBtn}}
            title={t('IL.SwitchFactories')}
            medium
            activeOpacity={0.8}
            // icon={require('../../../assets/icons/edit.png')}
            containerIcon={style.containerIcon}
            styleIcon={style.icon}
            styleText={{color: colors.mainWhite, marginLeft: 6 * BW()}}
            onPress={() => NavigationService.navigate('SwitchFactories')}
          />
        </Animatable.View>
      )}
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    container: {
      backgroundColor: colors.primaryColor,
      borderRadius: 12 * BW(),
      padding: 16 * BW(),
      paddingHorizontal: 32 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      // marginTop: 42 * BW(),
    },
    userImage: {
      height: 40 * BW(),
      width: 40 * BW(),
      borderRadius: 60 * BW(),
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    userName: {
      color: colors.mainWhite,
      // paddingHorizontal: 20 * BW(),
      // textAlign: 'center',
      flex: 1,
      // marginTop: 8 * BW(),
      marginStart: 8 * BW(),
    },
    btnContainer: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row-reverse',
      gap: 4 * BW(),
    },
    containerIcon: {
      width: 24 * BW(),
      height: 24 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'center',
    },
    switchBtn: {
      backgroundColor: colors.secondaryColor,
      width: 200 * BW(),
      padding: 8 * BW(),
      alignSelf: 'center',
      borderRadius: 24 * BW(),
      marginTop: -16 * BW(),
    },
  });
