import React, {useState, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import WebView from 'react-native-webview';

import {store, useAppDispatch, useAppSelector} from '../../redux/store';
import theme, {BW} from '../../style/theme';
import {setModalData} from '../../redux/reducers/General/modal';
import Button from '../../component/Button';
import {isArabic} from '../../locales';
import {openBottomSheet} from '../../redux/reducers/General/bottomSheet';
import {production} from '../../../app.json';
import {
  closeCustomerPulse,
  openCustomerPulse,
} from '../../redux/reducers/General/customerPulse';

type CustomerPulseModalProps = {
  visible: boolean;
  token?: string;
  onClose: () => void;
};

const getCustomerPulseUrls = () =>
  production
    ? {
        ar: 'https://survey.customerpulse.gov.ae/F/An/?lang=ar',
        en: 'https://survey.customerpulse.gov.ae/F/An/?lang=en',
      }
    : {
        ar: 'https://sandboxsurvey.customerpulse.gov.ae/F/An/?lang=ar',
        en: 'https://sandboxsurvey.customerpulse.gov.ae/F/An/?lang=en',
      };

const buildInjectedJS = (token?: string) => {
  const lang = isArabic() ? 'ar' : 'en';
  let code = `
    try {
      (function() {
        var meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
        document.getElementsByTagName('head')[0].appendChild(meta);
        setInterval(function(){
          var closeBtn = document.querySelector('.cp-close-button');
          if (closeBtn) closeBtn.style.display = 'none';
        }, 800);
      })();
    } catch(e) {}
    true;
  `;
  if (token) {
    code += `
      try {
        (function() {
          if (window.CustomerPulse && typeof window.CustomerPulse.render === 'function') {
            window.CustomerPulse.render(
              document.getElementsByTagName('body')[0],
              {"modal": true, "back-drop": false, "token": "${token}", "lang": "${lang}"}
            );
            if (typeof window.CustomerPulse.closeModal === 'function') window.CustomerPulse.closeModal();
            if (typeof window.CustomerPulse.openModal === 'function') window.CustomerPulse.openModal();
            window.addEventListener('so-widget-closed', function() {
              try {
                if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                  window.ReactNativeWebView.postMessage('closed');
                }
              } catch(e) {}
            });
          }
        })();
      } catch(e) {}
      true;
    `;
  }
  return code;
};

const CustomerPulseModal: React.FC<CustomerPulseModalProps> = ({
  visible,
  token,
  onClose,
}) => {
  const urls = useMemo(getCustomerPulseUrls, []);
  const sourceUri = isArabic() ? urls.ar : urls.en;
  const injectedJavaScript = useMemo(() => buildInjectedJS(token), [token]);
  const {colors} = useTheme();
  const styles = getStyle(colors);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.modalContainer}>
        <Pressable style={styles.closeBtn} onPress={onClose}>
          <Image
            source={require('../../assets/icons/close.png')}
            style={{width: 18 * BW(), height: 18 * BW()}}
            resizeMode="contain"
          />
        </Pressable>
        <View style={styles.webviewWrapper}>
          <WebView
            source={{uri: sourceUri}}
            injectedJavaScript={injectedJavaScript}
            onMessage={e => {
              if (e?.nativeEvent?.data === 'closed') onClose();
            }}
            style={{width: '100%', height: '100%', marginTop: 30 * BW()}}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
            thirdPartyCookiesEnabled
            sharedCookiesEnabled
            originWhitelist={['*']}
            renderLoading={() => (
              <View style={styles.loader}>
                <ActivityIndicator
                  style={{alignSelf: 'center'}}
                  size={30 * BW()}
                  color={theme.themeObject.colors.primary}
                />
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export const _showCustomerPulse = (token: any) => {
  store.dispatch(openCustomerPulse({token: token}));
};
export default function CustomerPulse(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();
  const {open, token} = useAppSelector(s => s.customerPulse);

  return (
    <Animatable.View animation={'fadeInUp'} style={style.container}>
      <Button
        onPress={() => _showCustomerPulse('')}
        style={style.button}
        icon={require('../../assets/customerPluse.png')}
        containerIcon={style.containerIcon}
        styleIcon={style.styleIcon}
      />
      <CustomerPulseModal
        visible={open}
        token={token}
        onClose={() => dispatch(closeCustomerPulse())}
      />
    </Animatable.View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 10 * BW(),
      right: 20 * BW(),
      width: 50 * BW(),
      height: 50 * BW(),
      backgroundColor: colors.secondaryColor,
      borderRadius: 100 * BW(),
      overflow: 'hidden',
    },
    button: {
      width: '100%',
      borderRadius: 0,
      height: '100%',
      padding: 6 * BW(),
      backgroundColor: colors.secondaryColor,
    },
    styleIcon: {
      width: '100%',
      height: '100%',
    },
    containerIcon: {
      width: '100%',
      height: '100%',
    },
    backdrop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.45)'},
    modalContainer: {
      position: 'absolute',
      left: 0 * BW(),
      right: 0 * BW(),
      top: 150 * BW(),
      bottom: 0 * BW(),
      borderRadius: 16 * BW(),
      overflow: 'hidden',
      backgroundColor: '#0000',
    },
    webviewWrapper: {
      flex: 1,
      borderRadius: 16 * BW(),
      overflow: 'hidden',
      backgroundColor: 'white',
    },
    loader: {alignItems: 'center', justifyContent: 'center', height: '100%'},
    closeBtn: {
      position: 'absolute',
      top: 10 * BW(),
      right: 10 * BW(),
      zIndex: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: 34 * BW(),
      height: 34 * BW(),
      borderRadius: 20 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
