import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';
// Define the type for a cart item
interface CartItems {
  id: string; // You can adjust the fields based on your data structure
  name: string;
  price: number;
  quantity: number;
}

// Define the initial state type
interface CartState {
  cartItems: CartItems[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

// Define the initial state
const initialState: CartState = {
    cartItems: (() => {
        try {
          return localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems")!)
            : [];
        } catch {
          return [];
        }
      })(),
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItems>) {
        const itemIndex = state.cartItems.findIndex(
            (item) => item.id ===action.payload.id
        );
        if (itemIndex >= 0){
            state.cartItems[itemIndex].quantity += 1;
            toast.info(`Added another ${action.payload.name} to your cart`,{
                position:"bottom-left"
            })
        }
        else{
            const tempProduct = { ...action.payload, quantity :1};
            state.cartItems.push(tempProduct);
            toast.success(`Added ${action.payload.name} to cart`,{
                position:"bottom-left"
            })
        }

        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
    removeFromCart(state, action: PayloadAction<CartItems>){
        const nextCartItem = state.cartItems.filter(
            cartItem => cartItem.id !== action.payload.id
        )
        state.cartItems = nextCartItem;
    }
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
