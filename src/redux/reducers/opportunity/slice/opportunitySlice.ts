import {createSlice} from '@reduxjs/toolkit';
import {getOpportunitiesSchema} from '../thunk/opportunityThunk';

const initialState = {
  info: null,
  fields: [],
  actions: [],
  infoLoader: false,
  error: false,
  errorMessage: '',
};

const opportunitiesInfoSlice = createSlice({
  name: 'opportunitiesInfo',
  initialState,
  reducers: {
    clearOpportunitySchema: state => {
      state.info = null;
      state.fields = [];
      state.actions = [];
      state.error = false;
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(getOpportunitiesSchema.pending, state => {
      state.infoLoader = true;
      state.error = false;
      state.errorMessage = '';
    });

    builder.addCase(getOpportunitiesSchema.fulfilled, (state, action) => {
      state.infoLoader = false;
      state.info = action.payload;

      if (action.payload?.networkSuccess === false) {
        state.error = true;
        state.errorMessage = action.payload?.message || 'Failed to load schema';
        state.fields = [];
        state.actions = [];
        return;
      }

      const schema =
        action.payload?.Data ??
        action.payload?.result ??
        action.payload?.Result ??
        action.payload;

      state.fields = schema?.fields ?? [];
      state.actions = schema?.actions ?? [];
    });

    builder.addCase(getOpportunitiesSchema.rejected, (state, action) => {
      state.infoLoader = false;
      state.error = true;
      state.errorMessage = action.error?.message || 'Request failed';
    });
  },
});

export const {clearOpportunitySchema} = opportunitiesInfoSlice.actions;
export default opportunitiesInfoSlice.reducer;
