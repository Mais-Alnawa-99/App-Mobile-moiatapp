// store/area/areaSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AreaState {
  list: any[];
}

const initialState: AreaState = {
  list: [],
};

const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    setAreas: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload;
    },
    clearAreas: (state) => {
      state.list = [];
    },
  },
});

export const { setAreas, clearAreas } = areaSlice.actions;
export default areaSlice.reducer;
