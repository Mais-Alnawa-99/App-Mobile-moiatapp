import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';

import theme, {BW} from '../style/theme';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import NavigationService from '../navigation/NavigationService';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {clearAuthValues} from '../redux/reducers/User/startup';
import {production} from '../../app.json';
import {
  setTokenData,
  setUserHasProfiles,
} from '../redux/reducers/User/userToken';
import {
  clearUserDataStoredValues,
  setUserDataStored,
} from '../redux/reducers/User/userDataStored';
import {createApplication} from '../screens/services/Eservices/ServiceForm';
import {services} from '../screens/services/utils';
import {
  setILNeedUserId,
  setNeedRefreshToken,
} from '../redux/reducers/General/server';
import {setLoadingModal} from '../redux/reducers/General/loader';
import {baseILUrl} from '../redux/network/api_ILServices';
import {setUserILID} from '../redux/reducers/User/userILData';
function WebViewCustom({url, ...props}: any): JSX.Element {
  const [currentUrl, setCurrentUrl] = useState(url);

  const [key, setKey] = useState(1);
  const {colors}: any = useTheme();
  const dispatch = useAppDispatch();
  const {isLoggedIn} = useAppSelector(store => store.auth);
  const {userData} = useAppSelector(store => store.userDataStored);
  const {tokenData} = useAppSelector(store => store.userToken);
  const {needRefreshToken} = useAppSelector(store => store.server);
  const [logout, setLogout] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setKey(prevKey => prevKey + 1); // Reload WebView by changing key
      setCurrentUrl(url);
    }, [url]),
  );

  const styles = getStyle();
  //  let token = JSON.parse(localStorage.getItem('user'))?.access_token;
  // /newapp/
  // application/new
  let code = `
        let meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
        document.getElementsByTagName('head')[0].appendChild(meta);

        const headers = document.getElementsByTagName('header');
        if (headers.length > 0) {
            for (let i = 0; i < headers.length; i++) {
                headers[i].style.display = 'none';
            }
        }
        const footer = document.getElementsByTagName('footer');
        if (footer.length > 0) {
            for (let i = 0; i < headers.length; i++) {
                footer[i].style.display = 'none';
            }
        }

        let customer = document.getElementsByClassName('customer-pulse');
        if (customer.length > 0) {
            customer[0].style.display = 'none';
        }
        let information = document.getElementsByClassName('more-information');
        if (information.length > 0) {
            information[0].style.display = 'none';
        }
        let banner = document.getElementsByClassName('page-banner');
        if (banner.length > 0) {
            banner[0].style.display = 'none';
        }
        let chat = document.getElementsByClassName('chat-icon');
        if (chat.length > 0) {
            chat[0].style.display = 'none';
        }
        let breadcrumb = document.getElementsByClassName('breadcrumb');
        if (breadcrumb.length > 0) {
            breadcrumb[0].style.display = 'none';
        }
        let helpSSupport = document.getElementsByClassName('help-service-support');
        if (helpSSupport.length > 0) {
            helpSSupport[0].style.display = 'none';
        }
        let customerPulseWrap = document.getElementsByClassName('customer-pulse-wrap');
        if (customerPulseWrap.length > 0) {
            customerPulseWrap[0].style.display = 'none';
        }
        let aegov_breadcrumb = document.getElementsByClassName('aegov-breadcrumb');
        if (aegov_breadcrumb.length > 0) {
            aegov_breadcrumb[0].style.display = 'none';
        }
      setInterval(() => {
        let deafServicePlace = document.getElementById('DeafServicePlace');
          if (deafServicePlace) {
              deafServicePlace.style.display = 'none';
          }
        let ymPluginDivContainerInitial = document.getElementById('ymPluginDivContainerInitial');
        if (ymPluginDivContainerInitial) {
            ymPluginDivContainerInitial.style.display = 'none';
            clearInterval(); // Stop checking once the element is found
        }
        const serviceHeaders = document.getElementsByTagName('app-header');
        if (serviceHeaders.length > 0) {
            for (let i = 0; i < serviceHeaders.length; i++) {
                serviceHeaders[i].style.display = 'none';
            }
        }
             
        const serviceFooter = document.getElementsByTagName('footer');
        if (serviceFooter.length > 0) {
            for (let i = 0; i < serviceFooter.length; i++) {
                serviceFooter[i].style.display = 'none';
            }
        }
        let serviceDashboardInfo = document.getElementsByClassName('dashboard-info');
        if (serviceDashboardInfo.length > 0) {
            serviceDashboardInfo[0].style.display = 'none';
        }
        let headingWithIcons = document.getElementsByClassName('heading-with-icons');
        if (headingWithIcons.length > 0) {
            headingWithIcons[0].style.display = 'none';
        }
             let applicationSteps = document.getElementsByClassName('application-steps');
        if (applicationSteps.length > 0) {
            applicationSteps[0].style.display = 'none';
        }
            
        const style = document.createElement('style');
        style.innerHTML = ".form-section span::after {content: none !important;display: none !important;}"
        document.head.appendChild(style)
          
        document.querySelectorAll('.ant-spin-container button i').forEach(icon => {
          icon.remove();
        });
        const formApp = document.querySelector('.formApp');
        if (formApp) {
          formApp.style.paddingBottom = '70px';
        }
        const header = document.querySelector('.application-header');
        if (header) {
          header.style.padding = '0';
        }
          
        if (header) {
        
          const allElements = header.querySelectorAll('*');

          allElements.forEach(element => {
            element.style.fontSize = '14px'; 
          });

          header.style.fontSize = '14px';
          const statuses = document.querySelectorAll('.application-data-status .app-status');
          if(statuses) {
            statuses.forEach(status => {
              status.style.display = 'flex';                
              status.style.alignItems = 'center';            
              status.style.justifyContent = 'flex-start';     
              status.style.gap = '6px';                       

              const label = status.querySelector('label');
              const value = status.querySelector('.value');

              if (label) {
                label.style.fontWeight = 'bold';              
                label.style.color = '#b58d00';                
                label.style.whiteSpace = 'nowrap';             
                label.style.margin = '0';                    
              }

              if (value) {
                value.style.whiteSpace = 'nowrap';            
                value.style.margin = '0';                     
                value.style.color = '#333';                  
              }
            });
          }
            const previews = document.querySelectorAll('.preview');
            previews.forEach(preview => {
              if (preview) {
                preview.style.padding = '0'; 
                preview.style.border = '0'
              }
            });
        }

        let  serviceBottomBtn = document.getElementById('bottom-btn');
        if (serviceBottomBtn) {
            serviceBottomBtn.style.display = 'none';
            clearInterval()
        }
        let logoutLink = document.querySelector('a[href="/api/Account/Logout"]');
        if (logoutLink) {
            logoutLink.style.display = "none";
        }
      }, 100);
      
    `;

  const handleShouldStartLoadWithRequest = (request: any) => {
    if (!!request?.title) {
      props?.setTitle && props?.setTitle(request?.title);
    }

    const requestUrl = request?.url.toLowerCase();

    if (!production && !internalUrl.startsWith(baseILUrl)) {
      const original = 'https://eservices.moiat.gov.ae';
      const replacement = 'https://services-stag.moiat.gov.ae';
      if (requestUrl.startsWith(original)) {
        let tempUrl = requestUrl.replace(original, replacement);
        setCurrentUrl(tempUrl);
      }
    }
    if (!production) {
      const original = 'https://il.moiat.gov.ae';
      const replacement = 'https://il-stag.moiat.gov.ae';
      if (requestUrl.startsWith(original)) {
        let tempUrl = requestUrl.replace(original, replacement);
        setCurrentUrl(tempUrl);
      }
    }
    if (requestUrl.includes('/login') && !isLoggedIn) {
      NavigationService.navigate('dashboard');
      return true;
    }

    if (requestUrl.includes('/api/account/logout')) {
      setLogout(true);
      return true;
    }

    if (
      requestUrl.includes('/connect/authorize') &&
      (props?.logout || logout)
    ) {
      setLogout(false);
      dispatch(clearAuthValues());
      dispatch(clearUserDataStoredValues());
      NavigationService.reset('initialRoute');
      return true;
    }

    if (requestUrl.includes('account/logout') && (props?.logout || logout)) {
      setTimeout(() => {
        setLogout(false);
        dispatch(clearAuthValues());
        dispatch(clearUserDataStoredValues());
        NavigationService.reset('initialRoute');
      }, 500);

      return true;
    }

    return true;
  };
  const [internalUrl, setInternalUrl] = useState('');

  useEffect(() => {
    if (tokenData != null && !props?.withoutRediect) {
      const matchNew = internalUrl.match(/\/application\/new\/(\d+)/);
      const matchNewApp = internalUrl.match(/\/newapp\/(\d+)/);

      if (matchNew || matchNewApp) {
        const serviceId =
          (matchNew && matchNew[1]) || (matchNewApp && matchNewApp[1]);

        if (serviceId && services.includes(parseInt(serviceId))) {
          setInternalUrl('');
          createApplication(parseInt(serviceId));
        }
        // NavigationService.navigate('SelectProfile', {
        //   serviceId: serviceId,
        //   toScreen: 'ServiceForm',
        // });
      }
      // if (
      //   internalUrl.includes('/api/Home/ClientList') ||
      //   internalUrl.includes('/api/home/clientlist')
      // ) {
      //   setInternalUrl('');
      //   NavigationService.na('dashboard');
      // }
      const matchView = internalUrl.match(/\/application\/view\/(\d+)/);
      if (matchView) {
        const appId = matchView[1];
        setInternalUrl('');
        NavigationService.navigate('ApplicationDetails', {appId: appId});
      }
      const matchReceipt = internalUrl.match(/\/payment\/receipt\/(ord\d+)/);
      if (matchReceipt) {
        const orderNumber = matchReceipt[1];
        setInternalUrl('');
        NavigationService.navigate('PaymentsReceiptDetails', {
          orderNumber: orderNumber,
        });
      } else if (internalUrl.includes('/custom/recalled-product-inquiry')) {
        NavigationService.navigate('RecalledProductInquiry');
      } else if (internalUrl.includes('/custom/purchase-standards')) {
        NavigationService.navigate('PurchaseStandards');
      }
    }
  }, [internalUrl, tokenData]);

  let userDataCodeJs = `
        const interval = setInterval(() => {
          if (window.location.href.includes('/dashboard') || window.location.href.includes('/select-profile')) {
            let user = localStorage.getItem('user');
            let selectedProfileRecord = localStorage.getItem('selectedProfileRecord');
            let userHasProfiles = localStorage.getItem('userHasProfiles');
            if(!!userHasProfiles) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'userHasProfiles', data: userHasProfiles })); 
            }
            if (user) {
                clearInterval(interval);
                let userParse = JSON.parse(user);
                let jsonArgs = JSON.stringify(userParse); 
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'user', data: jsonArgs })); 
            }
            if (selectedProfileRecord) {
              let selectedProfileRecordParse = JSON.parse(selectedProfileRecord);
              let selectedProfileRecordArgs = JSON.stringify(selectedProfileRecordParse); 
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'selectedProfileRecord', data: selectedProfileRecordArgs }));
            }
          }
            if (window.location.href.includes('/dashboard') || window.location.href.includes('/Home/Factories')) { 
                let userILId = localStorage.getItem('userid');
                let userILIdjsonArgs = JSON.stringify(userILId); 
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'userILId', data: userILIdjsonArgs })); 
            }
        }, 100);
            `;
  const onMessage = (event: any) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (needRefreshToken || (isLoggedIn && tokenData == null))
      if (!!message?.data && message?.type == 'user') {
        let data = JSON.parse(message?.data);
        if (data != null) {
          dispatch(setTokenData({tokenData: data}));
          setTimeout(() => {
            dispatch(setNeedRefreshToken(false));
            dispatch(setLoadingModal(false));
          }, 2000);
        }
      } else if (!!message?.data && message?.type == 'selectedProfileRecord') {
        let data = JSON.parse(message?.data);
        if (message?.data != null) {
          dispatch(setUserDataStored({userData: data}));
        }
      } else if (!!message?.data && message?.type == 'userHasProfiles') {
        if (message?.data != null) {
          dispatch(setUserHasProfiles({userHasProfiles: message?.data}));
        }
      }

    if (
      message?.type == 'userILId' &&
      !!message?.data &&
      message?.data != null
    ) {
      let data = JSON.parse(message?.data);
      // dispatch(setUserILID({userId: '4DEF6CD6-5ABF-4232-BB3A-C886617858EA'}));
      dispatch(setUserILID({userId: data}));
      dispatch(setILNeedUserId(false));
    }
  };
  let tokenSetCode = '';
  if (!!userData) {
    let data = JSON.stringify(userData);
    tokenSetCode = `
      localStorage.setItem('profileSelected', 'yes');
      localStorage.setItem('userHasProfiles', 'yes');
      localStorage.setItem('selectedProfileRecord', ${JSON.stringify(data)});
  `;
  }

  return (
    <>
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'red'}}>
        <View style={styles.appContainer}>
          <WebView
            key={key}
            ref={props?.webViewRef}
            injectedJavaScript={
              tokenSetCode + code + userDataCodeJs + props?.code
            }
            onMessage={
              props.onMessage
                ? (event: any) => {
                    props.onMessage(event);
                    onMessage(event);
                  }
                : (event: any) => {
                    onMessage(event);
                  }
            }
            onNavigationStateChange={({url, canGoBack}) => {
              setInternalUrl(url);
              props?.setInternalUrl && props?.setInternalUrl(url);
              props?.setCanGoBack && props?.setCanGoBack(canGoBack);
            }}
            renderLoading={() => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  backgroundColor: colors.mainBackground,
                }}>
                <ActivityIndicator
                  style={{alignSelf: 'center'}}
                  size={30 * BW()}
                  color={theme.themeObject.colors.primary}
                />
              </View>
            )}
            source={{
              uri: currentUrl,
            }}
            cacheEnabled={false}
            cacheMode="LOAD_NO_CACHE"
            style={{flex: 1, width: '100%', height: '100%', ...props.style}}
            startInLoadingState={true}
            scalesPageToFit={false}
            allowUniversalAccessFromFileURLs={true}
            javaScriptEnabled={true}
            setSupportMultipleWindows={false}
            javaScriptCanOpenWindowsAutomatically={true}
            domStorageEnabled={true}
            allowFileAccess={true}
            mediaPlaybackRequiresUserAction={true}
            allowsFullscreenVideo={false}
            allowsInlineMediaPlayback={true}
            bounce={false}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            onLoadEnd={() => {
              props?.setIsLoading && props?.setIsLoading(false);
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const getStyle = () =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: '#fff',
      minHeight: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: 'white',
    },
  });

export default WebViewCustom;
