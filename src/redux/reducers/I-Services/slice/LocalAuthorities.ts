// store/localAuthority/localAuthoritySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocalAuthority {
  id: number | string;
  name: string;
  [key: string]: any; // additional fields flexibility
}

interface LocalAuthorityState {
  list: LocalAuthority[];
  selected?: LocalAuthority | null;
}

const initialState: LocalAuthorityState = {
  list: [],
  selected: null,
};

const localAuthoritySlice = createSlice({
  name: 'localAuthority',
  initialState,
  reducers: {
    setLocalAuthorities: (state, action: PayloadAction<LocalAuthority[]>) => {
      state.list = action.payload;
    },
    setSelectedLocalAuthority: (state, action: PayloadAction<LocalAuthority | null>) => {
      state.selected = action.payload;
    },
    clearLocalAuthorities: (state) => {
      state.list = [];
      state.selected = null;
    },
  },
});

export const {
  setLocalAuthorities,
  setSelectedLocalAuthority,
  clearLocalAuthorities,
} = localAuthoritySlice.actions;

export default localAuthoritySlice.reducer;
