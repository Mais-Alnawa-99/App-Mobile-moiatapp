import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody, request} from '../../../network/api';
import {isArabic} from '../../../../locales';

export const searchMedia = createAsyncThunk(
  'lookup/SearchMedia',
  async ({
    CategoryId,
    MediaTypeId,
    Keyword,
    TagId,
    Skip,
    Top,
    home,
  }: {
    CategoryId: any;
    MediaTypeId: any;
    Keyword: any;
    TagId: any;
    Skip: any;
    Top: any;
    home: any;
  }) => {
    let body = buildBody({
      Category_Id: CategoryId,
      MediaType_Id: MediaTypeId,
      Keyword: Keyword,
      Tag_Id: TagId,
      Language: isArabic() ? 'ar' : 'en',
      Skip: Skip,
      Top: Top,
    });
    const response = await request(
      'GET',
      '/api/ItemService/SearchMedia?' + body,
    );
    return response;
  },
);
