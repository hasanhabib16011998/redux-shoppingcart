import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Define a reducer to add items (example)
    addItem: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    setStatus: (state, action: PayloadAction<'loading' | 'succeeded' | 'failed' | null>) => {
      state.status = action.payload;
    },
  },
});

// Export the actions
export const { addItem, setStatus } = productSlice.actions;

// Export the reducer to be used in the store
export default productSlice.reducer;
