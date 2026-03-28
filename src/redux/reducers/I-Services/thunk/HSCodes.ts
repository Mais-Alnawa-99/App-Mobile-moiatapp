import {createAsyncThunk} from '@reduxjs/toolkit';
import {requestApiILservices} from '../../../network/api_ILServices';
import {isArabic} from '../../../../locales';

export const GetHSCodes = createAsyncThunk(
  'IndustrialApplication/GetHSCodes',
  async ({
    language,
    pageNumber,
    searchText,
    pageSize,
    licenseId,
  }: {
    language: any;
    pageNumber: number;
    pageSize: number;
    searchText?: string;
    licenseId?: string;
  }) => {
    let body = {
      pageNumber,
      language,
      searchText,
      pageSize,
      licenseId,
    };
    const response = await requestApiILservices(
      'POST',
      'GetHSCodes',
      body,
      false,
    );
    return response;
  },
);
export const GetHsCodeFactoriesAndDetails = createAsyncThunk(
  'IndustrialApplication/GetHsCodeFactoriesAndDetails',
  async ({licenseId, HscodeId}: {licenseId: any; HscodeId: any}) => {
    let body = {
      Language: isArabic() ? 2 : 1,
      licenseId,
      HscodeId,
    };
    const response = await requestApiILservices(
      'POST',
      'GetHsCodeFactoriesAndDetails',
      body,
      false,
    );
    return response;
  },
);
