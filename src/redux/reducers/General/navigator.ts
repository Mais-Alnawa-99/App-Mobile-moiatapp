import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {stackIndex: 0},
  reducers: {
    setStackIndex: (state, action: PayloadAction<number>) => {
      state.stackIndex = action.payload;
    },
  },
});

export const {setStackIndex} = navigationSlice.actions;
export default navigationSlice.reducer;
