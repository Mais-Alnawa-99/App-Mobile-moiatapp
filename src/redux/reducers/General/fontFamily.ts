import {createSlice} from '@reduxjs/toolkit';
import reactotron from '../../reactotron';

const fontFamily = createSlice({
  name: 'fontFamily',
  initialState: {
    fontFamilyValue: false,
    selectedFontFamily: false,
  },
  reducers: {
    setFontFamilyValue: (state, action) => {
      state.fontFamilyValue = action.payload;
      state.selectedFontFamily = true;
    },
  },
});

export const {setFontFamilyValue} = fontFamily.actions;
export default fontFamily.reducer;
