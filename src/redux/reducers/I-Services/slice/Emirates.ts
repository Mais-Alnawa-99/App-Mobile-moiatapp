// store/emirate/emirateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Emirate {
  id: number | string;
  name: string;
  [key: string]: any; // extendable if needed
}

interface EmirateState {
  list: Emirate[];
  selected?: Emirate | null;
}

const initialState: EmirateState = {
  list: [],
  selected: null,
};

const emirateSlice = createSlice({
  name: 'emirate',
  initialState,
  reducers: {
    setEmirates: (state, action: PayloadAction<Emirate[]>) => {
      state.list = action.payload;
    },
    setSelectedEmirate: (state, action: PayloadAction<Emirate | null>) => {
      state.selected = action.payload;
    },
    clearEmirates: (state) => {
      state.list = [];
      state.selected = null;
    },
  },
});

export const {
  setEmirates,
  setSelectedEmirate,
  clearEmirates,
} = emirateSlice.actions;

export default emirateSlice.reducer;
