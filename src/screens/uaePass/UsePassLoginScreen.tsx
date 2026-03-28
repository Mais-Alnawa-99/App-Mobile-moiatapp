import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Linking,
  Platform,
  ImageBackground,
} from 'react-native';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import {BW} from '../../style/theme';
import reactotron from '../../redux/reactotron';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  getUaePassToken,
  getUaePassUserInfo,
} from '../../redux/reducers/UaePass/thunk/uaePass';
import {setAuthValues, setUserName} from '../../redux/reducers/User/startup';
import Loader from '../../component/Loader';
import Text from '../../component/Text';
import NavigationService from '../../navigation/NavigationService';
import Button from '../../component/Button';
import {useTranslation} from 'react-i18next';
import Header from '../../component/Header';
import {isArabic} from '../../locales';
import {setWebviewUrl} from '../../redux/reducers/General/webview';
import {setAuthenticated} from '../../redux/reducers/General/securityAuth';
import {SSO_URL} from '../../redux/network/api';
import Input from '../../component/input/Input';
import PageBg from '../../component/PageBg';
import Page from '../../component/Page';

function UaePassLogincreen(props: any): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useAppDispatch();

  const {url} = useAppSelector(store => store.webview);

  const {accessTokenData, accessTokenLoader}: any = useAppSelector(
    store => store.UaePass.uaePassTokenSlice,
  );
  const {info, infoLoader}: any = useAppSelector(
    store => store.UaePass.uaePassInfoSlice,
  );
  const {verfiyDigital, verfiyDigitalLoader} = useAppSelector(
    store => store.UaePass.uaePassVerfiyDigital,
  );

  return (
    <PageBg>
      <View style={styles.container}>
        <ImageBackground
          source={colors.mainBackgroundImg}
          style={{
            height: '100%',
            width: '100%',
          }}>
          <Page
            withStatusBar
            styles={{
              padding: 8 * BW(),
            }}
            header={<Header hideDrawer titleContainerStyle={{flex: 8}} />}
            withHeader>
            <View style={{flex: 1}}>
              <Text bold h3>
                {t('SignUpUsePassLinking')}
              </Text>
              <Text h4>{t('LoginDigitalIdLinkingSubtitle')}</Text>

              <Input
                textInput
                label={t('LoginUsernameOrEmail')}
                requiredStar
                styleInput={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                }}
                //   error={touched.Specs && errors.Specs}
                //   required={touched.Specs && errors.Specs}
              />
              <Input
                textInput
                label={t('LoginPassword')}
                requiredStar
                styleInput={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                }}
                //   error={touched.Specs && errors.Specs}
                //   required={touched.Specs && errors.Specs}
              />

              <Button
                onPress={() => NavigationService.navigate('UaePassWebView')}
                title={t('LoginLinkAccountBtn')}
                style={{
                  ...styles.mainBtn,
                  backgroundColor: colors.goldeText,
                  width: '70%',
                }}
                styleText={{color: '#fff'}}
              />
              <Text h4>{t('LoginNote')}</Text>
            </View>
          </Page>
        </ImageBackground>
      </View>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },
    mainBtn: {
      height: 'auto',
      padding: 8 * BW(),
      marginVertical: 20 * BW(),
      marginHorizontal: 4 * BW(),

      borderRadius: 8 * BW(),
    },
  });
export default UaePassLogincreen;
