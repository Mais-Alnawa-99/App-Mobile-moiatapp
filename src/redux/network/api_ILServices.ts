import {setLoaderStatus} from '../reducers/General/loader';
import {setNeedRefreshToken} from '../reducers/General/server';
import {reduxStorage, store} from '../store';
import {fetchWithTimeout} from './api';
import {NetworkInfo} from 'react-native-network-info';
import {production} from '../../../app.json';
import reactotron from 'reactotron-react-native';

let baseILUrl = production
  ? 'https://il.moiat.gov.ae'
  : 'https://il-stag.moiat.gov.ae';

let baseApiSevicesUrl = production
  ? 'https://api.moiat.gov.ae'
  : 'https://api-stag.moiat.gov.ae';
let baseILSsoUrl = production
  ? 'https://sso.moiat.gov.ae/'
  : 'https://sso-stag.moiat.gov.ae/';
let serviceApiGateway = baseApiSevicesUrl + '/api/IndustrialApplication/';
let moecIntegrationGateway = baseApiSevicesUrl + '/api/moec/';
let fileUploadUrl = baseApiSevicesUrl + '/backend/files/';
let eservicesURL = baseApiSevicesUrl + '/eservices';

let serviceCustomApiGateway = baseApiSevicesUrl + '/backend/customapi/v1.1';

const requestApiILservices = async (
  method: string,
  endpoint: string,
  data?: any,
  customUrl?: any,
  moec?: any,
) => {
  store.dispatch(setLoaderStatus(true));
  const headers = {
    'Content-Type': 'application/json',
    // authorization:
    //   'Bearer ' + store.getState().userToken.tokenData?.access_token,
    // languageid: (await reduxStorage.getItem('lang')) == 'ar' ? 2 : 1 || 2,
    // ipaddress: await NetworkInfo.getIPAddress(),
    APIKey: production ? 'Mobile-Prod' : 'ADQCC-Stg',
    Secret: production
      ? 'A1B2C3D4-E5F6-4A7B-8C9D-0E1F2A3B4C5D'
      : 'Stg-ADQCC2022',
  };

  const url = !!customUrl
    ? `${customUrl}${endpoint}`
    : moec
    ? `${moecIntegrationGateway}${endpoint}`
    : `${serviceApiGateway}${endpoint}`;

  let params: any = {
    method,
    headers,
  };
  if (data) {
    params.body = JSON.stringify(data);
  }
  try {
    return await fetchWithTimeout(url, params)
      .then(res => {
        return res;
      })
      .then(async (response: any) => {
        store.dispatch(setLoaderStatus(false));
        if (response?.status == 401) {
          // store.dispatch(setNeedRefreshToken(true));
        }
        return await response
          .json()
          .then((res: any) => {
            store.dispatch(setNeedRefreshToken(false));

            return {...res, networkSuccess: true};
          })
          .catch((e: any) => {
            // store.dispatch(setServerStatus(false));
            return {networkSuccess: false};
          });
      })
      .catch(e => {
        // store.dispatch(setServerStatus(false));
        return {networkSuccess: false};
      });
  } catch (e) {
    // store.dispatch(setServerStatus(false));
    return {networkSuccess: false};
  }
};

const requestApiILSso = async (
  method: string,
  endpoint: string,
  data?: any,
  header?: any,
  form?: any,
  customUrl?: any,
  formData?: any,
) => {
  store.dispatch(setLoaderStatus(true));
  let headers: any = {
    'Content-Type': 'application/json',
  };
  const url = !!customUrl
    ? `${customUrl}${endpoint}`
    : `${baseILSsoUrl}${endpoint}`;
  if (header)
    headers = {
      ...headers,
      ...header,
    };
  let params: any = {method, headers};

  if (form) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    const formBody = Object.keys(form)
      .map(
        key =>
          encodeURIComponent(key) + '=' + encodeURIComponent(form[key] ?? ''),
      )
      .join('&');
    params.body = formBody;
  } else if (data) {
    params.body = formData ? data : JSON.stringify(data);
  }
  if (formData && header) {
    params.headers = header;
  }

  try {
    const response: any = await fetchWithTimeout(url, params);
    store.dispatch(setLoaderStatus(false));

    if (response?.status === 401) {
    }

    return await response
      .json()
      .then((res: any) => {
        store.dispatch(setNeedRefreshToken(false));
        return {...res, networkSuccess: true};
      })
      .catch(w => {
        return {networkSuccess: false};
      });
  } catch (e) {
    return {networkSuccess: false};
  }
};

export {
  requestApiILservices,
  requestApiILSso,
  serviceApiGateway,
  fileUploadUrl,
  eservicesURL,
  serviceCustomApiGateway,
  baseApiSevicesUrl,
  baseILSsoUrl,
  baseILUrl,
};
