import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import moment from 'moment';
import Text from '../../../../component/Text';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Page from '../../../../component/Page';
import PageBg from '../../../../component/PageBg';
import {BH, BW} from '../../../../style/theme';
import Header from '../../../../component/Header';
import {useTranslation} from 'react-i18next';
import Loader from '../../../../component/Loader';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {isArabic} from '../../../../locales';
import {
  GetCompleteProfile,
  getUserProfile,
} from '../../../../redux/reducers/I-Services/thunk/sso';
import InfoRow from './UserInfoRow';
import * as Animatable from 'react-native-animatable';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Logout from '../../../../component/Logout';
import NavigationService from '../../../../navigation/NavigationService';
import {SSO_URL} from '../../../../redux/network/api';
import Button from '../../../../component/Button';
import CustomImage from '../../../../component/CustomImage';
import {setUserImgProfile} from '../../../../redux/reducers/User/userImgProfile';

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState<any>();
  const [avatarImg, setAvatarImg] = useState('');
  const [status, setStatus] = useState(false);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const userid = useAppSelector(store => store.userILData.userId);
  const [isLoading, setIsLoading] = useState(true);
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const signUpToken: any = useAppSelector(state => state.userToken);
  const expiry = new Date(signUpToken.expiresIn);
  const userImgProfile = useAppSelector(
    store => store.userImgProfile.userImgProfile,
  );
  const _getUserProfile = () => {
    setIsLoading(true);
    dispatch(getUserProfile({UserId: userid})).then(res => {
      if (res.meta.requestStatus == 'fulfilled') {
        setIsLoading(false);
        setStatus(true);
        setUserDetails(res?.payload?.result);
      }
    });
  };

  useEffect(() => {
    _getUserProfile();
  }, []);

  const _getUserImgProfile = () => {
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

  useFocusEffect(
    useCallback(() => {
      _getUserImgProfile();
    }, []),
  );
  const {tokenPayload} = useAppSelector(state => state.tokenPayload);
  const {userName, userNameAR, userNameEN} = useAppSelector(
    state => state.auth,
  );
  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="prof-scope"
        styles={{
          paddingHorizontal: 16 * BW(),
          paddingTop: 8 * BW(),
        }}
        withHeader
        header={<Header title={t('IL.MyProfile')} hideProfile />}>
        <Loader isLoading={isLoading}>
          <>
            {/* <Animatable.View animation="fadeIn" style={style.container}>
              <View style={style.center}>
                {/* <View style={style.userImage}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 50 * BW(),
                      lineHeight: isArabic() ? 98 * BH() : 90 * BH(),
                    }}>
                    {userDetails?.userName[0].toUpperCase()}
                  </Text>
                </View> 
                <Image
                  style={{
                    width: 20 * BW(),
                    height: 20 * BW(),
                    tintColor: colors.mainWhite,
                  }}
                  source={require('../../../../assets/icons/user.png')}
                />
                <Text h3 medium style={style.userName}>
                  {isArabic() && !!userDetails?.fullNameArabic
                    ? userDetails?.fullNameArabic
                    : !isArabic() && !!userDetails?.fullName
                    ? userDetails?.fullName
                    : userDetails?.userName}
                </Text>
              </View>
              <View style={style.actionBar}>
                <Button
                  style={style.btnContainer}
                  //title={t('Labels.EditProfile')}
                  medium
                  icon={require('../../../../assets/icons/edit.png')}
                  containerIcon={style.containerIcon}
                  styleIcon={style.icon}
                  // styleText={{color: colors.mainWhite}}
                  onPress={() =>
                    // NavigationService.navigate('', {
                    //   url: SSO_URL + '/Account/EditProfile/?client_id=',
                    // })
                    NavigationService.navigate('UaePassSignup', {
                      data: {userId: userid},
                      userInfo: userDetails,
                      update: true,
                    })
                  }
                />
                <Logout hideTitle style={style.btnContainer} />
              </View>
            </Animatable.View> */}

            <Animatable.View animation="fadeIn" style={style.container}>
              <View style={style.actionBar}>
                {expiry > new Date() && (
                  <Button
                    style={style.btnContainer}
                    title={t('Labels.EditProfile')}
                    medium
                    icon={require('../../../../assets/icons/edit.png')}
                    containerIcon={style.containerIcon}
                    styleIcon={style.icon}
                    styleText={{color: colors.mainWhite}}
                    onPress={() =>
                      // NavigationService.navigate('WebViewScreen', {
                      //   url: SSO_URL + '/Account/EditProfile/?client_id=',
                      // })
                      NavigationService.navigate('UaePassSignup', {
                        data: {userId: userid},
                        userInfo: tokenPayload,
                        update: true,
                      })
                    }
                  />
                )}
                <Logout style={style.btnContainer} />
              </View>

              <View style={style.center}>
                <View style={style.userImage}>
                  {!!userImgProfile ? (
                    <CustomImage
                      url={userImgProfile}
                      style={{height: 80 * BW(), width: 80 * BW()}}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      color={colors.lightgray}
                      size={40 * BW()}
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
              </View>
            </Animatable.View>
            <Text h3 medium style={style.info}>
              {t('MyInformation')}
            </Text>
            {!!userDetails?.designation && (
              <InfoRow
                label={t('IL.designation')}
                value={userDetails?.designation}
              />
            )}
            <InfoRow label={t('IL.Email')} value={userDetails?.email} />
            {!!userDetails?.phoneNumber && (
              <InfoRow
                label={t('PhoneNumber')}
                value={userDetails?.phoneNumber}
              />
            )}
            {userDetails?.company != '1' && (
              <>
                {!!userDetails?.company && (
                  <InfoRow label={t('company')} value={userDetails?.company} />
                )}
                {!!userDetails?.companyEmail && (
                  <InfoRow
                    label={t('CompanyEmail')}
                    value={userDetails?.companyEmail}
                  />
                )}
              </>
            )}
            {!!userDetails?.dateOfBirth && (
              <InfoRow
                label={t('DateOfBirth')}
                value={moment(userDetails?.dateOfBirth).format('MMM DD, YYYY')}
              />
            )}
            <InfoRow
              label={t('CountryofOrigin')}
              value={
                isArabic() ? userDetails?.countryAr : userDetails?.countryEn
              }
            />

            <InfoRow
              label={t('Gender')}
              value={isArabic() ? userDetails?.genderAr : userDetails?.genderEn}
            />
            <InfoRow
              label={t('Nationality')}
              value={
                isArabic()
                  ? userDetails?.nationalityAr
                  : userDetails?.nationalityEn
              }
            />

            <InfoRow
              label={t('Language')}
              value={
                isArabic() ? userDetails?.languageAr : userDetails?.languageEn
              }
            />
            <InfoRow
              label={t('IL.ResidenceStatus')}
              value={
                isArabic()
                  ? userDetails?.residenceStatusAr
                  : userDetails?.residenceStatusEn
              }
            />
            <InfoRow
              label={t('IL.SocialMedia')}
              value={
                isArabic()
                  ? userDetails?.socialMediaAr
                  : userDetails?.socialMediaEn
              }
            />

            {!!userDetails?.emiratesIdNumber && (
              <InfoRow
                label={t('EmiratesIDLabel')}
                value={userDetails?.emiratesIdNumber}
              />
            )}

            {!!userDetails?.workPhone && (
              <InfoRow
                label={t('IL.WorkPhone')}
                value={userDetails?.workPhone}
              />
            )}

            <InfoRow
              label={t('IL.DateCreated')}
              value={moment(userDetails?.createdDate).format('MMM DD, YYYY')}
            />
            <InfoRow
              label={t('CityLabel')}
              value={isArabic() ? userDetails?.cityAr : userDetails?.cityEn}
            />
            <InfoRow
              label={t('RegistrationType')}
              value={
                isArabic()
                  ? userDetails?.registrationTypeAr
                  : userDetails?.registrationTypeEn
              }
            />
            {(!!userDetails?.userTypeAr || !!userDetails?.userTypeEn) && (
              <InfoRow
                label={t('IL.UserType')}
                value={
                  isArabic() ? userDetails?.userTypeAr : userDetails?.userTypeEn
                }
              />
            )}

            {!!userDetails?.emiratesIDExpiryDate && (
              <InfoRow
                label={t('IDExpirationDate')}
                value={moment(userDetails?.emiratesIDExpiryDate).format(
                  'MMM DD, YYYY',
                )}
              />
            )}
            {!!userDetails?.passportExpiryDate && (
              <InfoRow
                label={t('PassportExpirationDate')}
                value={moment(userDetails?.passportExpiryDate).format(
                  'MMM DD, YYYY',
                )}
              />
            )}
          </>
        </Loader>
      </Page>
    </PageBg>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    requestsBtn: {
      backgroundColor: colors.secondaryColor,
      borderRadius: 32 * BW(),
      paddingVertical: 0 * BW(),
      marginTop: 12 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      width: '35%',
      height: 40 * BW(),
    },
    applicationStatus: {
      backgroundColor: colors?.red + '33',
      paddingHorizontal: 36 * BW(),
      padding: 4 * BW(),
      borderRadius: 24 * BW(),
      alignSelf: 'flex-start',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8 * BW(),
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      flexShrink: 0, // right side stays fixed
    },
    container: {
      backgroundColor: colors.primaryColor,
      borderRadius: 12 * BW(),
      padding: 16 * BW(),
      paddingHorizontal: 12 * BW(),
    },
    actionBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userImage: {
      height: 80 * BW(),
      width: 80 * BW(),
      borderRadius: 60 * BW(),
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12 * BW(),
      marginBottom: 12 * BW(),
      overflow: 'hidden',
    },
    center: {
      alignItems: 'center',
    },
    userName: {
      color: colors.mainWhite,
      textAlign: 'center',
    },
    btnContainer: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6 * BW(),
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
    info: {
      color: colors.textPrimaryColor,
      marginBottom: 4 * BW(),
      marginTop: 6 * BW(),
    },
  });

export default UserDetails;
