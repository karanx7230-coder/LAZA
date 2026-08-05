import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem } from '../../../types';

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existing = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existing) {
        state.items = state.items.filter(
          item => item.id !== action.payload.id,
        );
      } else {
        state.items.push({ ...action.payload });
      }
    },
    clearWishlist: state => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
