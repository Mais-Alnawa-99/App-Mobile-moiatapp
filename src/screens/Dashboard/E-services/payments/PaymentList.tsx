import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BW} from '../../../../style/theme';
import FlatListComp from '../../../../component/FlatList';
import PaymentCard from './PaymentCard';

export default function CertificatesList(props: any): JSX.Element {
  return (
    <FlatListComp
      scrollview
      data={props?.services}
      renderItem={({item, index}: any) => (
        <PaymentCard
          item={item}
          key={index}
          index={index}
          setTotalCount={props.setTotalCount}
        />
      )}
      onRefresh={props.searchService ? () => props.searchService(0) : null}
      onEndReachedThreshold={0.01}
      noData
    />
  );
}
