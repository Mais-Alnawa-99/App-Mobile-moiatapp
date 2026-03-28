import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';

interface CategoryState {
  list: any[]; 
}

const initialState: CategoryState = {
  list: [],

};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload;
        
    },
    clearCategories: (state) => {
      state.list = [];
    },
  },
});

export const { setCategories, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
