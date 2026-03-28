import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../../component/Text';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import Animated, {FlipInEasyY, Easing} from 'react-native-reanimated';
import {isArabic} from '../../locales';
import NavigationService from '../../navigation/NavigationService';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  GetCompleteProfile,
  getSsoToken,
} from '../../redux/reducers/I-Services/thunk/sso';

import {setUserImgProfile} from '../../redux/reducers/User/userImgProfile';
import CustomImage from '../../component/CustomImage';
import {setUserILID} from '../../redux/reducers/User/userILData';
import {setTokenData} from '../../redux/reducers/User/userToken';
import {decodeJWT} from '../../component/Generalfunction';
export default function LoginSection(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const {userName, isLoggedIn, userNameAR, userNameEN} = useAppSelector(
    state => state.auth,
  );

  const signUpToken: any = useAppSelector(state => state.userToken);
  const {tokenPayload} = useAppSelector(state => state.tokenPayload);
  const userid = useAppSelector(store => store.userILData.userId);
  const userImgProfile = useAppSelector(
    store => store.userImgProfile.userImgProfile,
  );

  const dispatch = useAppDispatch();
  const _getUserProfile = () => {
    dispatch(
      GetCompleteProfile({
        body: {
          ClientId: 'MOIAT_Mobile',
          LanguageId: isArabic() ? 2 : 1,
          UserId: userid,
        },
        header: {
          authorization: 'Bearer ' + signUpToken.tokenData?.access_token,
        },
      }),
    ).then(res => {
      if (res.meta.requestStatus == 'fulfilled') {
        dispatch(setUserImgProfile({userImgProfile: res?.payload?.avatarUrl}));
      }
    });
  };

  const _getToken = () => {
    dispatch(getSsoToken(tokenPayload)).then(res1 => {
      if (
        res1.meta.requestStatus === 'fulfilled' &&
        res1.payload.networkSuccess &&
        res1.payload?.access_token
      ) {
        const payload = decodeJWT(res1.payload?.access_token);
        if (payload != null) {
          dispatch(setUserILID({userId: payload?.Id}));
          dispatch(
            setTokenData({
              tokenData: res1.payload,
            }),
          );
          _getUserProfile();
          return;
        }
      }
    });
  };
  useEffect(() => {
    if (isLoggedIn) _getToken();
  }, []);
  return (
    <Animated.View
      entering={FlipInEasyY.delay(200).duration(600).easing(Easing.ease)}
      style={[style.container, {marginTop: isLoggedIn ? 40 * BW() : 6 * BW()}]}>
      {isLoggedIn && (
        <TouchableOpacity
          style={style.userImage}
          activeOpacity={0.5}
          onPress={() => NavigationService.navigate('dashboard')}>
          {!!userImgProfile ? (
            <CustomImage
              url={userImgProfile}
              style={{height: 80 * BW(), width: 80 * BW()}}
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              color={colors.lightgray}
              size={45 * BW()}
            />
          )}
        </TouchableOpacity>
      )}
      {!isLoggedIn && (
        <>
          <Text
            h4={isArabic()}
            h3={!isArabic()}
            medium
            style={style.welcomeMsg}>
            {t('Welcome_to_MoIAT_Services')}
          </Text>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('dashboard')}
            style={style.loginBtn}>
            {/* <Image
            source={
              isArabic()
                ? require('../../assets/login/AR_UAEPASS_Sign_in_Btn_Active.png')
                : require('../../assets/login/UAEPASS_Sign_in_Btn_Outline_Active.png')
            }
            style={style.uaepassLogin}
          /> */}
            <Text h3 medium speakable={false} style={style.loginText}>
              {t('Login')}
            </Text>
          </TouchableOpacity>
        </>
      )}
      {isLoggedIn && (
        <Text h2 medium style={style.userName}>
          {isArabic() && !!userNameAR
            ? userNameAR
            : !isArabic() && !!userNameEN
            ? userNameEN
            : userName}
        </Text>
      )}
    </Animated.View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryColor,
      borderRadius: 12 * BW(),
      paddingHorizontal: 8 * BW(),
      paddingVertical: 12 * BW(),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 70 * BW(),
      // marginTop: 42 * BW(),
    },
    uaepassLogin: {
      minWidth: 300 * BW(),
      height: 45 * BW(),
      resizeMode: 'contain',
      marginTop: 4 * BW(),
    },
    userImage: {
      height: 80 * BW(),
      width: 80 * BW(),
      borderRadius: 50,
      backgroundColor: colors.background,
      top: -40,
      zIndex: 5,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    loginBtn: {
      backgroundColor: colors.mainWhite,
      borderRadius: 12 * BW(),
      padding: 6 * BW(),
      width: isArabic() ? '70%' : '60%',
      marginTop: isArabic() ? 6 * BW() : 8 * BW(),
      minHeight: 35 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginText: {
      textAlign: 'center',
      color: colors.primaryColor,
    },
    userName: {
      color: colors.mainWhite,
      paddingHorizontal: 20 * BW(),
      textAlign: 'center',
      marginTop: 36 * BW(),
    },
    welcomeMsg: {
      color: colors.mainWhite,
      textAlign: 'center',
      width: '80%',
    },
  });
