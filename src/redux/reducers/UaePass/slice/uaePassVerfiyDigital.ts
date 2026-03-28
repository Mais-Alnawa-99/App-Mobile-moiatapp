import {createSlice} from '@reduxjs/toolkit';
import {postVerfiyDigital} from '../thunk/uaePass';
import reactotron from '../../../reactotron';

interface VerfiyDigitalType {
  verfiyDigital: {};
  verfiyDigitalLoader: boolean;
  error: boolean;
}

const initialState: VerfiyDigitalType = {
  verfiyDigital: {},
  verfiyDigitalLoader: false,
  error: false,
};

const verfiyDigitalSlice = createSlice({
  name: 'postVerfiyDigital',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postVerfiyDigital.pending, (state, action) => {
      state.verfiyDigitalLoader = true;
    }),
      builder.addCase(postVerfiyDigital.fulfilled, (state, action) => {
        state.verfiyDigitalLoader = false;
        if (action.payload && action.payload.res) {
          state.verfiyDigital = action.payload.res;
        }
      }),
      builder.addCase(postVerfiyDigital.rejected, (state, action) => {
        state.verfiyDigitalLoader = false;
        state.error = true;
      });
  },
});

export default verfiyDigitalSlice.reducer;
