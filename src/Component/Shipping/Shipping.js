import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useAuth } from '../UseAuth/useAuth';
import './Shipping.css'
import ShippingForm from './ShippingForm';
import { toast } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripePaymentForm from './StripePayment/StripePaymentForm';

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
   const placeholder = (paymentInfo) => {

      fetch('https://mern-ecommerce-backend-server.herokuapp.com/place-order', {
         method:'POST',
         headers:{
            'Content-Type':'application/json',
            'authorization': sessionStorage.getItem('userToken')
         },
         body:JSON.stringify({user:auth.user, shipping:formData, products:auth.cart, cost, paymentInfo})
      })
      .then(res => res.json())
      .then(result => {
         console.log(result)
         toast.success(result.success)
         if (result.success) {
            setCart([])
            localStorage.removeItem('cartProduct')
            window.location.pathname = "/profile"
         }
      })  
   }

   const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
   
   return (
      <div className="container">
         {auth.toastMessage()}
         <div className="row">
            <div className="col-md-6">
               <ShippingForm setFormData={setFormData}></ShippingForm>
            </div>
            <div className="col-md-6 p-3 my-5 card">
               <div className='text-center'>
                  <h4 className="heading">
                     Your Selected Product
                  </h4>
               </div>
               <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {
                        auth.cart && auth.cart.map(cartFood => {
                           const {name, price, img, quantity} = cartFood
                           return(
                              <TableRow>
                                 <TableCell><img className="img-fluid" src={img} alt=""/></TableCell>
                                 <TableCell>{name.length > 50 ? `${name.slice(0, 50)}...` : name}</TableCell>
                                 <TableCell><b>$</b>{price}</TableCell>
                                 <TableCell>{quantity}</TableCell>
                              </TableRow>
                           )
                        })
                     }
                  </TableBody>
                  </Table>
               </TableContainer>

               <div className='card-footer'>
                  <TableContainer component={Paper}>
                     <Table aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           <TableCell align="center">
                              <h4>Total Cost Calculation</h4>
                           </TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <TableRow>
                           <TableCell>
                              Product Price :<span className='float-right'>$ {price}</span>
                           </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>
                              Shipping Charge :<span className='float-right'>$ {shipping}</span>
                           </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>
                              Vat and Text :<span className='float-right'>$ {vat}</span>
                           </TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>
                              <h4>Total Price :<span className='float-right'>$ {totalAmount}</span></h4>
                           </TableCell>
                        </TableRow>
                     </TableBody>
                     </Table>
                  </TableContainer>
                  <Elements stripe={stripePromise}>
                     <StripePaymentForm 
                        formData={formData} 
                        placeholder={placeholder}
                     >
                     </StripePaymentForm>
                  </Elements>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Shipping;