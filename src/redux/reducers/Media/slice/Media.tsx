import {createSlice} from '@reduxjs/toolkit';
import {searchMedia} from '../thunk/media';
import {removeDuplicatesByKey} from '../../../../component/Generalfunction';

const initialState = {
  mediaData: [],
  homeMediaData: [],
  searchMedieData: [],
  isLoading: true,
  isLoadingMore: true,
  skip: 0,
  top: 10,
  count: 0,
};

const media = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchMedia.pending, (state, action) => {
      if (action.meta.arg.Skip == 0) {
        state.isLoading = true;
        state.skip = 0;
        state.mediaData = [];
      } else {
        state.isLoadingMore = true;
      }
    }),
      builder.addCase(searchMedia.fulfilled, (state, action) => {
        if (action.meta.arg.Skip === 0) {
          state.mediaData = action.payload.value;
        } else {
          let oldData = [...state.mediaData, ...action.payload.value];
          let newData = removeDuplicatesByKey(oldData, 'Id');
          state.mediaData = newData;
        }
        state.isLoading = false;
        state.isLoadingMore = false;
        state.skip += state.top;
        state.count = action.payload.count;
        if (action.meta.arg.home) {
          state.homeMediaData = action.payload.value;
        }
        if (action.meta.arg.Top == 3) {
          state.searchMedieData = action.payload.value;
        }
      }),
      builder.addCase(searchMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = true;
      });
  },
});

export default media.reducer;
