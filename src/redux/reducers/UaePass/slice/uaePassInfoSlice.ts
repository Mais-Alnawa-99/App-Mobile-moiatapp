import {createSlice} from '@reduxjs/toolkit';
import {getUaePassUserInfo} from '../thunk/uaePass';

const initialState = {
  info: {},
  infoLoader: false,
  error: false,
};

const infoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUaePassUserInfo.pending, (state, action) => {
      state.infoLoader = true;
    }),
      builder.addCase(getUaePassUserInfo.fulfilled, (state, action) => {
        state.infoLoader = false;
        if (action.payload) {
          state.info = action.payload;
        }
      }),
      builder.addCase(getUaePassUserInfo.rejected, (state, action) => {
        state.infoLoader = false;
        state.error = true;
      });
  },
});

export default infoSlice.reducer;
