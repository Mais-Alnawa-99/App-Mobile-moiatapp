import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {isArabic} from '../../../../../../locales';
import Page from '../../../../../../component/Page';
import Header from '../../../../../../component/Header';
import {BW} from '../../../../../../style/theme';
import {useAppDispatch} from '../../../../../../redux/store';
import Loader from '../../../../../../component/Loader';
import {getApplicationPaymentDetails} from '../../../../../../redux/reducers/E-Services/thunk/payments';
import {getLocalizedValue, parseJSON} from '../../../../utils';
import PaymentSummary from './PaymentReceiptSummary';
import ServicesList from './ReceiptServicesList';
import PaymentTotals from './PaymentReceiptTotals';
import PaymentActions from './PaymentReceiptActions';
import Button from '../../../../../../component/Button';
import NavigationService from '../../../../../../navigation/NavigationService';
import {eservicesURL} from '../../../../../../redux/network/apiEservices';
import {getCustomerPulseSurveyToken} from '../../../../../../redux/reducers/E-Services/thunk/customerPulse';
import {_showCustomerPulse} from '../../../../../customerPulse/CustomerPulse';

const PaymentDetails = (props: any) => {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const langId = isArabic() ? 2 : 1;

  const params = props.route?.params;
  const orderNumber = params?.orderNumber;
  // const orderNumber = 'ord796399052407';

  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [paymentDetails, setPaymentDetails]: any = useState('');

  const showCustomerPulse = (result: any) => {
    let detail = parseJSON(result?.transactionDetail);
    if (detail?.ApplicationId) {
      let setting = parseJSON(result?.serviceSettings);
      // if (!!setting?.KhadamatiSequence) {
      dispatch(
        getCustomerPulseSurveyToken({
          ApplicationId: detail?.ApplicationId,
        }),
      ).then(res => {
        if (
          res.meta.requestStatus === 'fulfilled' &&
          !!res.payload?.networkSuccess &&
          res.payload?.result?.token
        ) {
          _showCustomerPulse(res.payload?.result?.token);
        }
      });
      // }
    }
  };

  const _getApplicationPaymentDetails = () => {
    setPaymentDetails('');
    setIsLoading(true);
    dispatch(getApplicationPaymentDetails({OrderNumber: orderNumber})).then(
      res => {
        setIsLoading(false);
        if (
          res.meta.requestStatus === 'fulfilled' &&
          !!res.payload?.networkSuccess
        ) {
          let result = res.payload;
          setPaymentDetails(result);
          // if (result.serviceSettings) {
          if (!params?.withOutCustmerPluse) showCustomerPulse(result);
          // }
        }
      },
    );
  };

  useEffect(() => {
    _getApplicationPaymentDetails();
  }, []);

  const details = parseJSON(paymentDetails?.transactionDetail);
  const receiptData = parseJSON(paymentDetails?.receiptCustomData)?.[0];
  const services = details?.Services;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          styles={{padding: 8 * BW()}}
          onRefresh={_getApplicationPaymentDetails}
          header={
            <Header
              titleContainerStyle={{flex: 4}}
              title={t('Custom_Labels.CustomPaymentPage')}
              hideDrawer
              style={{
                borderBottomColor: colors.gray,
                borderBottomWidth: 0.6 * BW(),
              }}
            />
          }
          withHeader>
          <Loader isLoading={isLoading}>
            {details && (
              <View>
                <PaymentSummary
                  details={details}
                  receiptData={receiptData}
                  langId={langId}
                  getLocalizedValue={getLocalizedValue}
                  t={t}
                  styles={styles}
                />

                {paymentDetails?.certificateExists && (
                  <Button
                    style={styles.certificateButton}
                    medium
                    title={`${t('Labels.CertificateNote')} ${t(
                      'Labels.ClickHere',
                    )}`}
                    styleText={{
                      color: colors.secondaryColor,
                    }}
                    onPress={() =>
                      NavigationService.navigate('WebViewScreen', {
                        url: eservicesURL + '/certificate',
                        hideDrawer: true,
                      })
                    }
                  />
                )}

                <ServicesList
                  services={services}
                  langId={langId}
                  getLocalizedValue={getLocalizedValue}
                  t={t}
                  styles={styles}
                />

                <PaymentTotals details={details} t={t} styles={styles} />

                <PaymentActions
                  details={details}
                  t={t}
                  styles={styles}
                  orderNumber={orderNumber}
                  setIsDownloadLoading={setIsDownloadLoading}
                />
              </View>
            )}
          </Loader>
          <Loader isLoading={isDownloadLoading} modal={isDownloadLoading} />
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
    title: {
      textAlign: 'center',
      marginBottom: 16 * BW(),
      marginTop: 8 * BW(),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8 * BW(),
    },
    success: {
      color: colors.green,
    },
    failed: {
      color: colors.red,
    },
    line: {
      borderBottomWidth: 0.6 * BW(),
      borderColor: colors.gray,
      marginTop: 2 * BW(),
      marginBottom: 8 * BW(),
    },
    total: {
      marginTop: 4 * BW(),
    },
    buttonRow: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: 8 * BW(),
    },
    btn: {
      padding: 8 * BW(),
      borderRadius: 4 * BW(),
      width: '30%',
      height: 'auto',
    },
    redButton: {
      backgroundColor: colors.red,
    },
    grayButton: {
      backgroundColor: colors.darkGray,
    },
    goldButton: {
      backgroundColor: colors.golden,
    },
    buttonText: {
      color: colors.mainWhite,
    },
    certificateButton: {
      backgroundColor: colors.secondaryColor + '11',
      padding: 12 * BW(),
      borderRadius: 6 * BW(),
      marginVertical: 16 * BW(),
      height: 'auto',
      width: 'auto',
    },
    certificateText: {
      textAlign: 'center',
      color: colors.secondaryColor,
    },
  });

export default PaymentDetails;
