import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slice/userslice';

export const store = configureStore({
  reducer: {
    userreducer: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
