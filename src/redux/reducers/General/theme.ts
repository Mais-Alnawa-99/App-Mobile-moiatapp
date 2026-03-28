import {createSlice} from '@reduxjs/toolkit';

const theme = createSlice({
  name: 'theme',
  initialState: {
    theme: 'brown',
    selectedTheme: false,
  },
  reducers: {
    setThemeValue: (state, action) => {
      state.theme = action.payload;
      state.selectedTheme = true;
    },
    clearThemeValue: state => {
      state.theme = 'brown';
      state.selectedTheme = false;
    },
  },
});

export const {setThemeValue, clearThemeValue} = theme.actions;
export default theme.reducer;
