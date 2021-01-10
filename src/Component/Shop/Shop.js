import React from 'react';
import { useContext } from 'react';
import { DataContext } from '../../App';
import Loading from '../Loading/Loading';
import { useAuth } from '../UseAuth/useAuth';
import Cart from './Cart/Cart';
import Product from './Product/Product';


const Shop = () => {
   const store = useContext(DataContext)

   // Add to cart handler
   const auth = useAuth()
   const cart = auth.cart
   const setCart = auth.setCart
   
   // console.log(cart)
   const addToCartHandler = (key) => {
      const cartProduct  = store.productData.find( pd => pd.key === key)
      cartProduct.quantity = 1

      const old_coords = JSON.parse(localStorage.getItem('cartProduct'));
      if (old_coords === null) {
         localStorage.setItem('cartProduct', JSON.stringify([cartProduct]));
      } else {
         const new_coords = old_coords;
         new_coords.push(cartProduct);
         localStorage.setItem('cartProduct', JSON.stringify(new_coords));
      }
      setCart([...cart, cartProduct])

      // fetch('https://mern-ecommerce-backend-server.herokuapp.com/add-to-cart', {
      //    method: 'POST',
      //    headers: { 
      //       'Content-Type': 'application/json',
      //       'authorization': sessionStorage.getItem('userToken')
      //    },
      //    body: JSON.stringify({cartProduct})
      // })
      // .then(response => response.json())
      // .then(result => {
      //    console.log(result)
      //    const updatedCart = [...cart, result.data]
      //    setCart(updatedCart)
      // })
   }


   return (
      <div className="container">
         <div className="row">
            <div className="col-12 col-lg-9">
               <div className="row">
               {
                  !store.productData.length && <div className="mt-5 pt-5 col-12 row"><Loading></Loading></div>
               }
               {
                  store.productData.length && store.productData.map(data => <Product 
                     key={data.key}
                     product={data}
                     addToCartHandler={addToCartHandler}
                     addToCartButton={true}
                     >
                     </Product>)
               }
               </div>
            </div>
            <div className="col-lg-3 d-none d-md-block">
               <Cart button={true}></Cart>
            </div>
         </div>
      </div>
   );
};

export default Shop;