import {createSlice} from '@reduxjs/toolkit';

const securityAuth = createSlice({
  name: 'securityAuth',
  initialState: {
    authenticated: true,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const {setAuthenticated} = securityAuth.actions;
export default securityAuth.reducer;
