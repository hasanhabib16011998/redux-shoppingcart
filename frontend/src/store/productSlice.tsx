import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types for the product item and state
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

interface ProductsState {
  items: Product[];
  status: 'loading' | 'succeeded' | 'failed' | null; // Status can be one of these states
}

// Define the initial state with correct types
const initialState: ProductsState = {
  items: [],
  status: null,
};

// Async thunk to fetch products
export const productsFetch = createAsyncThunk('products/productsFetch', async () => {
  const response = await axios.get('http://localhost:3000/products');
  return response.data;
});

// Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Optional reducers for manual state updates (if necessary in the future)
    // addItem: (state, action: PayloadAction<Product>) => {
    //   state.items.push(action.payload);
    // },
    // setStatus: (state, action: PayloadAction<'loading' | 'succeeded' | 'failed' | null>) => {
    //   state.status = action.payload;
    // },
  },
  extraReducers: {
    [productsFetch.pending]: (state) => {
      state.status = 'loading';
    },
    [productsFetch.fulfilled]: (state, action: PayloadAction<Product[]>) => {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

// Export the actions (if you need them)

// Export the reducer to be used in the store
export default productSlice.reducer;
