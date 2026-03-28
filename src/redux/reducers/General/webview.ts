import {createSlice} from '@reduxjs/toolkit';

const webview = createSlice({
  name: 'loader',
  initialState: {
    url: false,
  },
  reducers: {
    setWebviewUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const {setWebviewUrl} = webview.actions;
export default webview.reducer;
