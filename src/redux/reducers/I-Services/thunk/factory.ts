import {createAsyncThunk} from '@reduxjs/toolkit';
import {isArabic} from '../../../../locales';
import {requestApiILservices} from '../../../network/api_ILServices';

export const submitFactoryUser = createAsyncThunk(
  'factory/SubmitFactoryUsers',
  async ({
    licenseId,
    userId,
    email,
    userName,
    identificationDocumentNumber,
    formsList,
  }: {
    licenseId: any;
    userId: any;
    email: any;
    userName: any;
    identificationDocumentNumber: any;
    formsList: any;
  }) => {
    let body = {
      licenseId,
      userId,
      email,
      userName,
      identificationDocumentNumber,
      formsList,
      identificationDocumentType: '3512',
      languageid: isArabic() ? 2 : 1,
    };

    const response = await requestApiILservices(
      'POST',
      'SubmitUserFactory',
      body,
      false,
    );

    return response;
  },
);

export const getFactoryUsers = createAsyncThunk(
  'factory/GetFactoryUsers',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      'GetFactoryUsers',
      body,
      false,
    );

    return response;
  },
);

export const updateFactoryUser = createAsyncThunk(
  'factory/updateFactoryUser',
  async ({userId}: {userId: any}) => {
    let body = {
      userId,
      language: isArabic() ? 'ar' : 'en',
    };
    const respone = await requestApiILservices(
      'POST',
      'UpdateUserFactory',
      body,
      false,
    );

    return respone;
  },
);

export const deleteFactoryUser = createAsyncThunk(
  'factory/deleteFactoryUser',
  async ({userId}: {userId: any}) => {
    let body = {
      userId,
    };
    const respone = await requestApiILservices(
      'POST',
      'DeleteUserFactory',
      body,
      false,
    );
    return respone;
  },
);

export const getFormsList = createAsyncThunk(
  'factory/getFormsList',
  async () => {
    let body = {
      language: isArabic() ? 2 : 1,
    };
    const respone = await requestApiILservices(
      'POST',
      'GetFormsList',
      body,
      false,
    );
    return respone;
  },
);

export const setUserFavoriteService = createAsyncThunk(
  'User/setUserFavoriteService',
  async (body: any) => {
    const respone = await requestApiILservices(
      'POST',
      'SetUserFavoriteService',
      body,
      false,
    );
    return respone;
  },
);
