import {createSlice} from '@reduxjs/toolkit';

interface CartItem {
  RecordId: number;
  AbstractArabic?: string;
  AbstractEnglish?: string;
  DocumentStatus?: string;
  ICSNumber?: string;
  LegalStatus?: string;
  PublishDate?: string;
  StandardNumber?: string;
  StandardType?: string;
  StandardTypeId?: number;
  StandardVersions?: string;
  StandardYear?: number;
  TitleArabic?: string;
  TitleEnglish?: string;
  versionRecordId?: string;
}

interface CartState {
  cartItems: CartItem[];
}
const initialState: CartState = {
  cartItems: [],
};

const cartItems = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newItem = action.payload;
      const exists = state.cartItems?.some(
        (item: any) =>
          item?.RecordId === newItem.RecordId &&
          item?.versionRecordId === newItem.versionRecordId,
      );
      if (!exists) {
        state.cartItems.push(newItem);
      }
    },

    removeCartItem: (state, action) => {
      const {RecordId, versionRecordId} = action.payload;
      state.cartItems = state.cartItems.filter(
        (item: any) =>
          !(
            item.RecordId === RecordId &&
            item.versionRecordId === versionRecordId
          ),
      );
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload?.items || [];
    },

    clearCartItems: state => {
      state.cartItems = [];
    },
  },
});

export const {addCartItem, removeCartItem, setCartItems, clearCartItems} =
  cartItems.actions;
export default cartItems.reducer;
