import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {
  setLoadingApplication,
  setLoadingModal,
} from '../../../redux/reducers/General/loader';
import DynamicForm from './DynamicForm';
import {getOpportunitiesSchema} from '../../../redux/reducers/opportunity/thunk/opportunityThunk';
import Text from '../../../component/Text';

export default function AddOpportunity() {
  const dispatch = useAppDispatch();

  const fields = useAppSelector((s: any) => s.opportunity?.schemaFields);

  //   useEffect(() => {
  //     (async () => {
  //       dispatch(setLoadingApplication(true));
  //       await dispatch(getOpportunitiesSchema());
  //       dispatch(setLoadingApplication(false));
  //     })();
  //   }, [dispatch]);

  //   const onSubmit = async (values: any) => {
  //     dispatch(setLoadingModal(true));
  //     try {
  //       console.log('submit:', values);
  //     } finally {
  //       dispatch(setLoadingModal(false));
  //     }
  //   };

  //   if (!fields?.length) return <View />;

  return (
    <View style={{padding: 16}}>
      <View>
        <Text>ferrrrreweeeeeer</Text>
      </View>
      {/* <DynamicForm fields={fields} onSubmit={onSubmit} /> */}
    </View>
  );
}
