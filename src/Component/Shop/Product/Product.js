import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'


const Product = (props) => {
   const {img, key, name, price, seller, stock} = props.product

   return (
      <div className='col-md-6 col-lg-4 p-3'>
         <Card>
            <CardActionArea>
            <CardMedia
               title="Contemplative Reptile"
               className='text-center'
            >
               <img className="img-fluid" src={img} alt=""/>
            </CardMedia>
            <CardContent>
               <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  component="p"
                  className="text-justify"
               >
                  <h6>
                  <b>Name :</b> <Link to={`/product/${key}`}>{name.length > 100 ? `${name.slice(0, 100)}...` : name}</Link>
                  </h6>
               </Typography>
               <b>Price :</b> {price} <br/>
               <b>Seller :</b> {seller} <br/>
               <b>Stock :</b> {stock}
            </CardContent>
            </CardActionArea>
            <CardActions>
               <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => props.addToCartHandler(key)}
                  className="m-auto"
               >
                  Add To Cart
               </Button>
            </CardActions>
         </Card>
      </div>
   );
};

export default Product;