import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './cart.css';
import { removeFromCart, decreaseCart, addToCart, clearCart, getTotal } from '../store/cartSlice';
const Cart: React.FC = () => {

  const cart = useSelector((state)=>state.cart);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getTotal());


  },[cart,dispatch])

  const handleRemoveFromCart = (cartItem) =>{
    dispatch(removeFromCart(cartItem));

  }
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  }
  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <div className='cart-container'>
        <h2>Shopping Cart</h2>
        { cart.cartItems.length === 0 ? (
          <div className='cart-empty'>
            <p>Your cart is currently empty</p>
          

            <div className='start-shopping'>
              <Link to="/">
                <FaArrowLeftLong/>
                <span className='catchy'>Start Shopping</span>
              </Link>
            </div>
          </div>
        ):(
          <div>
            <div className='titles'>
              <h3 className='product-title'>Product</h3>
              <h3 className='product-price'>Price</h3>
              <h3 className='quantity'>Quantity</h3>
              <h3 className='total'>Total</h3>
            </div>

            <div className='cart-items'>
              {cart.cartItems?.map(cartItem=>(
                <div className='cart-item' key = {cartItem.id}>
                  <div className='cart-product'>
                    <img src={cartItem.imageUrl} alt={cartItem.name}/>
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.description}</p>
                      <button onClick={()=>handleRemoveFromCart(cartItem)}>Remove</button>
                    </div>
                  </div>
                  <div className='cart-product-price'>${cartItem.price}</div>
                  <div className='cart-product-quantity'>
                    <button onClick={()=>handleDecreaseCart(cartItem)}>-</button>
                    <div className='count'>{cartItem.quantity}</div>
                    <button onClick={()=>handleIncreaseCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className='cart-summary'>
              <button className='clear-cart' onClick={()=>handleClearCart()}>Clear Cart</button>
              <div className='cart-checkout'>
                <div className='subtotal'>
                  <span>Subtotal</span>
                  <span className='amount'>${(cart.cartTotalAmount).toFixed(2)}</span>
                </div>

                <p>Taxes and shipping Calculated at checkout</p>
                <button>Check Out</button>
                <div className='start-shopping'>
                  <Link to="/">
                    <FaArrowLeftLong/>
                    <span className='catchy'>Start Shopping</span>
                  </Link>
                </div>
              </div>
            </div>


          </div>
        )}
    </div>
  );
};



export default Cart;
