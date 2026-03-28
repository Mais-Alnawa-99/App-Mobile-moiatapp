import {combineReducers} from '@reduxjs/toolkit';
import uaePassAuthCode from './slice/uaePassAuthCode';
import uaePassInfoSlice from './slice/uaePassInfoSlice';
import uaePassTokenSlice from './slice/uaePassTokenSlice';
import uaePassVerfiyDigital from './slice/uaePassVerfiyDigital';
export default combineReducers({
  uaePassAuthCode,
  uaePassInfoSlice,
  uaePassTokenSlice,
  uaePassVerfiyDigital,
});
