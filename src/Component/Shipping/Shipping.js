import { Button } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useAuth } from '../UseAuth/useAuth';
import './Shipping.css'
import ShippingForm from './ShippingForm';
import { toast } from 'react-toastify';

const Shipping = () => {
   const auth = useAuth();
   const cart = auth.cart
   const setCart = auth.setCart

   const totalPrice = cart && cart.reduce((initialValue, cartProduct) => initialValue+parseFloat(cartProduct.price*cartProduct.quantity), 0)
   const price = totalPrice.toFixed(2)

   let shipping = 0;
   if (totalPrice > 1 && totalPrice < 300 ) {
      shipping = 10
   }else if (totalPrice > 301 && totalPrice < 500 ) {
      shipping = 15
   }else if (totalPrice > 501 && totalPrice < 800 ) {
      shipping = 20
   }else {
      shipping = 0
   }

   const vat = parseFloat(totalPrice * 2 / 100).toFixed(2)
   const totalAmount = parseFloat(totalPrice + shipping + vat).toFixed(2)
   const totalItem = auth.cart && auth.cart.length

   const cost = {totalItem, productPrice:parseFloat(price), shippingCharge:shipping, tax:parseFloat(vat), totalAmount:parseFloat(totalAmount)}

   const [formData, setFormData] = useState(null)
   const placeholder = () => {
      console.log({user:auth.user, shipping:formData, products:auth.cart, cost})

      fetch('http://localhost:3005/place-order', {
         method:'POST',
         headers:{
            'Content-Type':'application/json',
            'authorization': sessionStorage.getItem('userToken')
         },
         body:JSON.stringify({user:auth.user, shipping:formData, products:auth.cart, cost})
      })
      .then(res => res.json())
      .then(result => {
         console.log(result)
         toast.success(result.success)
         setCart([])
         if (result.success) {
            localStorage.removeItem('cartProduct')
            window.location.pathname = "/profile"
         }
      })
      
   }

   return (
      <div className="container">
         {auth.toastMessage()}
         <div className="row">
            <div className="col-md-6">
               <ShippingForm setFormData={setFormData}></ShippingForm>
            </div>
            <div className="col-md-6 p-3 my-5 card">
               <div className='text-center'>
                  <h4 className="heading">Your Selected Product</h4>
               </div>
               {
                  auth.cart && auth.cart.map(cartFood => {
                     const {name, price, img, quantity} = cartFood
                     return(
                     <div className="cartFood row align-items-center">
                        <div className="col-4">
                           <img className="img-fluid" src={img} alt=""/>
                        </div>
                        <div className="col-8">
                           <p> <b>Name : </b> {name.length > 70 ? `${name.slice(0, 70)}...` : name} </p>                           <p> <b>Price : $</b> {price} </p>
                           <p> <b>Quantity : </b> {quantity} </p>
                        </div>
                     </div>
                     )
                  })
               }
               <div className='text-center'>
                  {
                     formData ? <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => placeholder()}
                     >
                        Place Order
                     </Button> : <Button 
                        variant="contained" 
                        color="primary" 
                        disabled
                     >
                        Place Order
                     </Button>
                  }
               </div>
            </div>
         </div>
      </div>
   );
};

export default Shipping;