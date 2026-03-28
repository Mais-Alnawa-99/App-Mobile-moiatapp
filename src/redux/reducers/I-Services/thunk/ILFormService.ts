import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {
  baseApiSevicesUrl,
  requestApiILservices,
} from '../../../network/api_ILServices';
import {isArabic} from '../../../../locales';

export const GetLookupData = createAsyncThunk(
  'IndustrialApplication/GetLookupData',
  async ({language, Category}: {language: any; Category: string}) => {
    let body = {
      Category,
      language,
    };
    const response = await requestApiILservices(
      'POST',
      'GetLookupData',
      body,
      false,
    );
    return response;
  },
);
export const CascadedLookups = createAsyncThunk(
  'IndustrialApplication/CascadedLookups',
  async ({language, Category}: {language: any; Category: string}) => {
    let body = {
      Category,
      language,
    };
    const response = await requestApiILservices(
      'POST',
      'CascadedLookups',
      body,
      false,
    );
    return response;
  },
);

export const getLicenseDetails = createAsyncThunk(
  'moec/GetLicenseDetails',
  async ({
    licenseERN,
    licenseID,
    entityID,
  }: {
    licenseERN: any;
    licenseID: any;
    entityID: any;
  }) => {
    let body = {
      licenseERN,
      licenseID,
      entityID,
      ownerConsent: 'true',
    };
    const response = await requestApiILservices(
      'POST',
      'GetLicenseDetails/',
      body,
      false,
      true,
    );
    return response;
  },
);

export const GetGenderList = createAsyncThunk(
  'IndustrialApplication/GetGenderList',
  async ({language}: {language: any}) => {
    let body = {
      language,
    };
    const response = await requestApiILservices(
      'POST',
      'GetGenderList',
      body,
      false,
    );
    return response;
  },
);

export const getMainActivity = createAsyncThunk(
  'IndustrialApplication/GetMainActivities',
  async () => {
    let body = {
      language: isArabic() ? 2 : 1,
    };
    const response = await requestApiILservices(
      'POST',
      'GetMainActivities',
      body,
      false,
      false,
    );
    return response;
  },
);

export const getSubActivity = createAsyncThunk(
  'IndustrialApplication/GetSubActivities',
  async ({mainActivity, subLevel}: {mainActivity: any; subLevel: any}) => {
    let body = {
      MainActivityId: mainActivity,
      language: isArabic() ? 2 : 1,
      SubLevel: subLevel,
    };
    const response = await requestApiILservices(
      'POST',
      'GetSubActivities',
      body,
      false,
      false,
    );
    return response;
  },
);

export const GetMainBySub = createAsyncThunk(
  'IndustrialApplication/GetMainByISIC4Code',
  async ({subActivity}: {subActivity: any}) => {
    let body = {
      ISIC4Code: subActivity,
      language: isArabic() ? 2 : 1,
    };
    const response = await requestApiILservices(
      'POST',
      'GetMainByISIC4Code',
      body,
      false,
      false,
    );
    return response;
  },
);

export const SubmitIndustrialLicense = createAsyncThunk(
  'IndustrialApplication/SubmitIndustrialLicenseRegistration',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      'SubmitIndustrialLicenseRegistration',
      body,
      false,
    );
    return response;
  },
);

export const getLicenseData = createAsyncThunk(
  'IndustrialApplication/GetlLicenseData',
  async ({licenseId}: {licenseId: any}) => {
    let body = {licenseId, LanguageId: isArabic() ? 2 : 1};
    const response = await requestApiILservices(
      'POST',
      'GetLicenseDetail',
      body,
      false,
    );
    return response;
  },
);

export const SubmitInitialLicenseModification = createAsyncThunk(
  'IndustrialApplication/SubmitInitialLicenseModification',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      'SubmitInitialLicenseModification',
      body,
      false,
    );
    return response;
  },
);

export const SubmitIndustrialLicenseRenewal = createAsyncThunk(
  'IndustrialApplication/SubmitIndustrialLicenseRenewal',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      'SubmitIndustrialLicenseRenewal',
      body,
      false,
    );
    return response;
  },
);

export const SubmitIndustrialLicenseCancellation = createAsyncThunk(
  'IndustrialApplication/SubmitIndustrialLicenseCancellation',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      'SubmitIndustrialLicenseCancellation',
      body,
      false,
    );
    return response;
  },
);

