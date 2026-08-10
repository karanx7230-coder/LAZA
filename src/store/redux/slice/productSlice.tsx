import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { Product } from '../../../types';
import { RootState } from '../store/store';
interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  isOffline: boolean;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  lastUpdated: null,
  isOffline: false,
};

export const loadProducts = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>('products/load', async (_, { getState, rejectWithValue }) => {
  const netState = await NetInfo.fetch();
  const isConnected = !!netState.isConnected && !!netState.isInternetReachable;

  if (!isConnected) {
    const cached = getState().products.products;
    if (cached.length > 0) {
      return cached; 
    }
    return rejectWithValue('OFFLINE_NO_CACHE');
  }

  try {
    const res = await axios.get('https://dummyjson.com/products?limit=0');
    return res.data.products as Product[];
  } catch (err) {
    const cached = getState().products.products;
    if (cached.length > 0) {
      return cached;
    }
    return rejectWithValue('FETCH_FAILED');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    Setproduct: (state, action: PayloadAction<Product>) => {
      state.products = [action.payload, ...state.products];
    },
    setOfflineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffline = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load products';
      });
  },
});

export const { Setproduct, setOfflineStatus } = productsSlice.actions;

export default productsSlice.reducer;
