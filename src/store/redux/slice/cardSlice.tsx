import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Card {
  owner: string;
  card_number: string;
  exp: string;
  cvv: string;
}

const cardSlice = createSlice({
  name: 'card',
  initialState: null as Card | null,
  reducers: {
    setcard: (_state, action: PayloadAction<Card>) => action.payload,
    clearcard: () => null,
  },
});

export const { setcard, clearcard } = cardSlice.actions;
export default cardSlice.reducer;