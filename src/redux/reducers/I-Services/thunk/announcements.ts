import {createAsyncThunk} from '@reduxjs/toolkit';
import {requestApiILservices} from '../../../network/api_ILServices';
import {isArabic} from '../../../../locales';

export const getILAnnouncementsForUsers = createAsyncThunk(
  'Announcements/getILAnnouncementsForUsers',
  async (payload: any) => {
    const response = await requestApiILservices(
      'POST',
      'GetAnnouncements',
      {...payload, language: isArabic() ? '2' : '1'},
      false,
    );
    return response;
  },
);

export const setILAnnouncementsAcknowledgment = createAsyncThunk(
  'Announcements/setILAnnouncementsAcknowledgment',
  async (paylaod: any) => {
    const response = await requestApiILservices(
      'POST',
      'AnnouncementAcknowledgment',
      paylaod,
      false,
    );
    return response;
  },
);
