import React, {useState, useEffect, Fragment, useCallback} from 'react';
import {View, Alert, StyleSheet, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {isArabic} from '../../../../locales';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {BW} from '../../../../style/theme';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Loader from '../../../../component/Loader';
import {
  getApplication,
  getApplicationActivityLogs,
} from '../../../../redux/reducers/E-Services/thunk/applications';
import DynamicForm from '../DynamicForm/DynamicForm';
import Text from '../../../../component/Text';
import moment from 'moment';
import ProgressCircle from '../../../../component/ProgressCircle';
import ApplicationDetailsData from './ApplicationDetailsData';
import {parseJSON, services} from '../../utils';
import NavigationService from '../../../../navigation/NavigationService';
import {eservicesURL} from '../../../../redux/network/apiEservices';
import {getCustomerPulseSurveyToken} from '../../../../redux/reducers/E-Services/thunk/customerPulse';
import {_showCustomerPulse} from '../../../customerPulse/CustomerPulse';
import {setLoadingModal} from '../../../../redux/reducers/General/loader';
import ActionHistoryModal from './ActionHistoryModal';

const ApplicationDetails = (props: any) => {
  let params = props.route?.params;
  let applicationId = params?.appId;
  let withCustomPluse = params?.withCustomPluse;
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [applicationDetails, setApplicationDetails]: any = useState('');
  const [activityLogs, setActivityLogs]: any = useState('');

  const [showModal, setShowModal] = useState(false);

  const {userData}: any = useAppSelector(store => store.userDataStored);
  const {tokenData}: any = useAppSelector(state => state.userToken);

  const _getApplicationActivityLogs = () => {
    dispatch(
      getApplicationActivityLogs({
        ApplicationId: applicationId,
      }),
    ).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        !!res.payload?.networkSuccess
      ) {
        const parsedResponse = JSON.parse(res.payload?.[0].activityLogs);

        if (parsedResponse?.length > 0) {
          let sategeActionsComments = [];
          parsedResponse?.[0].Stages.map((stage: any) => {
            stage?.Actions?.map((action: any) => {
              if (action?.Comments || action?.ActionAttachment) {
                sategeActionsComments.push(action?.Comments);
              }
            });
          });
          if (sategeActionsComments.length > 0) setShowModal(true);
        }
        setActivityLogs(parsedResponse);
      }
    });
  };
  useEffect(() => {
    _getApplicationActivityLogs();
  }, []);

  const _getApplicationDetails = () => {
    setApplicationDetails('');
    setIsLoading(true);
    dispatch(
      getApplication({
        ApplicationId: applicationId,
      }),
    ).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        !!res.payload?.networkSuccess
      ) {
        setApplicationDetails(res.payload);
        // dispatch(setLoadingModal(true));
        // setTimeout(() => dispatch(setLoadingModal(false)), 2000);

        if (withCustomPluse) showCustomerPulse(res.payload);
      }

      setIsLoading(false);
    });
  };

  useFocusEffect(
    useCallback(() => {
      _getApplicationDetails();
    }, [tokenData, tokenData?.access_token]),
  );

  let langId = isArabic() ? 2 : 1;

  let serviceName = !!applicationDetails
    ? JSON.parse(applicationDetails?.serviceName)?.find(
        (name: any) => name.langId === langId,
      )?.value
    : '';

  const showCustomerPulse = (result: any) => {
    if (applicationId) {
      let setting = parseJSON(result?.serviceSettings);
      if (!!setting?.KhadamatiSequence) {
        dispatch(
          getCustomerPulseSurveyToken({
            ApplicationId: applicationId,
          }),
        ).then(res => {
          if (
            res.meta.requestStatus === 'fulfilled' &&
            !!res.payload?.networkSuccess &&
            res.payload?.result?.token &&
            !res.payload?.result?.isTokenExist
          ) {
            _showCustomerPulse(res.payload?.result?.token);
          }
        });
      }
    }
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          styles={{padding: 8 * BW()}}
          onRefresh={() => _getApplicationDetails()}
          header={
            <Header
              titleContainerStyle={{
                flex: 8,
              }}
              title={serviceName}
              hideDrawer
              style={{
                borderBottomColor: colors.gray,
                borderBottomWidth: 0.6 * BW(),
              }}
            />
          }
          withHeader>
          <Loader isLoading={isLoading}>
            <>
              {!!applicationDetails && !isLoading && (
                <>
                  <ApplicationDetailsData
                    applicationDetails={applicationDetails}
                  />
                  <DynamicForm
                    service={applicationDetails}
                    formData={
                      !!applicationDetails?.forms
                        ? JSON.parse(applicationDetails?.forms)
                        : ''
                    }
                    // tempAppId={tempAppId}
                    applicationId={applicationId}
                    profId={userData?.record?.RecordId || null}
                    path="view"
                  />
                </>
              )}
            </>
          </Loader>
          {!!activityLogs && (
            <ActionHistoryModal
              visible={showModal}
              onClose={() => setShowModal(false)}
              data={{
                ApplicationId: activityLogs?.[0].ApplicationId,
                Stages: activityLogs?.[0].Stages || [],
                tokenData: tokenData,
              }}
            />
          )}
        </Page>
      </ImageBackground>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    pending: {
      color: colors?.red,
    },
    completed: {
      color: colors?.green,
    },
  });

export default ApplicationDetails;
