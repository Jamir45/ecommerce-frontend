import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Shop/Product/Product';

const ProductDetails = () => {
   const {productKey} = useParams()
   const product = fakeData.find(data => data.key === productKey)
   return (
      <div className="container">
         <div>
         <Product 
         key={product.key}
         product={product}
         addToCartButton={false}
         >
         </Product>
         </div>
      </div>
   );
};

export default ProductDetails;