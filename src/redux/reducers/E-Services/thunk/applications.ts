import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiEservices} from '../../../network/apiEservices';

export const getApplication = createAsyncThunk(
  'Application/getApplication',
  async ({ApplicationId}: {ApplicationId: any}) => {
    let body = buildBody({
      ApplicationId: ApplicationId,
    });
    const response = await requestApiEservices('GET', '/Application/?' + body);
    return response;
  },
);

export const newApplicationExecuteAction = createAsyncThunk(
  'Application/NewApplicationExecuteAction',
  async (data: any) => {
    const response = await requestApiEservices(
      'POST',
      '/Application/NewApplicationExecuteAction',
      data,
    );
    return response;
  },
);

export const executeAction = createAsyncThunk(
  'Application/ExecuteAction',
  async (data: any) => {
    const response = await requestApiEservices(
      'POST',
      '/Application/ExecuteAction',
      data,
    );
    return response;
  },
);

export const getUserApplicationCategories = createAsyncThunk(
  'Application/getUserApplicationCategories',
  async (data: any) => {
    let body = buildBody(data);
    const response = await requestApiEservices(
      'GET',
      '/Application/UserApplicationCategories/?' + body,
    );
    return response;
  },
);

export const getUserApplicationsList = createAsyncThunk(
  'Application/getUserApplicationsList',
  async (data: any) => {
    let body = buildBody(data);
    const response = await requestApiEservices(
      'GET',
      '/Application/UserApplicationsList/?' + body,
    );
    return response;
  },
);

export const getUserApplicationAssignedToCategories = createAsyncThunk(
  'Application/UserApplicationAssignedToCategories',
  async (data: any) => {
    let body = buildBody(data);
    const response = await requestApiEservices(
      'GET',
      '/Application/UserApplicationAssignedToCategories/?' + body,
    );
    return response;
  },
);

export const GetServiceFieldsByServiceId = createAsyncThunk(
  'Service/GetServiceFieldsByServiceId',
  async ({serviceId}: {serviceId: any}) => {
    let body = buildBody({serviceId: serviceId});
    const response = await requestApiEservices(
      'GET',
      '/Service/GetServiceFieldsByServiceId/?' + body,
    );
    return response;
  },
);

export const getApplicationActivityLogs = createAsyncThunk(
  'Application/getApplicationActivityLogs',
  async ({ApplicationId}: {ApplicationId: any}) => {
    let body = buildBody({
      ApplicationId: ApplicationId,
    });
    const response = await requestApiEservices(
      'GET',
      '/Application/GetApplicationActivityLogs/?' + body,
    );
    return response;
  },
);
