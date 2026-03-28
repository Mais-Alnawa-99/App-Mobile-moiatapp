import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiEservices} from '../../../network/apiEservices';

export const getApplicationPaymentDetails = createAsyncThunk(
  'payments/GetApplicationPaymentDetails',
  async ({OrderNumber}: {OrderNumber: any}) => {
    let body = buildBody({
      OrderNumber: OrderNumber,
    });
    const response = await requestApiEservices(
      'GET',
      '/Payment/GetApplicationPaymentDetails/?' + body,
    );
    return response;
  },
);

export const getApplicationPaymentFee = createAsyncThunk(
  'services/GetApplicationPaymentFee',
  async ({
    ApplicationId,
    EntityFieldId,
    CurrentApplicationStageId,
    Data,
    ProfileRecordId,
  }: {
    ApplicationId: any;
    EntityFieldId: any;
    CurrentApplicationStageId: any;
    Data: any;
    ProfileRecordId: any;
  }) => {
    let body = {
      ApplicationId: ApplicationId,
      EntityFieldId: EntityFieldId,
      CurrentApplicationStageId: CurrentApplicationStageId,
      Data: Data,
      ProfileRecordId: ProfileRecordId,
    };
    const response = await requestApiEservices(
      'POST',
      '/Application/GetApplicationPaymentFee',
      body,
    );
    return response;
  },
);

//services-stag.moiat.gov.ae/backend/api/v1.1/Payment/GetUserPaymentLists/?
// PageNumber=1&PageSize=10&Search=&Start=&End=&Mode=MyPayments&Status=&ServiceId=&URN=

export const getUserPaymentLists = createAsyncThunk(
  'user/payments',
  async ({
    ServiceId,
    PageNumber,
    PageSize,
    Search,
    Start,
    End,
    URN,
    Status,
  }: {
    ServiceId: any;
    PageNumber: any;
    PageSize: any;
    Search: any;
    Start: any;
    End: any;
    URN: any;
    Status: any;
  }) => {
    let body = buildBody({
      ServiceId: ServiceId,
      PageNumber: PageNumber,
      PageSize: PageSize,
      Search: Search,
      Start: Start,
      End: End,
      Mode: 'MyPayments',
      URN: URN,
      Status: Status,
    });
    const response = await requestApiEservices(
      'GET',
      '/Payment/GetUserPaymentLists/?' + body,
    );
    return response;
  },
);
