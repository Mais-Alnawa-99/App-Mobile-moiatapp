import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  Share,
  ShareContent,
} from 'react-native';
import base64 from 'react-native-base64';
import {URL} from '../redux/network/api';
import {Buffer} from 'buffer';

export function replaceArabicNumerals(input: string): string {
  return input.replace(/[٠-٩]/g, match =>
    '٠١٢٣٤٥٦٧٨٩'.indexOf(match).toString(),
  );
}

export const getTextFromHtml = (htmlString: any) => {
  if (!!htmlString) {
    const regex = /(<([^>]+)>)/gi;
    const result = htmlString.replace(regex, '');
    const r = result.replace('\n', '');
    const final = r.replace('&nbsp;', '');
    return final;
  }
};

export function removeDuplicatesByKey<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set();
  return arr.filter(item => {
    const value = item[key];
    if (!seen.has(value)) {
      seen.add(value);
      return true;
    }
    return false;
  });
}
export const showImage = (img: any) => {
  return URL + '/api/file/download/' + getImage(img)?.uuid;
};

export const getParamsFromUrl = (url: string) => {
  let regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2];
  }

  return params;
};
export const IMAGE_URL = (uuid: string) => `${URL}/api/file/download/${uuid}`;
export const File_URL = (uuid: string) => `${URL}/api/file/download/${uuid}`;

export const openWhatsappChat = (phone: any) => {
  let url = 'whatsapp://send?phone=0097147771777';
  let webUrl = 'https://wa.me/' + phone;
  Linking.openURL(webUrl);
};

export const openDirectWhatsappChat = () => {
  let url = 'whatsapp://send?phone=0097127774747';
  let webUrl = 'https://wa.me/97127774747';
  Linking.openURL(webUrl);
};

export const openSmsChat = (sms: any) => {
  Linking.openURL('sms:' + sms);
};

export const callPhoneNumber = (phoneNumber: any) => {
  const phoneUrl = `tel:${phoneNumber}`;
  Linking.openURL(phoneUrl);
};

const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      // request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      // });
      return true;
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    return false;
  }
};

export const encodeToBase64 = (str: string) => {
  return base64.encode(str);
};

export const onShare = async (item: ShareContent) => {
  try {
    const result = await Share.share(item);
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

export async function requestReadWritePermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (
      granted['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export const decodeJWT = (token: string) => {
  try {
    const [, payload] = token.split('.');
    if (!payload) throw new Error('Invalid JWT format');

    const json = Buffer.from(payload, 'base64').toString('utf8');

    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};
