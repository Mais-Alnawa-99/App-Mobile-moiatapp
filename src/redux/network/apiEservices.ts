import {setLoaderStatus} from '../reducers/General/loader';
import {setNeedRefreshToken} from '../reducers/General/server';
import {reduxStorage, store} from '../store';
import {fetchWithTimeout} from './api';
import {NetworkInfo} from 'react-native-network-info';
import {production} from '../../../app.json';

let baseEsevicesUrl = production
  ? 'https://eservices.moiat.gov.ae'
  : 'https://services-stag.moiat.gov.ae';
let serviceApiGateway = baseEsevicesUrl + '/backend/api/v1.1';
let fileUploadUrl = baseEsevicesUrl + '/backend/files/';
let eservicesURL = baseEsevicesUrl + '/eservices';

let serviceCustomApiGateway = baseEsevicesUrl + '/backend/customapi/v1.1';

const requestApiEservices = async (
  method: string,
  endpoint: string,
  data?: any,
  customUrl?: any,
) => {
  store.dispatch(setLoaderStatus(true));
  const headers = {
    'Content-Type': 'application/json',
    authorization:
      'Bearer ' + (store.getState().userToken.tokenData as any)?.access_token,
    languageid: (await reduxStorage.getItem('lang')) == 'ar' ? 2 : 1 || 2,
    ipaddress: await NetworkInfo.getIPAddress(),
  };

  const url = !!customUrl
    ? `${customUrl}${endpoint}`
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
          store.dispatch(setNeedRefreshToken(true));
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

export {
  requestApiEservices,
  serviceApiGateway,
  fileUploadUrl,
  eservicesURL,
  serviceCustomApiGateway,
  baseEsevicesUrl,
};
