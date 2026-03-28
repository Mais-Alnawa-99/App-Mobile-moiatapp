import {createSlice} from '@reduxjs/toolkit';

const userILData = createSlice({
  name: 'userILData',
  initialState: {
    userILData: null,
    userId: '',
  },
  reducers: {
    setUserILData: (state, action) => {
      state.userILData = action.payload?.userILData;
    },
    setUserILID: (state, action) => {
      state.userId = action.payload?.userId;
    },

    clearUserILDataValues: state => {
      state.userILData = null;
      state.userId = '';
    },
  },
});

export const {setUserILData, clearUserILDataValues, setUserILID} =
  userILData.actions;
export default userILData.reducer;
