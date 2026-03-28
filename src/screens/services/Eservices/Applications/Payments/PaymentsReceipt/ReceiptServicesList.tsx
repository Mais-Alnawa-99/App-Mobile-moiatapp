import React from 'react';
import {View} from 'react-native';
import Text from '../../../../../../component/Text';
import {BW} from '../../../../../../style/theme';

const ServicesList = ({
  services,
  langId,
  getLocalizedValue,
  t,
  styles,
}: any) => {
  if (!services?.length) return null;

  return (
    <>
      <Text h3 bold>
        {t('Table.Services')}
      </Text>

      {services?.map((service: any, index: number) => (
        <>
          <View key={index} style={{marginBottom: 8 * BW()}}>
            <Text h4 medium>
              {getLocalizedValue(
                JSON.parse(service?.ServiceCodeDescription),
                langId,
              )}
            </Text>
            <Text h4>
              {t('Table.serviceCodeQuantity')} {service?.Quantity}
            </Text>
            <Text h4>
              {t('Table.Amount')} {service?.Amount?.toFixed(2)}
            </Text>
          </View>
          <View style={styles.line} />
        </>
      ))}
    </>
  );
};

export default ServicesList;
