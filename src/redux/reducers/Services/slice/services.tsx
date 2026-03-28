import {createSlice} from '@reduxjs/toolkit';
import {searchServices} from '../thunk/services';
import {removeDuplicatesByKey} from '../../../../component/Generalfunction';

const initialState = {
  services: [],
  homeServices: [],
  allServices: [],
  active: {activeType: 'allServices', activeBtn: 0},
  isLoading: true,
  isLoadingMore: false,
  skip: 0,
  top: 6,
  count: 0,
};

const services = createSlice({
  name: 'serivces',
  initialState,
  reducers: {
    setActiveCat: (state, action) => {
      state.active.activeType = action.payload.activeType;
      state.active.activeBtn = action.payload.activeBtn;
    },
    setServices: (state, action) => {
      state.services = action.payload;
      state.isLoading = false;
      state.isLoadingMore = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(searchServices.pending, (state, action) => {
      if (action.meta.arg.Skip == 0) {
        state.isLoading = true;
        state.skip = 0;
        state.count = 0;
        state.services = [];
      } else {
        state.isLoadingMore =
          action.meta.arg.Top == state.count - 3 ? false : true;
      }
    }),
      builder.addCase(searchServices.fulfilled, (state, action) => {
        if (action.meta.arg.Skip === 0) {
          state.services = action.payload.value;
        } else {
          let oldData = [...state.services, ...action.payload.value];
          let newData = removeDuplicatesByKey(oldData, 'Id');
          state.services = newData;
        }
        let step = state.skip + state.top;

        if (step > action.payload.count - 5) {
          state.skip += 1;
        } else {
          state.skip += state.top;
        }
        state.isLoading = false;
        state.isLoadingMore = false;
        state.count = action.payload.count;
        if (action.meta.arg.home) {
          state.homeServices = action.payload.value;
        }
        if (action.meta.arg.Top >= 35) {
          state.allServices = action.payload.value;
        }
      }),
      builder.addCase(searchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
      });
  },
});

export const {setActiveCat, setServices} = services.actions;
export default services.reducer;
