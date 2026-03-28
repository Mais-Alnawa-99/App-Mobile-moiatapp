import {createAsyncThunk} from '@reduxjs/toolkit';
import {isArabic} from '../../../../locales';
import {
  baseApiSevicesUrl,
  requestApiILservices,
} from '../../../network/api_ILServices';

export type SchemaOption = {value: any; text: string};

export type FieldSchema = {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date';
  isRequired?: boolean;
  maxLength?: number;
  options?: SchemaOption[];
  dependentOn?: string;
  optionsUrl?: string;
};

const baseUrl = 'https://opp-manage.ripplez.ae/';

export const getOpportunitiesSchema = createAsyncThunk(
  'Opportunity/GetSchema',
  async () => {
    const endpoint = '/api/opportunities/schema';

    const response = await fetch(baseUrl + endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());

    return response;
  },
);

export const getOpportunityFieldOptions = createAsyncThunk(
  'Opportunity/GetFieldOptions',
  async ({optionsUrl, parentValue}: {optionsUrl: string; parentValue: any}) => {
    let url = optionsUrl.replace(
      '{value}',
      encodeURIComponent(String(parentValue)),
    );

    if (!url.startsWith('/')) url = `/${url}`;
    const response = await fetch(baseUrl + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());

    return response;
    return response;
  },
);
