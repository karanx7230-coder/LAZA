import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../../types';

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    clearOrders: state => {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
