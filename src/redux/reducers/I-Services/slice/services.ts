import {createSlice} from '@reduxjs/toolkit';

const ilServices = createSlice({
  name: 'ilServices',
  initialState: {
    ilServices: [],
  },
  reducers: {
    setILServices: (state, action) => {
      state.ilServices = action.payload?.services;
    },

    clearServicesValues: state => {
      state.ilServices = [];
    },
  },
});

export const {setILServices, clearServicesValues} = ilServices.actions;
export default ilServices.reducer;
