import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody, request} from '../../../network/api';
import {isArabic} from '../../../../locales';
import {
  baseApiSevicesUrl,
  requestApiILservices,
} from '../../../network/api_ILServices';

export const getContactUs = createAsyncThunk('help/ContactUs', async () => {
  let body = buildBody({
    Language: isArabic() ? 'ar' : 'en',
  });
  const response = await request(
    'GET',
    '/api/ItemService/GetContactUs_AddressMap?' + body,
  );
  return response;
});

export const requestMessageUs = createAsyncThunk(
  'help/MessageUsRequest',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'ContactUs',
      payload,
      `${baseApiSevicesUrl}/api/Website/`,
    );
    return response;
  },
);

export const contactMinister = createAsyncThunk(
  'help/contactMinister',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'ContactMinister',
      payload,
      `${baseApiSevicesUrl}/api/Website/`,
    );
    return response;
  },
);
