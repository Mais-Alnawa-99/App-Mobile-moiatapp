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
import PageBg from '../../component/PageBg';
import Page from '../../component/Page';

function UaePassWelcomeScreen(props: any): JSX.Element {
  let params = props.route?.params;
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const [errorMsg, setErrorMsg] = useState('');
  const [chooseLinking, setChooseLinking] = useState(false);

  const dispatch = useAppDispatch();
  const {authCode} = useAppSelector(store => store.UaePass.uaePassAuthCode);

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
            <Loader
              style={{backgroundColor: 'transparent'}}
              isLoading={
                accessTokenLoader || infoLoader || verfiyDigitalLoader
              }>
              <View
                style={{
                  flex: 1,
                }}>
                <View>
                  <Text h4> {t('SignUpUsePassLinking')}</Text>
                  <Text h3 bold>
                    {t('SignUpNoAccountInSystem')}
                  </Text>
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Button
                        onPress={() =>
                          NavigationService.navigate('UaePassLogincreen')
                        }
                        title={t('yes')}
                        style={{
                          ...styles.mainBtn,
                          backgroundColor: colors.goldeText,
                        }}
                        styleText={{color: '#fff'}}
                      />
                      <Button
                        onPress={() =>
                          NavigationService.navigate('SignUpScreen')
                        }
                        title={t('no')}
                        style={{
                          ...styles.mainBtn,
                          backgroundColor: colors.textGray,
                        }}
                        styleText={{color: '#fff'}}
                      />
                    </View>
                    <View style={{marginTop: 20 * BW()}}>
                      <Text h4>{t('SignupLinkAccount')}</Text>
                      <Text h4>{t('SignUpCreateUaepassAccount')}</Text>
                      <Text h4>{t('noteUaepass')}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Loader>
          </Page>
        </ImageBackground>
      </View>
    </PageBg>
  );
}

export default UaePassWelcomeScreen;

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },
    mainBtn: {
      width: '45%',
      height: 'auto',
      padding: 8 * BW(),
      marginTop: 8 * BW(),
      marginHorizontal: 8 * BW(),
      alignSelf: 'center',
      borderRadius: 8 * BW(),
    },
  });
