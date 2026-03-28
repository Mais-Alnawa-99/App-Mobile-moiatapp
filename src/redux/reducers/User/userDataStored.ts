import {createSlice} from '@reduxjs/toolkit';

const userDataStored = createSlice({
  name: 'userDataStored',
  initialState: {
    userData: null,
  },
  reducers: {
    setUserDataStored: (state, action) => {
      state.userData = action.payload?.userData;
    },

    clearUserDataStoredValues: state => {
      state.userData = null;
    },
  },
});

export const {setUserDataStored, clearUserDataStoredValues} =
  userDataStored.actions;
export default userDataStored.reducer;
