// store/country/countrySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Country {
  id: number | string;
  name: string;
  [key: string]: any; // for flexibility if your object has more fields
}

interface CountryState {
  list: Country[];
  selected?: Country | null;
}

const initialState: CountryState = {
  list: [],
  selected: null,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.list = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<Country | null>) => {
      state.selected = action.payload;
    },
    clearCountries: (state) => {
      state.list = [];
      state.selected = null;
    },
  },
});

export const { setCountries, setSelectedCountry, clearCountries } = countrySlice.actions;
export default countrySlice.reducer;
