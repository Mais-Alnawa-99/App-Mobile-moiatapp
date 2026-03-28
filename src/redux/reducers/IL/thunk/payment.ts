import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiEservices} from '../../../network/apiEservices';

export const getUserILPaymentLists = createAsyncThunk(
  'IL/getUserILPaymentLists',
  async (payload: any) => {
    // let body = buildBody({
    // });
    // const response = await requestApiEservices('GET', '/Application/?' + body);
    const response = [
      {
        serviceName: 'طلب زيادة كمية لمادة مسجلة للإعفاء الجمركي',
        serviceCode: 'IDX00000033',
        transactionNumber: 'IL638793590195658212',
        receiptNumber: '10801243590198416704',
        amount: 100.71,
        paymentDate: '2025-04-04T10:23:00',
        paymentStatus: 'عملية دفع ناجحة',
        paymentType: 'رسوم تفتيش',
        totalRows: 100,
      },
      {
        serviceName: 'طلب إعفاء مدخلات الصناعة من الرسوم الجمركية',
        serviceCode: 'DX00000131',
        transactionNumber: 'IL638793562101209661',
        receiptNumber: '10801123562193690162',
        amount: 201.43,
        paymentDate: '2025-04-04T09:36:00',
        paymentStatus: 'عملية دفع ناجحة',
        paymentType: 'رسوم خدمة',
        totalRows: 100,
      },
      {
        serviceName: 'طلب إعفاء مدخلات الصناعة من الرسوم الجمركية',
        serviceCode: 'DX00000130',
        transactionNumber: 'IL638792827652578723',
        receiptNumber: '10800352827746015930',
        amount: 352.5,
        paymentDate: '2025-04-03T13:12:00',
        paymentStatus: 'عملية دفع ناجحة',
        paymentType: 'رسوم خدمة',
        totalRows: 100,
      },
      {
        serviceName: 'طلب تسجيل مادة للإعفاء الجمركي',
        serviceCode: 'RDX00000074',
        transactionNumber: 'IL638792781844516033',
        receiptNumber: '10800172781917588003',
        amount: 100.71,
        paymentDate: '2025-04-03T11:56:00',
        paymentStatus: 'عملية دفع ناجحة',
        paymentType: 'رسوم خدمة',
        totalRows: 100,
      },
      {
        serviceName: 'إصدار شهادة الموافقة المبدئية',
        serviceCode: 'IAC00000038',
        transactionNumber: 'IL638785762660584359',
        receiptNumber: '10792035762896286321',
        amount: 1007.14,
        paymentDate: '2025-03-26T08:57:00',
        paymentStatus: 'عملية دفع ناجحة',
        paymentType: 'رسوم خدمة',
        totalRows: 100,
      },
    ];

    return response;
  },
);
