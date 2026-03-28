import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  hideBack: false,
  content: null, // This will hold the custom children
};

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openBottomSheet: (state, action) => {
      state.isVisible = true;
      state.content = action.payload.content; // Payload can be React components
      state.hideBack = action.payload.hideBack
        ? action.payload.hideBack
        : false;
    },
    closeBottomSheet: state => {
      state.isVisible = false;
      state.content = null;
    },
  },
});

export const {openBottomSheet, closeBottomSheet} = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
