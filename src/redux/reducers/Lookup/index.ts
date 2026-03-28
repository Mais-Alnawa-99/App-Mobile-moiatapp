import {combineReducers} from '@reduxjs/toolkit';
import lookupsDefinition from './slice/lookupsDefinition';
import lookupsValues from './slice/lookupsValues';

export default combineReducers({
  lookupsDefinition,
  lookupsValues,
});
