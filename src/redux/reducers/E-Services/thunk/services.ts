import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiEservices} from '../../../network/apiEservices';

export const getEntityFieldLookups = createAsyncThunk(
  'lookups/EntityFieldLookups',
  async ({
    formId,
    serviceId,
    profileRecordId,
  }: {
    formId: any;
    serviceId: any;
    profileRecordId: any;
  }) => {
    let body = buildBody({
      FormId: formId,
      ServiceId: serviceId,
      ProfileRecordId: profileRecordId,
    });
    const response = await requestApiEservices(
      'GET',
      '/Application/EntityFieldLookups/?' + body,
    );
    return response;
  },
);
export const getCascadedLookups = createAsyncThunk(
  'lookups/getCascadedLookups',
  async ({
    EntityFieldId,
    LookupParentId,
    ExtraValues,
    ProfileRecordId,
  }: {
    EntityFieldId: any;
    LookupParentId: any;
    ExtraValues: any;
    ProfileRecordId: any;
  }) => {
    let body = buildBody({
      EntityFieldId: EntityFieldId,
      LookupParentId: LookupParentId,
      ExtraValues: ExtraValues,
      ProfileRecordId: ProfileRecordId,
    });
    const response = await requestApiEservices(
      'GET',
      '/Application/CascadedLookups/?' + body,
    );
    return response;
  },
);

export const getSearchRelatedRecords = createAsyncThunk(
  'services/GetSearchRelatedRecords',
  async ({
    FormSectionFieldId,
    RecordId,
    PageNumber,
    PageSize,
    ProfileRecordId,
    ExtraFieldFilters,
    MatchAnyCondition,
    TempAppId,
    ApplicationId,
    ServiceId,
  }: {
    FormSectionFieldId: any;
    RecordId: any;
    PageNumber: any;
    PageSize: any;
    ProfileRecordId: any;
    ExtraFieldFilters: any;
    MatchAnyCondition: any;
    TempAppId: any;
    ApplicationId: any;
    ServiceId: any;
  }) => {
    let body = buildBody({
      FormSectionFieldId: FormSectionFieldId,
      RecordId: RecordId,
      PageNumber: PageNumber,
      PageSize: PageSize,
      ProfileRecordId: ProfileRecordId,
      ExtraFieldFilters: ExtraFieldFilters,
      MatchAnyCondition: MatchAnyCondition,
      TempAppId: TempAppId,
      ApplicationId: ApplicationId,
      ServiceId: ServiceId,
    });
    const response = await requestApiEservices(
      'GET',
      '/Services/GetSearchRelatedRecords/?' + body,
    );
    return response;
  },
);

export const getServiceForms = createAsyncThunk(
  'services/getServiceForms',
  async (data: any) => {
    const response = await requestApiEservices(
      'POST',
      '/Application/GetServiceForms',
      data,
    );
    return response;
  },
);

export const deleteTemporaryAttachment = createAsyncThunk(
  'attachment/deleteTemporaryAttachment',
  async ({attachmentId}: {attachmentId: any}) => {
    let body = buildBody({
      attachmentId: attachmentId,
    });
    const response = await requestApiEservices(
      'DELETE',
      '/UploadAttachment/DeleteTemporaryAttachment/?' + body,
    );
    return response;
  },
);

export const deleteAttachment = createAsyncThunk(
  'attachment/deleteAttachment',
  async ({attachmentId}: {attachmentId: any}) => {
    let body = buildBody({
      attachmentId: attachmentId,
    });
    const response = await requestApiEservices(
      'DELETE',
      '/UploadAttachment/?' + body,
    );
    return response;
  },
);

export const getServiceIdByAbrevation = createAsyncThunk(
  'services/GetServiceIdByAbrevation',
  async ({ServiceAbrevation}: {ServiceAbrevation: any}) => {
    let body = buildBody({
      ServiceAbrevation: ServiceAbrevation,
    });
    const response = await requestApiEservices(
      'GET',
      '/Services/GetServiceIdByAbrevation/?' + body,
    );
    return response;
  },
);

export const getApplicationChildForm = createAsyncThunk(
  'services/getApplicationChildForm',
  async (data: any) => {
    const response = await requestApiEservices(
      'POST',
      '/Application/getApplicationChildForm',
      data,
    );
    return response;
  },
);

export const checkPermission = createAsyncThunk(
  'services/checkPermission',
  async ({ServiceId, StageActionId}: {ServiceId: any; StageActionId: any}) => {
    let body = buildBody({
      ServiceId: ServiceId,
      StageActionId: StageActionId,
    });
    const response = await requestApiEservices(
      'GET',
      '/Services/CheckPermission/?' + body,
    );
    return response;
  },
);

