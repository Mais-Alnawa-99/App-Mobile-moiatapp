import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiEservices} from '../../../network/apiEservices';

export const getILCertificates = createAsyncThunk(
  'IL/getILCertificates',
  async (payload: any) => {
    // let body = buildBody({
    // });
    // const response = await requestApiEservices('GET', '/Application/?' + body);
    const response = [
      {
        title: 'شهادة الموافقة المبدئية',
        applicationNumber: 'IAC00000038',
        issueDate: '26/03/2025',
        expiryDate: '25/03/2026',
        appId: '34ee1c1b-4a40-41bf-af67-d99a13532797',
        appTitle: 'إصدار شهادة الموافقة المبدئية',
        totalRows: 99,
      },
    ];

    return response;
  },
);
