import {createSlice} from '@reduxjs/toolkit';
import {getUaePassToken} from '../thunk/uaePass';

interface TokenType {
  accessTokenData: string;
  accessTokenLoader: boolean;
  error: boolean;
}

const initialState: TokenType = {
  accessTokenData: '',
  accessTokenLoader: false,
  error: false,
};

const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUaePassToken.pending, (state, action) => {
      state.accessTokenLoader = true;
    }),
      builder.addCase(getUaePassToken.fulfilled, (state, action) => {
        state.accessTokenLoader = false;
        if (action.payload && action.payload.networkSuccess) {
          state.accessTokenData = action.payload;
        }
      }),
      builder.addCase(getUaePassToken.rejected, (state, action) => {
        state.accessTokenLoader = false;
        state.error = true;
      });
  },
});

export default accessTokenSlice.reducer;
