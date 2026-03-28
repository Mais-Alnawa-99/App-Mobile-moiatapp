import {createSlice} from '@reduxjs/toolkit';

interface modalSliceType {
  modalVisible: boolean;
  title: '';
  message: '';
  fun: any;
  hideCancel: boolean;
  hideConfirm: boolean;
  CustomView: any;
  showClose: boolean;
  titleConfirm: '';
  minHeight: string;
}
const initialState: modalSliceType = {
  modalVisible: false,
  title: '',
  message: '',
  fun: '',
  hideCancel: false,
  CustomView: false,
  hideConfirm: false,
  showClose: false,
  titleConfirm: '',
  minHeight: '25%',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalData: (state, action) => {
      state.modalVisible = true;
      state.title = action.payload?.title;
      state.message = action.payload?.message;
      state.fun = action.payload?.fun;
      state.hideCancel = action.payload?.hideCancel;
      state.CustomView = action.payload?.CustomView;
      state.hideConfirm = action.payload?.hideConfirm;
      state.showClose = action.payload?.showClose;
      state.titleConfirm = action.payload?.titleConfirm;
      state.minHeight = action.payload?.minHeight;
    },
    hideModal: state => {
      state.modalVisible = false;
      state.title = '';
      state.message = '';
      state.fun = '';
      state.hideCancel = false;
      state.CustomView = false;
      state.hideConfirm = false;
      state.showClose = false;
      state.titleConfirm = '';
      state.minHeight = '';
    },
  },
});

export const {setModalData, hideModal} = modalSlice.actions;
export default modalSlice.reducer;
