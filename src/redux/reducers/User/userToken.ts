import {createSlice} from '@reduxjs/toolkit';

const userToken = createSlice({
  name: 'userToken',
  initialState: {
    tokenData: null,
    userHasProfiles: null,
    expiresIn : new Date().toISOString()
  },
  reducers: {
    setTokenData: (state, action) => {
      state.tokenData = action.payload?.tokenData;
        state.expiresIn = (new Date(
        Date.now() + (action.payload?.tokenData?.expires_in-60) * 1000).toISOString()
      );
    },
    clearTokenValues: state => {
      state.tokenData = null;
    },
    setUserHasProfiles: (state, action) => {
      state.userHasProfiles = action.payload?.userHasProfiles;
    },
  },
});

export const {setTokenData, clearTokenValues, setUserHasProfiles} =
  userToken.actions;
export default userToken.reducer;
