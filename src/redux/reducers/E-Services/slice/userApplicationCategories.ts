import {createSlice} from '@reduxjs/toolkit';
import {getUserApplicationCategories} from '../thunk/applications';

const initialState = {
  categories: [],
  isLoading: true,
};

const userApplicationCategories = createSlice({
  name: 'userApplicationCategories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserApplicationCategories.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getUserApplicationCategories.fulfilled,
        (state, action) => {
          state.categories = action.payload.networkSuccess
            ? JSON.parse(action.payload?.applicationCategories)
            : [];
          state.isLoading = false;
        },
      ),
      builder.addCase(
        getUserApplicationCategories.rejected,
        (state, action) => {
          state.isLoading = false;
        },
      );
  },
});

export default userApplicationCategories.reducer;
