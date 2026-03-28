import {setLoaderStatus} from '../reducers/General/loader';
import {reduxStorage, store} from '../store';
import {production} from '../../../app.json';
let URL = 'https://moiat.gov.ae';
let RequestsURL = 'https://api.moiat.gov.ae';
export const SSO_URL = production
  ? 'https://sso.moiat.gov.ae'
  : 'https://sso-stag.moiat.gov.ae';
const request = async (
  method: string,
  endpoint: string,
  data?: object,
  customUrl?: any,
  customHeader?: any,
) => {
  store.dispatch(setLoaderStatus(true));

  let headers = {
    'Content-Type': 'application/json',
    // Authorization: 'Basic c2VlbmRlbW86ZGVNTyEhU2VlbjBpbmZv',
    lang: (await reduxStorage.getItem('lang')) || 'ar',
    token: store.getState().auth.token || '',
  };
  if (!!customHeader) {
    headers = {
      ...headers,
      ...customHeader,
    };
  }

  const url = !!customUrl ? `${customUrl}${endpoint}` : `${URL}${endpoint}`;

  try {
    return await fetchWithTimeout(url, {
      method,
      headers,
    })
      .then(res => {
        return res;
      })
      .then(async (response: any) => {
        store.dispatch(setLoaderStatus(false));
        return await response
          .json()
          .then((res: any) => {
            return {...res};
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

const requestHTML = async (
  method: string,
  endpoint: string,
  data?: any,
  customUrl?: any,
  customHeader?: any,
) => {
  store.dispatch(setLoaderStatus(true));

  let headers = {
    // Authorization: 'Basic c2VlbmRlbW86ZGVNTyEhU2VlbjBpbmZv',
    lang: (await reduxStorage.getItem('lang')) || 'ar',
    token: store.getState().auth.token || '',
  };
  if (!!customHeader) {
    headers = {
      ...headers,
      ...customHeader,
    };
  }

  const url = !!customUrl ? `${customUrl}${endpoint}` : `${URL}${endpoint}`;
  let params: any = {
    method,
    headers,
  };
  if (data) {
    params = {
      ...params,
      body: data,
    };
  }

  try {
    return await fetchWithTimeout(url, params)
      .then((response: any) => {
        if (!response?.ok) return {networkSuccess: false};
        return response.text();
      })
      .then(data => {
        return {networkSuccess: true, data};
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

export async function fetchWithTimeout(
  url: string,
  options: {},
  timeout = 50000000,
) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(JSON.stringify({networkSuccess: false})),
        timeout,
      ),
    ),
  ]);
}

export const buildBody = (data: object): string => {
  const queryString = Object.entries(data)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return queryString;
};
export {request, URL, RequestsURL, requestHTML};
