import React from 'react';
import {View} from 'react-native';
import moment from 'moment';
import Text from '../../../../../../component/Text';

const PaymentSummary = ({
  details,
  receiptData,
  langId,
  getLocalizedValue,
  t,
  styles,
}: any) => {
  return (
    <>
      <Text h3 bold style={styles.title}>
        {getLocalizedValue(JSON.parse(details?.ServiceName), langId)}
      </Text>

      <View style={styles.row}>
        <Text h4 bold>
          {t('Custom_Labels.OrganizationName')}
        </Text>
        <Text h4>{receiptData?.value}</Text>
      </View>

      <View style={styles.row}>
        <Text h4 bold>
          {t('Table.ApplicationNumber')}
        </Text>
        <Text h4>{details?.ApplicationNumber}</Text>
      </View>

      <View style={styles.row}>
        <Text h4 bold>
          {t('Table.OrderNumber')}
        </Text>
        <Text h4>{details?.OrderNumber}</Text>
      </View>

      <View style={styles.row}>
        <Text h4 bold>
          {t('Table.URN')}
        </Text>
        <Text h4>{details?.URN}</Text>
      </View>

      <View style={styles.row}>
        <Text h4 bold>
          {t('Table.PaymentDate')}
        </Text>
        <Text h4>
          {moment(details?.PaymentDate).format('MMM DD,YYYY hh:mm A')}
        </Text>
      </View>

      <View style={styles.row}>
        <Text h4 bold>
          {t('Table.Status')}
        </Text>
        <Text
          h4
          bold
          style={
            details?.PaymentStatus === 'Paid' ? styles.success : styles.failed
          }>
          {details?.PaymentStatus === 'Paid'
            ? t('Labels.PaymentStatusPaid')
            : t('Labels.PaymentStatusFailed')}
        </Text>
      </View>
    </>
  );
};

export default PaymentSummary;
