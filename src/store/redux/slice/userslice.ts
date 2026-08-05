import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types';

const initialState: User = {
  uid: '',
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
    addName: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, addName, clearUser } = userSlice.actions;

export default userSlice.reducer;
