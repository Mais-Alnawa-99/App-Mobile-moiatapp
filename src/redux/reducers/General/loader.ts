import {createSlice} from '@reduxjs/toolkit';

const loaderStatusSlice = createSlice({
  name: 'loader',
  initialState: {
    loading: true,
    loadingService: false,
    loadingModal: false,
    loadingApplication:false,
  },
  reducers: {
    setLoaderStatus: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingService: (state, action) => {
      state.loadingService = action.payload;
    },
    setLoadingModal: (state, action) => {
      state.loadingModal = action.payload;
    },
     setLoadingApplication: (state, action) => {
      state.loadingApplication = action.payload;
    },
  },
});

export const {setLoaderStatus, setLoadingService, setLoadingModal,setLoadingApplication} =
  loaderStatusSlice.actions;
export default loaderStatusSlice.reducer;
