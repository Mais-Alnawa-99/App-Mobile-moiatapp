import {createAsyncThunk} from '@reduxjs/toolkit';
import {requestApiEservices} from '../../../network/apiEservices';
import {buildBody} from '../../../network/api';
import {isArabic} from '../../../../locales';

export const previewCertificate = createAsyncThunk(
  'certificates/PreviewCertificate',
  async ({
    ApplicationNumber,
    CertificateId,
    ExtraFilters,
  }: {
    ApplicationNumber: any;
    CertificateId: any;
    ExtraFilters: any;
  }) => {
    let body = buildBody({
      ApplicationNumber: ApplicationNumber,
      CertificateId: CertificateId,
      ExtraFilters: ExtraFilters,
    });
    const response = await requestApiEservices(
      'GET',
      '/UploadAttachment/PreviewCertificate/?' + body,
    );
    return response;
  },
);

export const getCertificates = createAsyncThunk(
  'user/certificate',
  async ({
    ServiceId,
    StageId,
    StageStatusId,
    PageNumber,
    PageSize,
    Search,
    Start,
    End,
    dateFilterType,
    OwnedBy,
  }: {
    ServiceId: any;
    StageId: any;
    StageStatusId: any;
    PageNumber: any;
    PageSize: any;
    Search: any;
    Start: any;
    End: any;
    dateFilterType: any;
    OwnedBy: any;
  }) => {
    let body = buildBody({
      ServiceId: ServiceId,
      StageId: StageId,
      StageStatusId: StageStatusId,
      PageNumber: PageNumber,
      Language: isArabic() ? 'ar' : 'en',
      PageSize: PageSize,
      Search: Search,
      Start: Start,
      End: End,
      Mode: 'MyCertificates',
      dateFilterType: dateFilterType,
      ShowExpire: false,
      OwnedBy: OwnedBy,
    });
    const response = await requestApiEservices(
      'GET',
      '/Application/UserApplicationCertificateLists/?' + body,
    );
    return response;
  },
);

export const getApplicationCertificateById = createAsyncThunk(
  'certificates/getApplicationCertificateById',
  async ({
    ApplicationId,
    AppCertificateId,
  }: {
    ApplicationId: any;
    AppCertificateId: any;
  }) => {
    let body = buildBody({
      ApplicationId,
      AppCertificateId,
    });
    const response = await requestApiEservices(
      'GET',
      '/UploadAttachment/GetApplicationCertificateById/?' + body,
    );
    return response;
  },
);
