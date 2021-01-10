import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../UseAuth/useAuth';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';


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
      <div className="py-3"  style={{position:'fixed', width:'20%'}}>
         <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell align="center">
                     <h5>Product Cart</h5>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               <TableRow>
                  <TableCell>
                     Selected Product :<span className='float-right'>{cart && cart.length}</span>
                  </TableCell>
               </TableRow>
               <TableRow>
                  <TableCell>
                     Product Price :<span className='float-right'>$ {cart && totalPrice.toFixed(2)}</span>
                  </TableCell>
               </TableRow>
               <TableRow>
                  <TableCell>
                     Shipping Charge :<span className='float-right'>$ {shipping}</span>
                  </TableCell>
               </TableRow>
               <TableRow>
                  <TableCell>
                     Vat and Text :<span className='float-right'>$ {vat.toFixed(2)}</span>
                  </TableCell>
               </TableRow>
               <TableRow>
                  <TableCell>
                     <h6>Total Amount : <span className='float-right'>$ {totalAmount.toFixed(2)}</span></h6>
                  </TableCell>
               </TableRow>
            </TableBody>
            
            </Table>
            <div className='text-center mb-3'>
               {
                  props.button ? 
                  <Link to='/review'><button className="btn btn-success">Review Product</button></Link> : <Link to='/shipping'><button className="btn btn-success">Add Shipping</button></Link>
               }
            </div>
         </TableContainer>
      </div>
   );
};

export default Cart;