import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'


const Product = (props) => {
   const {img, _id, key, name, price, seller, stock} = props.product

   return (
      <div className="row p-3 shopProducts1">
         <img className="img-fluid productImg col-sm-12 col-md-4 p-3" src={img} alt=""/>
         <div className="col-sm-12 col-md-8">
            <h5><Link to={`/product/${_id}`}> {name} </Link></h5>
            <p> <b>Price :</b> {price} </p>
            <p> <b>Seller :</b> {seller} </p>
            <p> <b>Stock :</b> {stock} </p>
            <Button variant="contained" color="primary" onClick={() => props.addToCartHandler(key)}>Add To Cart</Button>
         </div>
      </div>
   );
};

export default Product;