import {createSlice} from '@reduxjs/toolkit';

const fontSize = createSlice({
  name: 'fontSize',
  initialState: {
    fontSizeValue: 0,
    selectedFontSize: false,
  },
  reducers: {
    setFontValue: (state, action) => {
      state.fontSizeValue = action.payload;
      state.selectedFontSize = true;
    },
  },
});

export const {setFontValue} = fontSize.actions;
export default fontSize.reducer;
