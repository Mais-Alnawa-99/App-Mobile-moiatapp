import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Button, BackHandler} from 'react-native';
import WebViewCustom from '../component/WebView';
import NavigationService from '../navigation/NavigationService';
import Header from '../component/Header';
import {useTheme} from '@react-navigation/native';
import Page from '../component/Page';
import {BW} from '../style/theme';
import WebView from 'react-native-webview';
import {useAppDispatch} from '../redux/store';
import {setModalData} from '../redux/reducers/General/modal';
import {useTranslation} from 'react-i18next';

export const exitConfirm = (dispatch: any, t: any, toHome: boolean = false) => {
  dispatch(
    setModalData({
      modalVisible: true,
      title: t('exitConfirmTitle'),
      message: t('exitConfirmMessage'),
      fun: () => {
        if (toHome) {
          NavigationService.goToRoot();
        } else {
          NavigationService.goBack();
        }
      },
      minHeight: '30%',
    }),
  );
};
function WebViewScreen(props: any): JSX.Element {
  let params = props?.route?.params;
  let customTitle = params?.title;

  const {colors} = useTheme();
  const styles = getStyle(colors);
  const [canGoBack, setCanGoBack] = useState(false);
  const [title, setTitle] = useState('');
  const [internalUrl, setInternalUrl] = useState(params?.url);
  const webViewRef = useRef<WebView>(null);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const handleBackButtonPress = () => {
    try {
      if (internalUrl?.match(/\/application\/new\/(\d+)/)) {
        exitConfirm(dispatch, t);
        return true;
      }
      if (canGoBack) {
        webViewRef.current?.goBack();
      } else {
        NavigationService.goBack();
      }
    } catch (err) {}
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonPress,
      );
    };
  }, []);

  return (
    <View style={styles.appContainer}>
      <Page
        withStatusBar
        styles={{
          paddingHorizontal: 0 * BW(),
        }}
        withHeader
        withOutDrawer={params?.withOutDrawer}
        contentContainerStyle={{paddingBottom: 0}}
        header={
          <Header
            onPress={() => handleBackButtonPress()}
            title={customTitle ? customTitle : title}
            titleContainerStyle={{flex: 5}}
            hideBack={params?.hideBack && !canGoBack}
            hideDrawer={params?.hideDrawer}
            showBackDrawer={params.showBackDrawer}
          />
        }>
        <WebViewCustom
          url={params?.url}
          setCanGoBack={setCanGoBack}
          webViewRef={webViewRef}
          setTitle={setTitle}
          code={params?.code}
          onMessage={params?.onMessage}
          logout={params?.logout}
          internalUrl={internalUrl}
          setInternalUrl={setInternalUrl}
          {...params}
        />
      </Page>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors?.mainBackground,
    },
    container: {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: 'white',
    },
  });

export default WebViewScreen;
