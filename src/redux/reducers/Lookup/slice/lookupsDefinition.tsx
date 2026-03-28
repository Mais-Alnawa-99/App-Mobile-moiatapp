import {createSlice} from '@reduxjs/toolkit';
import {getLookupsDefinition} from '../thunk/lookup';
import {Alert} from 'react-native';

const initialState = {
  data: {},
};

const lookupsDefinitionSlice = createSlice({
  name: 'lookupsDefinition',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLookupsDefinition.pending, (state, action) => {}),
      builder.addCase(getLookupsDefinition.fulfilled, (state, action) => {
        state.data = action.payload;
      }),
      builder.addCase(getLookupsDefinition.rejected, (state, action) => {});
  },
});

export default lookupsDefinitionSlice.reducer;
