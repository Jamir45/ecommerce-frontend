import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../App';
import { processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Shop/Cart/Cart';
import ReviewProduct from './ReviewProduct';
import { useAuth } from '../UseAuth/useAuth';
import './Review.css'

const Review = () => {
   const auth = useAuth()
   const cart = auth.cart
   const setCart = auth.setCart
   const setAddToCartEvent = auth.setAddToCartEvent

   // Remove product form cart
   const removeToCartHandler = (productId) => {
      // const cartProduct  = store.productData.filter( pd => pd.key !== key)
      // const cartItem = [...store.addToCartEvent, cartProduct]
      // store.setAddToCartEvent(cartItem)
      // removeFromDatabaseCart(key)
      console.log(productId)
      
      fetch('http://localhost:3005/delete-cart-product', {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'authorization': sessionStorage.getItem('userToken')
         },
         body: JSON.stringify({productId})
      })
      .then(response => response.json())
      .then(result =>{ 
         console.log(result)
         if (result) {
            const cartProduct = cart.filter(item => item._id !== result._id)
            console.log(cartProduct)
            setCart(cartProduct)
         }
      })
   }

   // Place Order Handler
   const [orderPlaced, setOrderPlaced] = useState(false)
   const placeOrderHandler = () => {
      setAddToCartEvent([])
      processOrder()
      setOrderPlaced(true)
   }

   return (
      <div className="container">
         <div className="row">
            {auth.toastMessage()}
            <div className="col-4">
               <Cart
                  placeOrderHandler={placeOrderHandler}
                  button={false}
               ></Cart>
            </div>
            <div className='col-8'>
               <div className="row">
               {
                  cart && cart.length ? <>
                  {
                     cart.map(data => <ReviewProduct
                        key={data.key}
                        product={data}
                        removeToCartHandler={removeToCartHandler}
                        addToCartButton={false}
                        >
                        </ReviewProduct>)
                  }
                  </> : <div className="text-center">
                     <h3 className="mt-5">You don't have any product.</h3>
                     <Link to="/"><p>Please Continue Shopping</p></Link>
                  </div>
               }
               </div>
            </div>
         </div>
      </div>
   );
};

export default Review;