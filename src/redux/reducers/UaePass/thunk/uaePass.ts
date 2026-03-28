import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAccessToken, getUaepassProfile} from '../../../network/uaepassApi';
import {request} from '../../../network/api';

export const getUaePassToken = createAsyncThunk(
  'uaePass/getAccessToken',
  async ({code}: {code: string}) => {
    const response = await getAccessToken(code);
    return response;
  },
);

export const getUaePassUserInfo = createAsyncThunk(
  'uaePass/getUaepassProfile',
  async ({token}: {token: string}) => {
    const response = await getUaepassProfile(token);
    return response;
  },
);

export const postVerfiyDigital = createAsyncThunk(
  'uaePass/verfiyDigital',
  async ({profileBody}: {profileBody: object}) => {
    const response = await request(
      'POST',
      '/engine-rest/digital/verify-app-user',
      profileBody,
    );
    return response;
  },
);
