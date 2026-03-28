import {createSlice} from '@reduxjs/toolkit';

const userToken = createSlice({
  name: 'signUpToken',
  initialState: {
    data: null,
    expiresIn: new Date().toISOString(),
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.expiresIn = (new Date(
        Date.now() + (action.payload?.expires_in-60) * 1000).toISOString()
      );
    },
    clearDataValues: state => {
      state.data = null;
    },
  },
});

export const {setData, clearDataValues} = userToken.actions;
export default userToken.reducer;
