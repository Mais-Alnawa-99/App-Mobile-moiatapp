import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import Text from '../../../../component/Text';
import {paymentCallback} from '../../../../redux/reducers/I-Services/thunk/payment';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Page from '../../../../component/Page';
import PageBg from '../../../../component/PageBg';
import {BW} from '../../../../style/theme';
import Header from '../../../../component/Header';
import {useTranslation} from 'react-i18next';
import Loader from '../../../../component/Loader';
import Button from '../../../../component/Button';
import {useTheme} from '@react-navigation/native';
import {isArabic} from '../../../../locales';
import {ReadOnlyRow} from '../../../services/IndustrialServices/staticForms/ReusableComponents';
import NavigationService from '../../../../navigation/NavigationService';

const PaymentDetails = ({route}: any) => {
  const {checkoutId, applicationDetails} = route.params;
  const [details, setDetails] = useState<any>();
  const [status, setStatus] = useState(false);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const userid = useAppSelector(store => store.userILData.userId);
  const [isLoading, setIsLoading] = useState(true);
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const _paymentCallback = (checkoutId: any) => {
    setIsLoading(true);
    const payload = {
      userId: userid,
      ApplicationId: applicationDetails?.Id,
      CheckoutId: checkoutId,
    };
    dispatch(paymentCallback(payload)).then(res => {
      if (res.meta.requestStatus == 'fulfilled') {
        setIsLoading(false);

        setStatus(true);
        setDetails(res.payload.Data);
      }
    });
  };
  const moveTo = () => {
    let screen = '';
    let FormId = applicationDetails.FormId?.toString();
    switch (FormId) {
      case '17':
        screen = 'IndustrialLicenseCancellation';
        break;
      // case '15':
      //   screen = 'PricePreference';
      //   break;
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
    NavigationService.navigate(screen, {
      service: {
        serviceId: applicationDetails?.FormId,
        name: applicationDetails?.ApplicationName,
        ReferenceNo: applicationDetails?.ReferenceNo,
        ApplicationId: applicationDetails?.Id,
      },
      applicationId: applicationDetails?.Id,
    });
  };

  useEffect(() => {
    _paymentCallback(checkoutId);
  }, []);
  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="il-payment-det-scope"
        styles={{
          paddingHorizontal: 16 * BW(),
          paddingTop: 8 * BW(),
        }}
        withOutScrollView
        withHeader
        header={<Header title={t('IL.PaymentDetails')} />}>
        <Loader isLoading={isLoading}>
          <>
            {!status && <Text h3>{t('Paymentfailed')}</Text>}

            {status && (
              <View
                style={{
                  backgroundColor: colors.white,
                  padding: 20 * BW(),
                  borderRadius: 24 * BW(),
                }}>
                <View style={styles.applicationStatus}>
                  <Text>
                    {isArabic() ? details?.messageAr : details?.message}
                  </Text>
                </View>
                <ReadOnlyRow
                  label={t('Table.OrderNumber')}
                  value={details?.orderNumber}
                />
                <ReadOnlyRow label={t('Table.URN')} value={details?.urn} />
                <ReadOnlyRow
                  label={t('Table.PaymentDate')}
                  value={moment(details?.PaymentDate).format('MMM DD, YYYY')}
                />
                <View style={styles.infoRow}>
                  <Text h4 style={{color: colors.primaryColor}}>
                    {t('Table.TotalAmount')} :{' '}
                  </Text>
                  <Text h3 bold style={{color: colors.primaryColor}}>
                    {details?.amount || '-'}
                  </Text>
                </View>
              </View>
            )}
          </>
        </Loader>
        <View
          style={{
            flexDirection: 'row',
            gap: 12 * BW(),
            justifyContent: 'center',
          }}>
          <Button
            onPress={() => {
              moveTo();
            }}
            style={styles.requestsBtn}
            h3
            title={t('IL.ViewApplication')}
            styleText={{color: colors.white}}
          />
          {/* <Button
            style={styles.requestsBtn}
            h4
            title={t('DownloadReceipt')}
            styleText={{color: colors.white}}
          />
          <Button
            style={styles.requestsBtn}
            h4
            title={t('PrintReceipt')}
            styleText={{color: colors.white}}
          /> */}
        </View>
      </Page>
    </PageBg>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    requestsBtn: {
      backgroundColor: colors.secondaryColor,
      borderRadius: 32 * BW(),
      paddingVertical: 0 * BW(),
      marginTop: 12 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      width: '35%',
      height: 40 * BW(),
    },
    applicationStatus: {
      backgroundColor: colors?.red + '33',
      paddingHorizontal: 36 * BW(),
      padding: 4 * BW(),
      borderRadius: 24 * BW(),
      alignSelf: 'flex-start',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8 * BW(),
    },
  });

export default PaymentDetails;
