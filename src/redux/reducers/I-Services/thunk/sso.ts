import {createAsyncThunk} from '@reduxjs/toolkit';
import {isArabic} from '../../../../locales';
import {
  baseApiSevicesUrl,
  requestApiILservices,
  requestApiILSso,
} from '../../../network/api_ILServices';

export const getSsoToken = createAsyncThunk(
  'sso/token',
  async (payload: any) => {
    const response = await requestApiILSso(
      'POST',
      'connect/token',
      false,
      false,
      payload,
      false,
    );
    return response;
  },
);
export const checkComplete = createAsyncThunk(
  'sso/CheckProfileIsComplete',
  async ({payload, header}: any) => {
    let body = {
      ...payload,
      ClientId: 'MOIAT_Mobile',
      LanguageId: isArabic() ? 2 : 1,
    };
    const response = await requestApiILSso(
      'POST',
      'api/MobileAPIs/CheckProfileIsComplete',
      body,
      header,
      false,
      false,
    );
    return response;
  },
);

export const getUserProfile = createAsyncThunk(
  'sso/GetUserProfile',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      '/api/SSO/GetUserProfile',
      payload,
      `${baseApiSevicesUrl}`,
    );
    return response;
  },
);

export const GetCompleteProfile = createAsyncThunk(
  'sso/GetCompleteProfile',
  async ({body, header}: {body: any; header?: any}) => {
    const response = await requestApiILSso(
      'POST',
      'api/MobileAPIs/GetCompleteProfile',
      body,
      header,
    );
    return response;
  },
);

export const saveProfile = createAsyncThunk(
  'sso/saveCompleteProfile',
  async ({body, header}: {body: any; header?: any}) => {
    const response = await requestApiILSso(
      'POST',
      'api/MobileAPIs/SaveCompleteProfile',
      body,
      header,
      false,
      false,
      true,
    );

    return response;
  },
);

export const GetSSOLookupData = createAsyncThunk(
  'sso/GetSSOLookupData',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      '/api/sso/GetSSOLookupData',
      body,
      baseApiSevicesUrl,
    );

    return response;
  },
);
