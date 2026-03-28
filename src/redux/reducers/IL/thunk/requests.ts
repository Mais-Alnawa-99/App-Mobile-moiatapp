import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiEservices} from '../../../network/apiEservices';

export const getILApplications = createAsyncThunk(
  'IL/getILApplications',
  async (payload: any) => {
    // let body = buildBody({
    // });
    // const response = await requestApiEservices('GET', '/Application/?' + body);
    const response = [
      {
        title: 'إلغاء شهادة الموافقة المبدئية',
        requestId: 'CAC00000005',
        date: '26 مارس 2025 - 25 مارس 2026',
        status: 'تم الإلغاء',
        service: 'شهادة الموافقة المبدئية',
        user: 'MoIAT User',
      },
      {
        title: 'تعديل بيانات شهادة الموافقة المبدئية',
        requestId: 'MAC00000015',
        date: '26 مارس 2025 - 25 مارس 2026',
        status: 'معتمد',
        percentCompleted: 100,

        service: 'شهادة الموافقة المبدئية',
        user: 'MoIAT User',
      },
      {
        title: 'تعديل بيانات شهادة الموافقة المبدئية',
        requestId: 'MAC00000014',
        date: '26 مارس 2025 - 25 مارس 2026',
        status: 'معتمد',
        percentCompleted: 100,

        service: 'شهادة الموافقة المبدئية',
        user: 'MoIAT User',
      },
      {
        title: 'تعديل بيانات شهادة الموافقة المبدئية',
        requestId: 'MAC00000013',
        date: '26 مارس 2025 - 25 مارس 2026',
        status: 'معتمد',
        percentCompleted: 100,
        service: 'شهادة الموافقة المبدئية',
        user: 'MoIAT User',
      },
      {
        title: 'طلب إضافة كمية لمادة مسجلة للإعفاء الجمركي',
        requestId: 'IDX00000033',
        date: '26 مارس 2025 - 25 مارس 2026',
        status: 'قيد المراجعة',
        service: 'الإعفاء الجمركي',
        user: 'MoIAT User',
      },
      {
        title: 'طلب إلغاء مدخلات الصناعة من الإعفاء الجمركي',
        requestId: 'DX00000031',
        date: '26 مارس 2025 - 25 مارس 2026',
        status: 'معتمد',
        percentCompleted: 100,
        service: 'الإعفاء الجمركي',
        user: 'MoIAT User',
      },
      {
        title: 'طلب إلغاء مدخلات الصناعة من الإعفاء الجمركي',
        requestId: 'DX00000030',
        date: '26 مارس 2025 - 25 مارس 2026',
        status: 'تحت الإجراء',
        service: 'الإعفاء الجمركي',
        user: 'MoIAT User',
      },
      {
        title: 'طلب تسجيل مادة للإعفاء الجمركي',
        requestId: 'DX00000029',
        date: '26 مارس 2025 - 25 مارس 2026',
        status: 'مغلق',
        service: 'الإعفاء الجمركي',
        user: 'MoIAT User',
      },
      {
        title: 'تعديل بيانات شهادة الموافقة المبدئية',
        requestId: 'MAC00000007',
        date: '27 مارس 2025',
        status: 'معتمد',
        percentCompleted: 100,
        service: 'شهادة الموافقة المبدئية',
        user: 'MoIAT User',
      },
    ];

    return response;
  },
);
