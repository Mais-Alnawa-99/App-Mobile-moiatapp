import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  requestApiEservices,
  serviceCustomApiGateway,
} from '../../../network/apiEservices';
import {buildBody} from '../../../network/api';

export const getCustomerPulseSurveyToken = createAsyncThunk(
  'CustomerPulse/getSurveyToken',
  async ({ApplicationId}: {ApplicationId: any}) => {
    let body = buildBody({
      ApplicationId: ApplicationId,
      Channel: 'mobile',
    });
    const response = await requestApiEservices(
      'GET',
      '/CustomerPulse/SurveyToken?' + body,
      false,
      serviceCustomApiGateway,
    );
    return response;
  },
);
