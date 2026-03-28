import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {isArabic} from '../../locales';
import {useAppSelector} from '../../redux/store';
import {SSO_URL} from '../../redux/network/api';
import {useTranslation} from 'react-i18next';
import WebViewCustom from '../../component/WebView';
import {eservicesURL} from '../../redux/network/apiEservices';
import {baseILUrl} from '../../redux/network/api_ILServices';

function AuthenticationPage(): JSX.Element {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();

  const {expiryDate, token, isLoggedIn} = useAppSelector(state => state.auth);
  const {needRefreshToken, ilNeedUserId} = useAppSelector(
    state => state.server,
  );

  return (
    <View style={styles.appContainer}>
      {/* {isLoggedIn && needRefreshToken && (
        <>
          <WebViewCustom
            url={
              isArabic()
                ? `${SSO_URL}/api/Home/ClientList?userToken=${token}&tokenExpiry=${expiryDate}&lang=ar&isMobileApp=true`
                : `${SSO_URL}/api/Home/ClientList?userToken=${token}&tokenExpiry=${expiryDate}&lang=en&isMobileApp=true`
            }
          />
          <View
            style={{
              width: 0,
              height: 0,
            }}>
            <WebViewCustom
              url={eservicesURL + '?lang=ar&isMobile=True'}
              style={{width: 0, height: 0}}
              // setIsLoading={setIsLoading}
            />
          </View>
        </>
      )}
      {isLoggedIn && ilNeedUserId && (
        <View
          style={{
            width: 0,
            height: 0,
          }}>
          <WebViewCustom
            url={baseILUrl}
            style={{width: 0, height: 0}}
            // setIsLoading={setIsLoading}
          />
        </View>
      )} */}
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      width: 0,
      height: 0,
    },
  });

export default AuthenticationPage;
