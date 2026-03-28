import {createSlice} from '@reduxjs/toolkit';

const favouriteServices = createSlice({
  name: 'favouriteServices',
  initialState: {
    favouriteServices: [],
  },
  reducers: {
    setFavouriteServices: (state, action) => {
      const exists = state.favouriteServices.find(
        (item: any) => item.Id === action.payload.Id,
      );
      if (!exists) {
        state.favouriteServices.push(action.payload);
      } else {
        state.favouriteServices = state.favouriteServices.filter(
          (item: any) => item.Id !== action.payload.Id,
        );
      }
    },
    setFavouriteServicesAll: (state, action) => {
      const incoming = Array.isArray(action.payload) ? action.payload : [];
      if (!incoming.length) return;
      state.favouriteServices = Array.from(incoming) || [];
    },
    clearFavouriteServices: state => {
      state.favouriteServices = [];
    },
  },
});

export const {
  setFavouriteServices,
  clearFavouriteServices,
  setFavouriteServicesAll,
} = favouriteServices.actions;
export default favouriteServices.reducer;
