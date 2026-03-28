import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {
  requestApiEservices,
  serviceCustomApiGateway,
} from '../../../network/apiEservices';

export const getProductList = createAsyncThunk(
  'ReportProduct/GetProductList',
  async ({
    PageNumber,
    PageSize,
    ProductName,
    ProductType,
    Brand,
    ModelNumber,
    From,
    To,
  }: {
    PageNumber: any;
    PageSize: any;
    ProductName: any;
    ProductType: any;
    Brand: any;
    ModelNumber: any;
    From: any;
    To: any;
  }) => {
    let body = buildBody({
      PageNumber,
      PageSize,
      ProductName,
      ProductType,
      Brand,
      ModelNumber,
      From,
      To,
    });
    const response = await requestApiEservices(
      'GET',
      '/ReportProduct/GetProductList/?' + body,
      false,
      serviceCustomApiGateway,
    );
    return response;
  },
);

export const getProductDetail = createAsyncThunk(
  'ReportProduct/getProductDetail',
  async ({ProductId}: {ProductId: any}) => {
    let body = buildBody({
      ProductId,
    });
    const response = await requestApiEservices(
      'GET',
      '/ReportProduct/GetProductDetail?' + body,
      false,
      serviceCustomApiGateway,
    );
    return response;
  },
);

export const getProductTypes = createAsyncThunk(
  'ReportProduct/getProductTypes',
  async () => {
    const response = await requestApiEservices(
      'GET',
      '/ReportProduct/getProductTypes',
      false,
      serviceCustomApiGateway,
    );
    return response;
  },
);

export const getProductBrandNameModelNumber = createAsyncThunk(
  'ReportProduct/getProductBrandNameModelNumber',
  async ({ProductTypeId, BrandName}: {ProductTypeId: any; BrandName: any}) => {
    let body = buildBody({
      ProductTypeId,
      BrandName,
    });
    const response = await requestApiEservices(
      'GET',
      '/ReportProduct/getProductBrandNameModelNumber?' + body,
      false,
      serviceCustomApiGateway,
    );
    return response;
  },
);
