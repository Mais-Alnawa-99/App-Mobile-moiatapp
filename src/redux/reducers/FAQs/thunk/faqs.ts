import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody, request} from '../../../network/api';
import {isArabic} from '../../../../locales';

export const getFAQs = createAsyncThunk('faqs/getFAQs', async () => {
  let body = buildBody({
    Language: isArabic() ? 'ar' : 'en',
  });
  const response = await request('GET', '/api/ItemService/GetFAQs?' + body);
  return response;
});
