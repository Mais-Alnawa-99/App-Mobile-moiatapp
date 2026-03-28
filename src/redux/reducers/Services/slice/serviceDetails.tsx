import {createSlice} from '@reduxjs/toolkit';
import {getService} from '../thunk/services';

const initialState = {
  details: [],
  isLoading: true,
};

const serviceDetails = createSlice({
  name: 'serviceDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getService.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(getService.fulfilled, (state, action) => {
        state.details =
          action.payload.value.length != 0 && action.payload.value[0];
        state.isLoading = false;
      }),
      builder.addCase(getService.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default serviceDetails.reducer;
