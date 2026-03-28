import {createSlice} from '@reduxjs/toolkit';
import {getLookupValues} from '../thunk/lookup';
import {Alert} from 'react-native';

const initialState = {
  servicesCat: {},
  mediaCat: {},
  isLoading: true,
};

const lookupsValuesSlice = createSlice({
  name: 'lookupsValues',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLookupValues.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(getLookupValues.fulfilled, (state, action) => {
        if (action.meta.arg == 5) {
          state.servicesCat = action.payload;
        }
        if (action.meta.arg == 9) {
          state.mediaCat = action.payload;
        }
        state.isLoading = false;
      }),
      builder.addCase(getLookupValues.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default lookupsValuesSlice.reducer;
