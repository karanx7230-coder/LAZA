import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types';

const API = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
export const api2 = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),

    getProduct: builder.query<Product, string>({
      query: productId => `/products/${productId}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = api2;
