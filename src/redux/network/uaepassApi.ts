import {
  BASE_URL,
  UAE_PASS_CLIENT_ID,
  UAE_PASS_CLIENT_SECRET,
  REDIRECT_URL,
} from '../../screens/Dashboard/uaepass/UaePassConstants';
import base64 from 'react-native-base64';

export const getAccessToken = async (code: any) => {
  return fetch(
    `${BASE_URL}/idshub/token?grant_type=authorization_code&redirect_uri=${REDIRECT_URL}&code=${code}&client_id=${UAE_PASS_CLIENT_ID}&client_secret=${UAE_PASS_CLIENT_SECRET}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          base64.encode(`${UAE_PASS_CLIENT_ID}:${UAE_PASS_CLIENT_SECRET}`),
      },
    },
  )
    .then(response => response.json())
    .then(response => {
      return {networkSuccess: true, ...response};
    })
    .catch(e => {
      return {networkSuccess: false};
    });
};

export const getUaepassProfile = async (token: any) => {
  return fetch(`${BASE_URL}/idshub/userinfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then(response => response.json())
    .catch(e => {
      return {networkSuccess: false};
    });
};

export const logoutUaePass = async (token: any) => {
  return fetch(`${BASE_URL}/idshub/logout?redirect_uri=${REDIRECT_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
    redirect: 'follow',
  })
    .then(response => {
      if (response.redirected) {
        return {
          networkSuccess: true,
        };
      } else {
        return {
          networkSuccess: false,
        };
      }
    })
    .catch(e => {
      return {networkSuccess: false};
    });
};
