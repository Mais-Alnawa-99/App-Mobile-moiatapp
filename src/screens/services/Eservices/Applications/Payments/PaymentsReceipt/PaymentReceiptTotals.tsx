import React from 'react';
import {View} from 'react-native';
import Text from '../../../../../../component/Text';

const PaymentTotals = ({details, t, styles}: any) => {
  return (
    <View>
      <Text h4>
        {t('Table.ServicesAmountSubTotal')}{' '}
        {details?.Services?.[0]?.Amount?.toFixed(2)}
      </Text>
      <Text h4>
        {t('Table.EDirhamFeesAmount')} {details?.EDirhamFeesAmount?.toFixed(2)}
      </Text>
      <Text h4>
        {t('Table.TaxAmount')} {details?.TaxAmount?.toFixed(2)}
      </Text>
      <Text h4 bold style={styles.total}>
        {t('Table.TotalAmount')} {details?.TotalAmount?.toFixed(2)}
      </Text>
    </View>
  );
};

export default PaymentTotals;
