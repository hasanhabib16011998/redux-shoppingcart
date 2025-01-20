import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import { productsAPI } from './productAPI';

const store = configureStore({
    reducer: {
        products: productsReducer,
        [productsAPI.reducerPath]: productsAPI.reducer
    },
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare().concat(productsAPI.middleware),
  });

export default store;