export const getFactoryProducts = createAsyncThunk(
  'factory/getFactoryProducts',
  async ({licenseId}: {licenseId: any}) => {
    let body = {licenseId, Language: isArabic() ? 2 : 1};
    const respone = await requestApiILservices(
      'POST',
      'GetFactoryProducts',
      body,
      false,
    );
    return respone;
  },
);

export const submitNewRawMaterial = createAsyncThunk(
  'factory/submitNewRawMaterial',
  async ({body}: {body: any}) => {
    const respone = await requestApiILservices(
      'POST',
      'SubmitNewRawMaterial',
      body,
      false,
    );
    return respone;
  },
);

export const submitDutyExemption = createAsyncThunk(
  'factory/submitDutyExemption',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      'SubmitDutyExemption',
      body,
      false,
    );

    return response;
  },
);

export const submitDutyExemptionFastTrack = createAsyncThunk(
  'factory/submitDutyExemptionFastTrack',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      'SubmitDutyExemptionFastTrack',
      body,
      false,
    );

    return response;
  },
);

export const submitValueAdded = createAsyncThunk(
  'factory/submitValueAdded',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      'SubmitValueAdded',
      body,
      false,
    );

    return response;
  },
);
export const submitMaterialQuantityIncrease = createAsyncThunk(
  'factory/submitMaterialQuantityIncrease',
  async ({body}: {body: any}) => {
    const response = await requestApiILservices(
      'POST',
      'SubmitMaterialQuantityIncrease',
      body,
      false,
    );
    return response;
  },
);

export const getApplicationWorkflowSteps = createAsyncThunk(
  'IndustrialApplication/GetApplicationWorkflowSteps',
  async ({FormId, ApplicationId}: {FormId: any; ApplicationId: any}) => {
    let body = {FormId, ApplicationId, LanguageId: isArabic() ? 2 : 1};
    const response = await requestApiILservices(
      'POST',
      'GetApplicationWorkflowSteps',
      body,
      false,
    );
    return response;
  },
);

export const getRequestDetails = createAsyncThunk(
  'ILServices/GetApplication',
  async ({UserId, ApplicationId}: {UserId: string; ApplicationId?: string}) => {
    let body: any = {
      ApplicationId,
      UserId,
      LanguageId: isArabic() ? '2' : '1',
    };

    const response = await requestApiILservices(
      'POST',
      'GetApplication',
      body,
      false,
    );
    return response;
  },
);

export const createSurveyToken = createAsyncThunk(
  'ILServices/CreateSurveyToken',
  async (body: any) => {
    const response = await requestApiILservices(
      'POST',
      '/api/CustomerPulse/CreateSurveyToken',
      body,
      baseApiSevicesUrl,
    );
    return response;
  },
);

export const createUpdateTransaction = createAsyncThunk(
  'ILServices/CreateUpdateTransaction',
  async (body: any) => {
    const response = await requestApiILservices(
      'POST',
      '/api/CustomerPulse/CreateUpdateTransaction',
      body,
      baseApiSevicesUrl,
    );
    return response;
  },
);

export const getProductsPortfolio = createAsyncThunk(
  'factory/GetProductsPortfolio',
  async ({ProductId}: {ProductId: any}) => {
    let body = {ProductId, Language: isArabic() ? 2 : 1};
    const respone = await requestApiILservices(
      'POST',
      'GetProductsPortfolio',
      body,
      false,
    );
    return respone;
  },
);
export const saveProductsPortfolio = createAsyncThunk(
  'factory/SaveProductsPortfolio',
  async ({payload}: {payload: any}) => {
    let body = {...payload};
    const respone = await requestApiILservices(
      'POST',
      'SaveProductsPortfolio',
      body,
      false,
    );
    return respone;
  },
);
export const isIndustrialLicenseExist = createAsyncThunk(
  'ILServices/IsIndustrialLicenseExist',
  async ({LocalIndustrialLicenseNumber, LocalAuthorityId}: any) => {
    let body = {LocalIndustrialLicenseNumber, LocalAuthorityId};
    const respone = await requestApiILservices(
      'POST',
      'IsLocalIndustrialNumberExist',
      body,
      false,
    );
    return respone;
  },
);

export const getDuesOnLicense = createAsyncThunk(
  'service/getDuesOnLicense',
  async (payload: any) => {
    const respone = await requestApiILservices(
      'POST',
      'GetDuesOnLicense',
      payload,
      false,
    );
    return respone;
  },
);
