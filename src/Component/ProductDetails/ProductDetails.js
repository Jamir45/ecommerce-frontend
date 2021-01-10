import { Button } from '@material-ui/core';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import './ProductDetails.css'

const ProductDetails = () => {
   const {productKey} = useParams()
   const product = fakeData.find(data => data.key === productKey)
   return (
      <div className='container'>
         <div className="row p-3 shopProducts1">
            <img className="img-fluid col-sm-12 col-md-4 px-5" src={product.img} alt=""/>
            <div className="col-sm-12 col-md-8">
               <h5> {product.name}</h5>
               <p> <b>Price :</b> {product.price} </p>
               <p> <b>Seller :</b> {product.seller} </p>
               <p> <b>Stock :</b> {product.stock} </p>
               <Button 
                  variant="contained" 
                  color="primary" 
               >
                  <Link to="/">Back</Link>
               </Button>
            </div>
         </div>
      </div>
   );
};

export default ProductDetails;