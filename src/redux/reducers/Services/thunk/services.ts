import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody, request, RequestsURL} from '../../../network/api';
import {isArabic} from '../../../../locales';

export const searchServices = createAsyncThunk(
  'services/SearchServices',
  async ({
    CategoryId,
    SubCategoryId,
    Keyword,
    TagId,
    Skip,
    Top,
    home,
  }: {
    CategoryId: any;
    SubCategoryId: any;
    Keyword: any;
    TagId: any;
    Skip: any;
    Top: any;
    home: any;
  }) => {
    let body = buildBody({
      Category_Id: CategoryId,
      SubCategory_Id: SubCategoryId,
      Keyword: Keyword,
      Tag_Id: TagId,
      Language: isArabic() ? 'ar' : 'en',
      Skip: Skip,
      Top: Top,
    });
    const response = await request(
      'GET',
      '/api/ItemService/SearchServices?' + body,
    );
    return response;
  },
);

export const getService = createAsyncThunk(
  'services/getService',
  async ({serviceId}: {serviceId: any}) => {
    let body = buildBody({
      Id: serviceId,
      Language: isArabic() ? 'ar' : 'en',
    });
    const response = await request(
      'GET',
      '/api/ItemService/GetServiceById?' + body,
    );
    return response;
  },
);

export const inquereRequestStatus = createAsyncThunk(
  'request/inquereRequestStatus',
  async ({number}: {number: any}) => {
    const response = await request(
      'GET',
      '/api/applications/GetApplicationStatus?ApplicationNumber=' + number,
      {},
      RequestsURL,
    );
    return response;
  },
);

export const logoutSSO = createAsyncThunk('logout/logoutSSO', async () => {
  const response = await request(
    'GET',
    '/eservices/logout',
    {},
    'https://eservices.moiat.gov.ae',
  );
  return response;
});
