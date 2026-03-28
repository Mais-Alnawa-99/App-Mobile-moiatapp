import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface AuthCode {
  authCode: string;
}

const initialState: AuthCode = {
  authCode: '',
};

export const uaePassAuthCode = createSlice({
  name: 'uaePassAuthCode',
  initialState,
  reducers: {
    saveAuthCode: (state, action: PayloadAction<string>) => {
      state.authCode = action.payload;
    },
  },
});

export const {saveAuthCode} = uaePassAuthCode.actions;

export default uaePassAuthCode.reducer;
