import React from 'react';
import FlatListComp from '../../../../component/FlatList';
import PaymentCard from './PaymentCard';

export default function PaymentList(props: any): JSX.Element {
  return (
    <FlatListComp
      scrollview
      data={props?.services || []}
      renderItem={({item, index}: any) => (
        <PaymentCard item={item} key={index} index={index} />
      )}
      onRefresh={props.searchService ? () => props.searchService(0) : null}
      onEndReachedThreshold={0.01}
      noData
    />
  );
}
