import React from 'react';
import { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { DataContext } from '../../../App';
import { useAuth } from '../../UseAuth/useAuth';
// import SingInPopup from '../../Review/SingInPopup';
// import { useAuth } from '../../UseAuth/useAuth';



const Cart = (props) => {
   const auth = useAuth()
   const cart = auth.cart

   const totalPrice = cart && cart.reduce((initialValue, cartProduct) => initialValue+parseFloat(cartProduct.price*cartProduct.quantity), 0)

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

   const vat = parseFloat(totalPrice * 2 / 100)
   const totalAmount = parseFloat(totalPrice + shipping + vat)

   return (
      <div className="py-3 px-3"  style={{position:'fixed'}}>
         <h5>Product Cart</h5>
         <p><b>Selected Product : </b>{cart && cart.length}</p>
         <p>Product Price : <b>{cart && totalPrice.toFixed(2)}</b></p>
         <p>Shipping Charge : <b> {shipping} </b></p>
         <p>Vat & Tex : <b> {vat.toFixed(2)} </b></p>
         <h5>Total Amount : <b>{totalAmount.toFixed(2)} </b></h5>
         {
            props.button ? <Link to='/review'><button className="btn btn-success">Review Product</button></Link> : <Link to='/shipping'><button className="btn btn-success">Add Shipping</button></Link>
         }
      </div>
   );
};

export default Cart;