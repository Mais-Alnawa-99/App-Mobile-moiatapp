import {createAsyncThunk} from '@reduxjs/toolkit';
import {buildBody} from '../../../network/api';
import {requestApiEservices} from '../../../network/apiEservices';

export const getAnnouncementsForUsers = createAsyncThunk(
  'Announcements/getAnnouncementsForUsers',
  async () => {
    const response = await requestApiEservices(
      'GET',
      '/EntityAdmin/AnnouncementsForUsers',
    );
    return response;
  },
);

export const announcementsAcknowledgment = createAsyncThunk(
  'Announcements/AnnouncementsAcknowledgment',
  async ({announcementId}: {announcementId: any}) => {
    let body = {
      announcementId: announcementId,
    };
    const response = await requestApiEservices(
      'POST',
      '/EntityAdmin/AnnouncementsAcknowledgment',
      body,
    );
    return response;
  },
);
