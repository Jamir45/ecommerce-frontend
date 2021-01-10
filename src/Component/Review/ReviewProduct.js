import { Badge, Button, ButtonGroup } from '@material-ui/core';
import React from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import { useAuth } from '../UseAuth/useAuth';


const ReviewProduct = (props) => {
   const auth = useAuth()
   const setCart = auth.setCart

   const {img, _id, key, name, price, seller, stock, quantity} = props.product

   const quantityAddRemove = (Quantity, key) => {

      const savedProduct = JSON.parse(localStorage.getItem('cartProduct'));
      const updatedItem = savedProduct.map(item => {
         if (item.key === key) {
            const product = item
            product.quantity = Quantity
            return product
         }else{
            return item
         }
      })
      updatedItem && localStorage.setItem('cartProduct', JSON.stringify(updatedItem));
      setCart(updatedItem)

      // fetch('https://mern-ecommerce-backend-server.herokuapp.com/add-and-remove-quantity', {
      //    method:'PUT',
      //    headers:{
      //       'Content-type':'application/json',
      //       'authorization': sessionStorage.getItem('userToken')
      //    },
      //    body:JSON.stringify({addedBy, quantity:Quantity})
      // })
      // .then(res => res.json())
      // .then(result => {
      //    console.log(result)
      //    const updatedProduct = cart.map(product => {
      //       if (product._id === result._id) {
      //          return result
      //       }else{
      //          return product
      //       }
      //    })
      //    setCart(updatedProduct)
      // })
   }

   return (
      <div className="row p-3 shopProducts2">
         <img className="img-fluid productImg col-md-5 p-3" src={img} alt=""/>
         <div className="col-md-7 pt-5">
            <h5> {name} </h5>
            <p> <b>Price :</b> {price} </p>
            <p> <b>Seller :</b> {seller} </p>
            <p> <b>Stock :</b> {stock} </p>
            <p className='mb-0'><b>Quantity :</b> <Badge color="secondary" badgeContent={quantity}></Badge></p>
            <div className='mb-3'>
               <ButtonGroup>
                  <Button
                     aria-label="reduce"
                     onClick={() => {
                        parseFloat(quantity) > 1 && quantityAddRemove(parseFloat(quantity)-1, key)
                     }}
                  >
                     <RemoveCircleOutline fontSize="small" />
                  </Button>
                  <Button
                     aria-label="increase"
                     onClick={() => {
                        quantityAddRemove(parseFloat(quantity)+1, key)
                     }}
                  >
                     <AddCircleOutline fontSize="small" />
                  </Button>
               </ButtonGroup>
            </div>
            <Button 
               variant="contained" 
               color="primary" 
               onClick={() => props.removeToCartHandler(_id, key)}
            >
               Remove From Cart
            </Button>
         </div>
      </div>
   );
};

export default ReviewProduct;