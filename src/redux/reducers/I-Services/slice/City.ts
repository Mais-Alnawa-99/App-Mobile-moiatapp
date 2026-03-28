// store/city/citySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
  list: any[]; // you can define a proper City interface if needed
}

const initialState: CityState = {
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload;
    },
    clearCities: (state) => {
      state.list = [];
    },
  },
});

export const { setCities, clearCities } = citySlice.actions;
export default citySlice.reducer;
