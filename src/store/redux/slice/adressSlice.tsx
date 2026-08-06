import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Address {
  name: string;
  city: string;
  country: string;
  phone: string;
  fulladdress: string;
  isprimary: boolean;
}

const initialState: Address | null = null;

const addressSlice = createSlice({
  name: 'address',
  initialState: null as Address | null,
  reducers: {
    setAddress: (_state, action: PayloadAction<Address>) => action.payload,
    clearAddress: () => null,
  },
});

export const { setAddress, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;
