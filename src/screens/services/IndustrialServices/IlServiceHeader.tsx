/* eslint-disable react/react-in-jsx-scope */
import {t} from 'i18next';
import Header from '../../../component/Header';
import Page from '../../../component/Page';
import PageBg from '../../../component/PageBg';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {exitConfirm} from '../../WebViewScreen';
import {ApplicationWorkflow} from './staticForms/ApplicationWorkflow';
import {BW} from '../../../style/theme';
import NavigationService from '../../../navigation/NavigationService';
import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import Loader from '../../../component/Loader';
import {_openModal} from '../Eservices/ServiceForm';

import PayNow from './PayNow';
import {useTheme} from '@react-navigation/native';

export const SPHeader = ({service, exitForm, children, canPay}: any) => {
  const dispatch = useAppDispatch();
  const loadingApplication = useAppSelector(
    state => state.loader.loadingApplication,
  );
  const applicationDetails = {
    Id: service?.ApplicationId,
    FormId: service?.serviceId,
    ApplicationName: service?.name,
    // canPay: service?.canPay,
  };
  const {colors}: any = useTheme();

  const slideAnim = useRef(new Animated.Value(300)).current; // start 50px below
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loadingApplication) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loadingApplication]);

  return (
    <PageBg>
      <Page
        withStatusBar
        hideBottomTab
        withHeader
        styles={{padding: 8 * BW()}}
        header={
          <Header
            title={service?.name}
            hideDrawer
            onPress={() =>
              exitForm ? NavigationService.goBack() : exitConfirm(dispatch, t)
            }
            onHomePress={() =>
              exitForm
                ? NavigationService.goBack()
                : exitConfirm(dispatch, t, true)
            }
            titleContainerStyle={{flex: 8}}
          />
        }>
        <Loader isLoading={loadingApplication}>
          <>
            <ApplicationWorkflow service={service} />
            <Animated.View
              style={{
                transform: [{translateY: slideAnim}],
                opacity: opacityAnim,
              }}>
              {children}
            </Animated.View>
          </>
        </Loader>
        {canPay && (
          <PayNow
            applicationDetails={applicationDetails}
            styleText={{color: colors.mainWhite}}
            style={{
              marginTop: 8 * BW(),
              height: 40 * BW(),
              justifyContent: 'center',
              padding: 0,
              backgroundColor: colors.secondaryColor,
            }}
          />
        )}
      </Page>
    </PageBg>
  );
};
