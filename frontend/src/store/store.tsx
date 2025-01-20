import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import { productsAPI } from './productAPI';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        [productsAPI.reducerPath]: productsAPI.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare().concat(productsAPI.middleware),
  });

export default store;
