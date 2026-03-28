import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody, request, requestHTML} from '../../../network/api';
import {isArabic} from '../../../../locales';
import {
  baseApiSevicesUrl,
  requestApiILservices,
} from '../../../network/api_ILServices';

export const getServiceHighlightsCards = createAsyncThunk(
  'openData/getServiceHighlightsCards',
  async () => {
    const response = await requestHTML(
      'GET',
      '/api/OpenDataDocumentLibrary/ServiceHighlightsCards',
      false,
      false,
      {Cookie: isArabic() ? `moiat#lang=ar;` : `moiat#lang=en;`},
    );
    return response;
  },
);

export const getFactoriesData = createAsyncThunk(
  'openData/getFactoriesData',
  async (payload: any) => {
    const formdata = new FormData();
    formdata.append('searchword', payload.searchword);
    formdata.append('emirateID', payload.emirateID);
    formdata.append('areaID', payload.areaID);
    formdata.append('page', payload.page);
    formdata.append('PageSize', payload.pageSize);
    if (!!payload.activityCategory) {
      formdata.append('activitiesCatgIDs', payload.activityCategory);
    }
    const response = await requestHTML(
      'POSt',
      '/api/OpenDataDocumentLibrary/GetFactories',
      formdata,
      false,
      {Cookie: isArabic() ? `moiat#lang=ar;` : `moiat#lang=en;`},
    );
    return response;
  },
);

export const getInteractiveFilters = createAsyncThunk(
  'openData/getInteractiveFilters',
  async () => {
    const response = await request(
      'GET',
      '/api/OpenDataDocumentLibrary/GetInteractiveFilters?tab=Industrial%20and%20Advanced%20Technology',
      {},
      false,
      {Cookie: isArabic() ? `moiat#lang=ar;` : `moiat#lang=en;`},
    );
    return response;
  },
);

export const getLocationAreas = createAsyncThunk(
  'openData/getLocationAreas',
  async (locationID: any) => {
    const response = await request(
      'GET',
      '/api/OpenDataDocumentLibrary/GetLocationAreas?locationID=' + locationID,
      {},
      false,
      {Cookie: isArabic() ? `moiat#lang=ar;` : `moiat#lang=en;`},
    );
    return response;
  },
);

export const getRelatedActivities = createAsyncThunk(
  'openData/getRelatedActivities',
  async (categoryID: any) => {
    const response = await request(
      'GET',
      '/api/OpenDataDocumentLibrary/GetRelatedActivities?categoryID=' +
        categoryID,
      {},
      false,
      {Cookie: isArabic() ? `moiat#lang=ar;` : `moiat#lang=en;`},
    );
    return response;
  },
);

export const proposeOrRequestData = createAsyncThunk(
  'help/proposeOrRequestData',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'ProposeOrRequestData',
      payload,
      `${baseApiSevicesUrl}/api/OpenData/`,
    );
    return response;
  },
);

export const getCertificationBodies = createAsyncThunk(
  'help/getCertificationBodies',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'GetCertificationBodies',
      {...payload, language: isArabic() ? '2' : '1'},
      `${baseApiSevicesUrl}/api/OpenData/`,
    );
    return response;
  },
);

export const getGetConformityBodies = createAsyncThunk(
  'help/getGetAccreditedBodies',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'GetAccreditedBodies',
      {...payload, language: isArabic() ? '2' : '1'},
      `${baseApiSevicesUrl}/api/OpenData/`,
    );
    return response;
  },
);

export const getNotifiedBodies = createAsyncThunk(
  'help/getNotifiedBodies',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'GetNotifiedBodies',
      {...payload},
      `${baseApiSevicesUrl}/api/OpenData/`,
    );
    return response;
  },
);
export const getRegulations = createAsyncThunk(
  'help/getRegulations',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'GetRegulations',
      {...payload},
      `${baseApiSevicesUrl}/api/OpenData/`,
    );
    return response;
  },
);
