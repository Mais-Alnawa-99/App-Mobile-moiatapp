import {createSlice} from '@reduxjs/toolkit';
import {getFAQs} from '../thunk/faqs';

const initialState = {
  faqs: [],
  isLoading: true,
};

const faqs = createSlice({
  name: 'faqs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFAQs.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(getFAQs.fulfilled, (state, action) => {
        state.faqs = action.payload.value;
        state.isLoading = false;
      }),
      builder.addCase(getFAQs.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default faqs.reducer;
