import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {
  requestApiEservices,
  serviceCustomApiGateway,
} from '../../../network/apiEservices';

export const getStandardAndVersionsList = createAsyncThunk(
  'Standard/GetStandardAndVersionsList',
  async ({
    PageNumber,
    PageSize,
    StandardType,
    StandardICS,
    StandardNumber,
    StandardName,
    StandardYear,
  }: {
    PageNumber: any;
    PageSize: any;
    StandardType: any;
    StandardICS: any;
    StandardNumber: any;
    StandardName: any;
    StandardYear: any;
  }) => {
    let body = buildBody({
      PageNumber,
      PageSize,
      StandardType,
      StandardICS,
      StandardNumber,
      StandardName,
      StandardYear,
    });
    const response = await requestApiEservices(
      'GET',
      '/Standard/GetStandardAndVersionsList?' + body,
      false,
      serviceCustomApiGateway,
    );
    return response;
  },
);

export const getStandardTypeList = createAsyncThunk(
  'Standard/GetStandardTypeList',
  async () => {
    const response = await requestApiEservices(
      'GET',
      '/Standard/GetStandardTypeList',
      false,
      serviceCustomApiGateway,
    );
    return response;
  },
);

// export const getProductDetail = createAsyncThunk(
//   'ReportProduct/getStandardTypeList',
//   async ({ProductId}: {ProductId: any}) => {
//     let body = buildBody({
//       ProductId,
//     });
//     const response = await requestApiEservices(
//       'GET',
//       '/ReportProduct/GetProductDetail?' + body,
//       false,
//       serviceCustomApiGateway,
//     );
//     return response;
//   },
// );

// export const getProductBrandNameModelNumber = createAsyncThunk(
//   'ReportProduct/getProductBrandNameModelNumber',
//   async ({ProductTypeId, BrandName}: {ProductTypeId: any; BrandName: any}) => {
//     let body = buildBody({
//       ProductTypeId,
//       BrandName,
//     });
//     const response = await requestApiEservices(
//       'GET',
//       '/ReportProduct/getProductBrandNameModelNumber?' + body,
//       false,
//       serviceCustomApiGateway,
//     );
//     return response;
//   },
// );
