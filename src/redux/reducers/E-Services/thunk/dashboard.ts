import {createAsyncThunk} from '@reduxjs/toolkit';
import {requestApiEservices} from '../../../network/apiEservices';
import {buildBody} from '../../../network/api';

export const getUserApplicationDashboardCounts = createAsyncThunk(
  'dashboard/getUserApplicationDashboardCounts',
  async () => {
    const response = await requestApiEservices(
      'GET',
      '/UserDashboard/GetUserApplicationDashboardCounts',
    );
    return response;
  },
);

export const getApplicationsCounts = createAsyncThunk(
  'dashboard/getApplicationsCounts',
  async (mode: string) => {
    const response = await requestApiEservices(
      'GET',
      '/Application/GetApplicationsCounts/?Mode=' + mode,
    );
    return response;
  },
);

export const getFavoriteAndMostUsedServices = createAsyncThunk(
  'dashboard/getFavoriteAndMostUsedServices',
  async () => {
    const response = await requestApiEservices(
      'GET',
      '/UserDashboard/FavoriteAndMostUsedServices',
    );
    return response;
  },
);
