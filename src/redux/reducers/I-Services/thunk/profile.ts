import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiILservices} from '../../../network/api_ILServices';
import {isArabic} from '../../../../locales';

export const getUserFactories = createAsyncThunk(
  'IL/GetUserFactories',
  async ({UserId}: {UserId: any}) => {
    let body = {
      UserId: UserId,
      language: isArabic() ? '2' : '1',
    };
    const response = await requestApiILservices(
      'POST',
      'GetUserFactories',
      body,
      false,
    );
    return response;
  },
);

export const getUserDashBoard = createAsyncThunk(
  'IL/GetUserDashBoard',
  async ({UserId, LicenseId}: {UserId: string; LicenseId: string}) => {
    let body = {
      UserId: UserId,
      LicenseId: LicenseId,
      language: isArabic() ? '2' : '1',
    };
    const response = await requestApiILservices(
      'POST',
      'GetUserDashBoard',
      body,
      false,
    );
    return response;
  },
);

export const getILUserApplications = createAsyncThunk(
  'IL/getILUserApplications',
  async ({
    userId,
    licenseId,
    pageNumber,
    pageSize,
    fromdate,
    todate,
    SearchKey: SearchKey,
    statusId,
    FormId,
    ApplciationId,
  }: {
    userId: string;
    licenseId: string;
    pageNumber: number;
    pageSize: number;
    fromdate: string;
    todate: string;
    SearchKey: string;
    FormId: string;
    statusId: string;
    ApplciationId: string;
  }) => {
    let body = {
      userId,
      licenseId,
      languageId: isArabic() ? '2' : '1',
      pageIndex: pageNumber,
      pageSize: pageSize,
      fromdate: fromdate,
      todate: todate,
      SearchKey: SearchKey,
      statusId: statusId,
      FormId: FormId ?? null,
      ApplciationId: ApplciationId,
    };
    const response = await requestApiILservices(
      'POST',
      'GetUserApplications',
      body,
      false,
    );
    return response;
  },
);

export const getFactoryDetails = createAsyncThunk(
  'IL/getFactoryDetails',
  async ({UserId, LicenseId}: {UserId?: string; LicenseId: string}) => {
    let body = {
      UserId,
      LicenseId,
      language: isArabic() ? '2' : '1',
    };
    const response = await requestApiILservices(
      'POST',
      'GetFactoryDetails',
      body,
      false,
    );
    return response;
  },
);

export const canApplyForService = createAsyncThunk(
  'ILServices/canApplyForService',
  async ({
    UserId,
    LicenseId,
    FormId,
  }: {
    UserId: string;
    LicenseId?: string;
    FormId: string;
  }) => {
    let body: any = {
      FormId,
      UserId,
      LanguageId: isArabic() ? '2' : '1',
    };
    if (!!LicenseId || LicenseId !== undefined) {
      body = {
        ...body,
        LicenseId: LicenseId,
      };
    }
    const response = await requestApiILservices(
      'POST',
      'CanApplyForService',
      body,
      false,
    );
    return response;
  },
);
