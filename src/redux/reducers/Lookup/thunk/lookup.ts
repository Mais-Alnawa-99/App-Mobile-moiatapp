import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody, request} from '../../../network/api';
import {isArabic} from '../../../../locales';

export const getLookupsDefinition = createAsyncThunk(
  'lookup/GetLookupsDefinition',
  async () => {
    const response = await request(
      'GET',
      '/api/ItemService/GetLookupsDefinition',
    );
    return response;
  },
);

export const getLookupValues = createAsyncThunk(
  'lookup/GetLookupValues',
  async (LookupId: any) => {
    let body = buildBody({
      LookupId: LookupId,
      Language: isArabic() ? 'ar' : 'en',
    });
    const response = await request(
      'GET',
      '/api/ItemService/GetLookupValues?' + body,
    );
    return response;
  },
);
