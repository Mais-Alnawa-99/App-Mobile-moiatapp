import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {open: boolean; token?: string};
const initialState: State = {open: false, token: undefined};

const customerPulseModalSlice = createSlice({
  name: 'customerPulseModal',
  initialState,
  reducers: {
    openCustomerPulse(
      state,
      action: PayloadAction<{token?: string} | undefined>,
    ) {
      state.open = true;
      state.token = action?.payload?.token;
    },
    closeCustomerPulse(state) {
      state.open = false;
      state.token = undefined;
    },
  },
});

export const {openCustomerPulse, closeCustomerPulse} =
  customerPulseModalSlice.actions;
export default customerPulseModalSlice.reducer;
