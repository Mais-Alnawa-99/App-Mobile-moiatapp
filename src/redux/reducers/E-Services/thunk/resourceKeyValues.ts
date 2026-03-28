import {createAsyncThunk} from '@reduxjs/toolkit';
import {requestApiEservices} from '../../../network/apiEservices';

export const getResourceKeyValues = createAsyncThunk(
  'ResourceKeyValues/getResourceKeyValues',
  async () => {
    const response = await requestApiEservices('GET', '/ResourceKeyValues');
    return response;
  },
);
