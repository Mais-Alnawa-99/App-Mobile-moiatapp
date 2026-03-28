import {createSlice} from '@reduxjs/toolkit';

const selectedService = createSlice({
  name: 'selectedService',
  initialState: {
    item: null,
  },
  reducers: {
    setSelectedService: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const {setSelectedService} = selectedService.actions;
export default selectedService.reducer;
