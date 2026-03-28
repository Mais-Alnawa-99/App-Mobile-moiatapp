import {combineReducers} from '@reduxjs/toolkit';
import services from './slice/services';
import serviceDetails from './slice/serviceDetails';
import selectedService from './slice/selectedService';
export default combineReducers({
  services,
  serviceDetails,
  selectedService,
});
