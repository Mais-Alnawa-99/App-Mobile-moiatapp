import React from 'react';
import {View} from 'react-native';
import Button from '../../../../../../component/Button';
import NavigationService from '../../../../../../navigation/NavigationService';
import {useAppDispatch} from '../../../../../../redux/store';
import {previewCertificate} from '../../../../../../redux/reducers/E-Services/thunk/certificates';
import {_downloadFile64} from '../../../../../../component/SaveFiles';

const PaymentActions = ({
  details,
  t,
  styles,
  orderNumber,
  setIsDownloadLoading,
}: any) => {
  const dispatch = useAppDispatch();
  let extraFilter = {OrderNumber: orderNumber};
  let requestParams = {
    ApplicationNumber: details.ApplicationNumber,
    CertificateId: 52,
    ExtraFilters: JSON.stringify(extraFilter),
  };
  const _previewCertificate = (share = false) => {
    setIsDownloadLoading(true);
    dispatch(previewCertificate(requestParams)).then(res => {
      setIsDownloadLoading(false);
      if (!!res?.payload?.certificatePreview) {
        _downloadFile64(
          'payment-receipt-' + details.ApplicationNumber,
          'pdf',
          res?.payload?.certificatePreview,
          share,
        );
      }
    });
  };

  return (
    <View style={styles.buttonRow}>
      <Button
        style={{...styles.btn, ...styles.redButton}}
        medium
        title={t('Button.ViewApplication')}
        styleText={styles.buttonText}
        onPress={() => {
          NavigationService.navigate('ApplicationDetails', {
            appId: details?.ApplicationId,
          });
        }}
      />
      <Button
        style={{...styles.btn, ...styles.goldButton}}
        medium
        title={t('Button.DownloadReceipt')}
        styleText={styles.buttonText}
        onPress={() => _previewCertificate()}
      />
      <Button
        style={{...styles.btn, ...styles.grayButton}}
        medium
        title={t('Button.PrintReceipt')}
        styleText={styles.buttonText}
        onPress={() => _previewCertificate(true)}
      />
    </View>
  );
};

export default PaymentActions;
