import {production} from '../../../../app.json';

// export const BASE_URL = 'https://stg-id.uaepass.ae';
// let production = true;
export const BASE_URL = production
  ? 'https://id.uaepass.ae'
  : 'https://stg-id.uaepass.ae';

export const AUTH_URL = BASE_URL + '/idshub/authorize';

export const REDIRECT_URL = 'https://ctssvc.moiat.gov.ae';
export const UAE_PASS_CLIENT_ID = production
  ? 'moiat_mob_prod'
  : 'moiat_mob_stage'; // moiat_mob_stage , moiat_mob_prod
export const UAE_PASS_CLIENT_SECRET = production
  ? 'PVmqWFQBmFXh5989'
  : 'VRSxUBZXLzHvQbTP'; // VRSxUBZXLzHvQbTP , PVmqWFQBmFXh5989

export const RESPONSE_TYPE = 'code';
export const SCOPE = 'urn:uae:digitalid:profile:general';
export const LANGUAGE = 'en';

export const ACR_VALUES_MOBILE =
  'urn:digitalid:authentication:flow:mobileondevice';
export const ACR_VALUES_WEB =
  'urn:safelayer:tws:policies:authentication:level:low';
export const UAE_PASS_PACKAGE_ID = 'ae.uaepass.mainapp';
export const UAE_PASS_QA_PACKAGE_ID = 'ae.uaepass.mainapp.stg';
export const URL_SCHEME = 'smartservicesmoiat';
export const HOST_SUCCESS = 'success';
export const HOST_FAILURE = 'failure';
export const UAE_PASS_APP_ID = production ? 'uaepass://' : 'uaepassstg://';

export const updateURLParameter = (url: any, param: any, paramVal: any) => {
  var newAdditionalURL = '';
  var tempArray = url.split('?');
  var baseURL = tempArray[0];
  var additionalURL = tempArray[1];
  var temp = '';
  if (additionalURL) {
    tempArray = additionalURL.split('&');
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] != param) {
        newAdditionalURL += temp + tempArray[i];
        temp = '&';
      }
    }
  }
  // encodeURIComponent
  var rows_txt = temp + '' + param + '=' + paramVal;
  return baseURL + '?' + newAdditionalURL + rows_txt;
};