export const getDashboardGroupServices = createAsyncThunk(
  'services/getDashboardGroupServices',
  async () => {
    const response = await requestApiEservices(
      'GET',
      '/Services/GetDashboardGroupServices',
    );
    return response;
  },
);

export const getRecordChildForm = createAsyncThunk(
  'services/GetRecordChildForm',
  async ({
    EntityId,
    FormSectionFieldId,
    ServiceId,
    RecordId,
    TempAppId,
    CurrentStageId,
    ApplicationId,
  }: {
    EntityId: any;
    FormSectionFieldId: any;
    ServiceId: any;
    RecordId: any;
    TempAppId: any;
    CurrentStageId: any;
    ApplicationId: any;
  }) => {
    let body = buildBody({
      EntityId: EntityId,
      FormSectionFieldId: FormSectionFieldId,
      ServiceId: ServiceId,
      RecordId: RecordId,
      TempAppId: TempAppId,
      CurrentStageId: CurrentStageId,
      ApplicationId: ApplicationId,
    });
    const response = await requestApiEservices(
      'GET',
      '/Record/GetRecordChildForm/?' + body,
    );
    return response;
  },
);

export const setSelectedRecord = createAsyncThunk(
  'services/SetSelectedRecord',
  async ({
    serviceId,
    FormSectionFieldId,
    RecordId,
    ProfileRecordId,
    ApplicationId,
    TempAppId,
    CurrentStageId,
    DeleteAttachments,
  }: {
    serviceId: any;
    FormSectionFieldId: any;
    RecordId: any;
    ProfileRecordId: any;
    ApplicationId: any;
    TempAppId: any;
    CurrentStageId: any;
    DeleteAttachments: any;
  }) => {
    let body = buildBody({
      serviceId,
      FormSectionFieldId,
      RecordId,
      ProfileRecordId,
      ApplicationId,
      TempAppId,
      CurrentStageId,
      DeleteAttachments,
    });
    const response = await requestApiEservices(
      'GET',
      '/Services/SetSelectedRecord/?' + body,
    );
    return response;
  },
);

export const getChildEntityFieldLookups = createAsyncThunk(
  'services/getChildEntityFieldLookups',
  async ({FormSectionParentId}: {FormSectionParentId: any}) => {
    let body = buildBody({
      FormSectionParentId,
    });
    const response = await requestApiEservices(
      'GET',
      '/Application/GetChildEntityFieldLookups/?' + body,
    );
    return response;
  },
);

export const getSearchLookups = createAsyncThunk(
  'services/getSearchLookups',
  async ({
    entityFieldId,
    formSectionFieldId,
    filterFieldValues,
    matchAnyCondition,
  }: {
    entityFieldId: any;
    formSectionFieldId: any;
    filterFieldValues: any;
    matchAnyCondition: any;
  }) => {
    let body = {
      entityFieldId,
      formSectionFieldId,
      filterFieldValues,
      matchAnyCondition,
    };
    const response = await requestApiEservices(
      'POST',
      '/Record/GetSearchLookups',
      body,
    );
    return response;
  },
);

export const getCalculatedFieldValue = createAsyncThunk(
  'application/getCalculatedFieldValue',
  async ({
    ApplicationId,
    EntityFieldId,
    CurrentApplicationStageId,
    Data,
    ProfileRecordId,
    ItemIndex,
  }: {
    ApplicationId: any;
    EntityFieldId: any;
    CurrentApplicationStageId: any;
    Data: any;
    ProfileRecordId: any;
    ItemIndex: any;
  }) => {
    let body = {
      ApplicationId,
      EntityFieldId,
      CurrentApplicationStageId,
      Data,
      ProfileRecordId,
      ItemIndex,
    };
    const response = await requestApiEservices(
      'POST',
      '/Application/GetCalculatedFieldValue',
      body,
    );
    return response;
  },
);

export const getTreeLookupsData = createAsyncThunk(
  'services/getTreeLookupsData',
  async ({EntityFieldId, Filter}: {EntityFieldId: any; Filter: any}) => {
    let body = buildBody({
      EntityFieldId,
      Filter,
    });
    const response = await requestApiEservices(
      'GET',
      '/Application/GetTreeLookupsData/?' + body,
    );
    return response;
  },
);

export const getServicesByEnvironment = createAsyncThunk(
  'services/getTreeLookupsData',
  async () => {
    const response = await requestApiEservices(
      'GET',
      '/Services/GetServicesByEnvironment',
    );
    return response;
  },
);

export const updateUserFavouriteServices = createAsyncThunk(
  'services/getServiceForms',
  async (payload: any) => {
    const response = await requestApiEservices(
      'POST',
      '/Services/UpdateUserFavouriteServices',
      payload,
    );
    return response;
  },
);
