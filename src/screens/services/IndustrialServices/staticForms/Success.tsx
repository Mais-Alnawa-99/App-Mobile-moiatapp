/* eslint-disable react/react-in-jsx-scope */
import {Image, Platform, View} from 'react-native';
import Text from '../../../../component/Text';
import {useRoute, useTheme} from '@react-navigation/native';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {BW} from '../../../../style/theme';
import PageBg from '../../../../component/PageBg';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import FastImage from 'react-native-fast-image';
import Button from '../../../../component/Button';
import {setLoadingApplication} from '../../../../redux/reducers/General/loader';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import NavigationService from '../../../../navigation/NavigationService';
import {
  createSurveyToken,
  createUpdateTransaction,
  getRequestDetails,
} from '../../../../redux/reducers/I-Services/thunk/ILFormService';
import {_openModal} from '../../Eservices/ServiceForm';

import PayNow from '../PayNow';
import {decodeJWT} from '../../../../component/Generalfunction';
import {_showCustomerPulse} from '../../../customerPulse/CustomerPulse';

export const Success = () => {
  const params: any = useRoute().params;

  // let params = {
  //   Id: '6070885e-2eb2-4092-99fb-a7c0887da3dc',
  //   No: 'IPL00000166',
  //   message: 'test',
  //   service: {
  //     id: '11',
  //     serviceId: '11',
  //     name: 'test survey token',
  //   },
  // };
  const {colors}: any = useTheme();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userILData.userId);
  const [canPay, setCanPay] = useState(false);
  const {tokenData}: any = useAppSelector(state => state.userToken);

  const moveTo = () => {
    dispatch(setLoadingApplication(true));
    let screen = '';
    let FormId =
      params?.service?.serviceId?.toString() || params?.service?.id?.toString();
    switch (FormId) {
      case '17':
        screen = 'IndustrialLicenseCancellation';
        break;

      case '11':
        screen = 'CustomsExemptionRegistration';
        break;
      case '12':
        screen = 'MaterialQuantityIncrease';
        break;
      case '13':
        screen = 'DutyExemption';
        break;
      case '25':
        screen = 'DutyExemptionFastTrack';
        break;
      case '19':
        screen = 'RenewalIndustrialProductionLicense';
        break;
      case '10':
        screen = 'IssueIndustrialProductionLicense';
        break;
      case '14':
        screen = 'ValueAddedTaxRequest';
        break;
      case '21':
        screen = 'IssueIndustrialProductionLicense';
        break;
    }
    NavigationService.replace(screen, {
      service: {
        ...params.service,
        ReferenceNo: params?.No,
        canPay: canPay,
        ApplicationId: params?.Id,
      },
      applicationId: params?.Id,
    });
  };

  const applicationDetails = {
    Id: params?.Id,
    FormId: params?.service?.serviceId,
    ApplicationName: params?.service?.name,
  };
  const _getRequestDetails = () => {
    dispatch(
      getRequestDetails({
        ApplicationId: params?.Id, //'AD1A9DA7-08AD-44A6-841A-67EEE43E16BC', //
        UserId: userId, //'4DEF6CD6-5ABF-4232-BB3A-C886617858EA', //
      }),
    ).then(res => {
      if (res?.payload?.Data?.success) {
        _createUpdateTransaction(res?.payload?.Data?.AppData);

        const cPay = res?.payload?.Data?.Application?.ShouldShowPaymentButton;
        setCanPay(cPay);
      }
    });
  };
  useEffect(() => {
    _getRequestDetails();
  }, []);

  const _getKhadamatiCode = () => {
    let KhadamatiCode;
    let FormId =
      params?.service?.id?.toString() || params?.service?.serviceId?.toString();
    switch (FormId) {
      case '17':
        KhadamatiCode = '114-10-002-004';
        break;
      case '11':
        KhadamatiCode = '114-10-003-004';
        break;
      case '12':
        KhadamatiCode = '114-10-003-003';
        break;
      case '13':
        KhadamatiCode = '114-10-003-000';
        break;
      case '25':
        KhadamatiCode = '114-10-003-000';
        break;
      case '19':
        KhadamatiCode = '114-10-002-001';
        break;
      case '10':
        KhadamatiCode = '114-10-002-000';
        break;
      case '14':
        KhadamatiCode = '114-10-004-000';
        break;
      case '21':
        KhadamatiCode = '114-10-002-002';
        break;
    }
    return KhadamatiCode;
  };
  const _createSurveyToken = (reuestData: any) => {
    const userData = decodeJWT(tokenData?.access_token);
    const code = _getKhadamatiCode();

    dispatch(
      createSurveyToken({
        KhadamatiCode: code,
        CustomerUserId: userId,
        CustomerEmiratesId: userData?.EmiratesIdNumber,
        CustomerName: userData?.FullName,
        CustomerEmail: userData?.Email,
        CustomerMobile: userData?.PhoneNumber,
        CustomerGender: !userData?.GenderId
          ? 'male'
          : !!userData?.GenderId && String(userData?.GenderId) === '2049'
          ? 'male'
          : 'female',
        CustomerNationality: userData?.payload,
        ApplicationNumber: params?.No,
        ApplicationCreatedOn: reuestData?.DateCreated,
        FeesAED: reuestData?.TotalFees,
        Channel: 'mobile',
      }),
    ).then(res => {
      if (
        res.payload.networkSuccess &&
        res.payload?.result?.token &&
        !res.payload?.result?.isTokenExist
      ) {
        _showCustomerPulse(res.payload?.result?.token);
      }
    });
  };
  const _createUpdateTransaction = (reuestData: any) => {
    const userData = decodeJWT(tokenData?.access_token);
    const code = _getKhadamatiCode();

    if (!!code && reuestData?.IsDraft === 0) {
      dispatch(
        createUpdateTransaction({
          KhadamatiCode: code,
          CustomerUserId: userId,
          CustomerEmiratesId: userData?.EmiratesIdNumber,
          CustomerName: userData?.FullName,
          CustomerEmail: userData?.Email,
          CustomerMobile: userData?.PhoneNumber,
          CustomerGender:
            !!userData?.GenderId && String(userData?.GenderId) === '2049'
              ? 'male'
              : 'female',
          ApplicationCreatedOn: reuestData?.DateCreated,
          ApplicationUpdatedOn: reuestData?.DateCreated,
          ApplicationNumber: params?.No,
          FeesAED: reuestData?.TotalFees,
          ApplicationActionRole: 1,
          ApplicationActionName: 'submit',
        }),
      ).then(res => {
        if (res.payload.networkSuccess) {
          _createSurveyToken(reuestData);
        }
      });
    }
  };
  return (
    <PageBg>
      <Page
        withStatusBar
        // hideBottomTab
        withHeader
        onRefresh={_getRequestDetails}
        styles={{padding: 8 * BW()}}
        header={
          <Header
            title={params?.service?.name}
            hideDrawer
            titleContainerStyle={{flex: 8}}
          />
        }>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: colors.border,
            borderRadius: 8 * BW(),
            borderWidth: 1,
          }}>
          {Platform.OS == 'ios' ? (
            <Image
              resizeMode="contain"
              style={{width: 150 * BW(), height: 150 * BW()}}
              source={require('../../../../assets/check.gif')}
            />
          ) : (
            <FastImage
              style={{width: 150 * BW(), height: 150 * BW()}}
              source={require('../../../../assets/check.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
          <Text h2 style={{color: colors.green}}>
            {params?.message}
          </Text>
          <Text h3>{t('appNumber')}</Text>
          <Text h2 medium style={{color: colors.secondaryColor}}>
            {params?.No}
          </Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8 * BW(),
              marginVertical: 14 * BW(),
              flexDirection: 'row',
            }}>
            <Button
              title={t('IL.ViewApplication')}
              onPress={() => {
                moveTo();
              }}
              style={{
                backgroundColor: colors.secondaryColor,
                height: 40 * BW(),
                padding: 0,
                width: '40%',
                justifyContent: 'center',
                // borderRadius: 15 * BW(),
              }}
              h4
              medium
              styleText={{color: colors.mainWhite}}
            />
            {canPay && (
              <PayNow
                applicationDetails={applicationDetails}
                style={{
                  borderColor: colors.secondaryColor,
                  width: '30%',
                  borderWidth: 1,
                  height: 40 * BW(),
                  justifyContent: 'center',
                }}
              />
            )}
          </View>
        </View>
      </Page>
    </PageBg>
  );
};
