import {createSlice} from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'auth',
  initialState: {
    token: false,
    refreshToken: false,
    isLoggedIn: false,
    authenticatedUser: null,
    userName: false,
    userNameAR: false,
    userNameEN: false,
    expiryDate: false,
  },
  reducers: {
    setAuthValues: (state, action) => {
      state.token = action.payload?.token;
      state.isLoggedIn = true;
      state.authenticatedUser =
        action.payload && action.payload?.authontcatedUser;
      state.refreshToken = action.payload?.refreshToken;
      state.userName = action.payload?.userName;
      state.expiryDate = action.payload?.expiryDate;
    },
    setUserName: (state, action) => {
      state.userNameAR = action.payload?.userNameAR;
      state.userNameEN = action.payload?.userNameEN;
    },
    clearAuthValues: state => {
      state.token = false;
      state.isLoggedIn = false;
      state.authenticatedUser = null;
      state.refreshToken = false;
      state.userName = false;
      state.expiryDate = false;
      state.userNameAR = false;
      state.userNameEN = false;
    },
  },
});

export const {setAuthValues, clearAuthValues, setUserName} = auth.actions;
export default auth.reducer;
