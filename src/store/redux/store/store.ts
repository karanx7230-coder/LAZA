import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  type PersistedState,
} from 'redux-persist';
import userReducer from '../slice/userslice';
import cartReducer from '../slice/cartSlice';
import wishlistReducer from '../slice/wishlistSlice';
import ordersReducer from '../slice/ordersSlice';
import addressReducer from '../slice/adressSlice';
import productsReducer from '../slice/productSlice'; // TODO: rename file to productsSlice.ts for consistency, then update this path

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['userreducer', 'cart', 'wishlist', 'address', 'orders', 'products'],
  migrate: (state: PersistedState) => Promise.resolve(state),
};

const rootReducer = combineReducers({
  userreducer: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
  address: addressReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;