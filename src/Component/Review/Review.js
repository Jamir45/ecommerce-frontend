import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Shop/Cart/Cart';
import ReviewProduct from './ReviewProduct';
import { useAuth } from '../UseAuth/useAuth';
import './Review.css'

const Review = () => {
   const auth = useAuth()
   const cart = auth.cart
   const setCart = auth.setCart

   // Remove product form cart
   const removeToCartHandler = (productId, key) => {
      const savedProduct = JSON.parse(localStorage.getItem('cartProduct'));
      const removeItem = savedProduct.filter(item => item.key !== key)
      removeItem && localStorage.setItem('cartProduct', JSON.stringify(removeItem));
      setCart(removeItem)
      
      // fetch('https://mern-ecommerce-backend-server.herokuapp.com/delete-cart-product', {
      //    method: 'DELETE',
      //    headers: {
      //       'Content-Type': 'application/json',
      //       'authorization': sessionStorage.getItem('userToken')
      //    },
      //    body: JSON.stringify({productId})
      // })
      // .then(response => response.json())
      // .then(result =>{ 
      //    console.log(result)
      //    if (result) {
      //       const cartProduct = cart.filter(item => item._id !== result._id)
      //       console.log(cartProduct)
      //       setCart(cartProduct)
      //    }
      // })
   }

   return (
      <div className="container">
         <div className="row">
            {auth.toastMessage()}
            <div className="col-4">
               <Cart
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