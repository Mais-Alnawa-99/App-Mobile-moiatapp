import {createSlice} from '@reduxjs/toolkit';

const tokenPayload = createSlice({
  name: 'tokenPayload',
  initialState: {
    tokenPayload: null,
  },
  reducers: {
    setTokenPayload: (state, action) => {
      state.tokenPayload = action.payload?.tokenPayload;
    },

    clearTokenPayload: state => {
      state.tokenPayload = null;
    },
  },
});

export const {setTokenPayload, clearTokenPayload} = tokenPayload.actions;
export default tokenPayload.reducer;
