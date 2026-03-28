import {createSlice} from '@reduxjs/toolkit';

const serverStatusSlice = createSlice({
  name: 'serverStatus',
  initialState: {
    isOnline: true,
    needRefreshToken: false,
    ilNeedUserId: false,
  },
  reducers: {
    setServerStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    setNeedRefreshToken: (state, action) => {
      state.needRefreshToken = action.payload;
    },
    setILNeedUserId: (state, action) => {
      state.ilNeedUserId = action.payload;
    },
  },
});

export const {setServerStatus, setNeedRefreshToken, setILNeedUserId} =
  serverStatusSlice.actions;
export default serverStatusSlice.reducer;
