import React from 'react';
import {productsAPI, useGetAllProductsQuery} from '../store/productAPI';


const Home: React.FC = () => {
  const {data,error,isLoading} = useGetAllProductsQuery()
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
            <h3>{productsAPI.name}</h3>
            <img src={product.image} alt={product.name}/>
            <div className='details'>
              <span>{product.description}</span>
              <span className='price'>${product.price}</span>
            </div>
            <button>Add to Cart</button>
          </div>
          )}
        </div>
        </>
      )}
        
    </div>
  );
};



export default Home;
