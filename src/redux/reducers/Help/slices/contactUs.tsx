import {createSlice} from '@reduxjs/toolkit';
import {getContactUs} from '../thunk/thunk';

const initialState = {
  details: [],
  isLoading: true,
};

const contactUs = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getContactUs.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(getContactUs.fulfilled, (state, action) => {
        state.details = action.payload.value;
        state.isLoading = false;
      }),
      builder.addCase(getContactUs.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default contactUs.reducer;
