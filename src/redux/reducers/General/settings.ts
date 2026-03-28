import {createSlice} from '@reduxjs/toolkit';

const settings = createSlice({
  name: 'settings',
  initialState: {
    settings: {},
  },
  reducers: {
    setSetting: (state, action) => {
      state.settings = {...state.settings, ...action.payload};
    },
  },
});

export const {setSetting} = settings.actions;
export default settings.reducer;
