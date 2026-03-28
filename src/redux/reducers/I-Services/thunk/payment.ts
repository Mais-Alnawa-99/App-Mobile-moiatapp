import {createAsyncThunk} from '@reduxjs/toolkit';
import {requestApiILservices} from '../../../network/api_ILServices';
import {isArabic} from '../../../../locales';

export const getUserILPaymentLists = createAsyncThunk(
  'IL/getUserPayments',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'GetUserPayments',
      {...payload, language: isArabic() ? '2' : '1'},
      false,
    );

    return response;
  },
);
export const startPayment = createAsyncThunk(
  'IL/startPayment',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'StartPayment',
      {...payload, LanguageId: isArabic() ? '2' : '1'},
      false,
    );

    return response;
  },
);
export const paymentCallback = createAsyncThunk(
  'IL/paymentCallback',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'PaymentCallback',
      {...payload, LanguageId: isArabic() ? '2' : '1'},
      false,
    );

    return response;
  },
);
