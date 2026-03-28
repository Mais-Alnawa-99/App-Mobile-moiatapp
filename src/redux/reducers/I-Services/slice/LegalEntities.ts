import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LegalEntity {
  id: number | string;
  name: string;
  [key: string]: any; // for additional properties if needed
}

interface LegalEntityState {
  list: LegalEntity[];
  selected?: LegalEntity | null;
}

const initialState: LegalEntityState = {
  list: [],
  selected: null,
};

const legalEntitySlice = createSlice({
  name: 'legalEntity',
  initialState,
  reducers: {
    setLegalEntities: (state, action: PayloadAction<LegalEntity[]>) => {
      state.list = action.payload;
    },
    setSelectedLegalEntity: (state, action: PayloadAction<LegalEntity | null>) => {
      state.selected = action.payload;
    },
    clearLegalEntities: (state) => {
      state.list = [];
      state.selected = null;
    },
  },
});

export const {
  setLegalEntities,
  setSelectedLegalEntity,
  clearLegalEntities,
} = legalEntitySlice.actions;

export default legalEntitySlice.reducer;
