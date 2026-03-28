import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiEservices} from '../../../network/apiEservices';

export const getServiceProfileData = createAsyncThunk(
  'Service/GetServiceProfileData',
  async ({
    serviceId,
    profileRecordId,
  }: {
    serviceId: any;
    profileRecordId: any;
  }) => {
    let body = buildBody({
      serviceId: serviceId,
      ProfileRecordId: profileRecordId,
    });
    const response = await requestApiEservices(
      'GET',
      '/Services/GetServiceProfileData/?' + body,
    );
    return response;
  },
);
