import React from 'react';
import {productsAPI, useGetAllProductsQuery} from '../store/productAPI';
import store from '../store/store'
import { useNavigate } from "react-router-dom"; // Updated import
import {useDispatch,useSelector} from "react-redux";
import { addToCart,getTotal } from '../store/cartSlice';

const Home: React.FC = () => {
  const {data,error,isLoading} = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state)=>state.auth);
  console.log(auth);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  }
  store.dispatch(getTotal());

  
  return (
    <div className='home-container'>
      {isLoading? (
        <p>Loading...</p>
      ) : error?(
        <p>An error occured</p>
      ) : (
        <>
        <h2>New Arrivals</h2>
        <div className='products'>
          {data?.map( product => 
          <div key={product.id} className='product'>
            <h3>{product.name}</h3>
            <img src={product.imageUrl} alt={product.name}/>
            <div className='details'>
              <span>{product.description}</span>
              <span className='price'>${product.price}</span>
            </div>
            <button onClick={()=> handleAddToCart(product)}>Add to Cart</button>
          </div>
          )}
        </div>
        </>
      )}
        
    </div>
  );
};



export default Home;
