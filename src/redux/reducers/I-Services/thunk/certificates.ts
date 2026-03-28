import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiILservices} from '../../../network/api_ILServices';
import {isArabic} from '../../../../locales';

export const getILCertificates = createAsyncThunk(
  'IL/getILCertificates',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'GetUserCertificates',
      {...payload, language: isArabic() ? '2' : '1'},
      false,
    );

    return response;
  },
);

export const downlaodCertificateOrReceipt = createAsyncThunk(
  'IL/DownlaodCertificateOrReceipt',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'DownlaodCertificateOrReceipt',
      {
        ...payload,
        // , language: isArabic() ? '2' : '1'
      },
      false,
    );

    return response;
  },
);
