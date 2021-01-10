import React from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import './Style.css'
import { Button, Paper } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useAuth } from '../../UseAuth/useAuth';

const StripePaymentForm = (props) => {
   const auth = useAuth()
   
   const stripe = useStripe();
   const elements = useElements();

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      const cardElement = elements.getElement(CardElement);

      const {error, paymentMethod} = await stripe.createPaymentMethod({
         type: 'card',
         card: cardElement,
      });

      if (error) {
         // console.log(error);
         toast.error(error.message)
      } else {
         // console.log(paymentMethod);
         props.placeholder(paymentMethod)

      }
   };

   return (
      <div className="mt-3">
         <Paper elevation={3}>
            {auth.toastMessage}
            <h4 className='pb-3'>Payment With Credit Card</h4>
            <form onSubmit={handleSubmit}>
               <CardElement/>
               {/* <button className='payButton' type="submit" disabled={!stripe}>
               Pay
               </button> */}
               {
                  props.formData && stripe ? <Button 
                     variant="contained" 
                     color="primary" 
                     type="submit"
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
            </form>
         </Paper>
         
      </div>
   );
};

export default StripePaymentForm;