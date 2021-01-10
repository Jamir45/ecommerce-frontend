import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../UseAuth/useAuth';

const ShippingForm = (props) => {
   const auth = useAuth();

   const { register, handleSubmit, errors } = useForm()
   const onSubmit = (data) => { 
      props.setFormData(data)
   }

   return (
      <form 
         className="card cardStyle ship-form mx-3 mx-md-5 my-5" 
         onSubmit={handleSubmit(onSubmit)}
      >
         <dir className='text-center m-0 p-0'>
            <h4>Add Your Shipping Address</h4>
         </dir>
         <input 
            name="name" 
            defaultValue={auth.user && auth.user.name} 
            ref={register({ required: true })} 
            placeholder="Enter your name" 
         />
         {errors.name && <span className="error">Name field is required</span>}

         <input 
            name="email" 
            defaultValue={auth.user && auth.user.email} 
            ref={register({ required: true })} 
            placeholder="Enter your email" 
         />
         {errors.email && <span className="error">Email field is required</span>}

         <input 
            name="Address " 
            ref={register({ required: true })} 
            placeholder="Enter your address" 
         />
         {errors.Address && <span className="error">Address field is required</span>}

         <input 
            name="addressLine2" 
            ref={register} 
            placeholder="Enter your address (Optional)" 
         />

         <input 
            name="country" 
            ref={register({ required: true })} 
            placeholder="Enter your country name" 
         />
         {errors.country && <span className="error">Country field is required</span>}

         <input 
            name="city" 
            ref={register({ required: true })} 
            placeholder="Enter your city name" 
         />
         {errors.city && <span className="error">City field is required</span>}

         <input 
            name="zipcode" 
            ref={register({ required: true })} 
            placeholder="Enter your zip code" 
         />
         {errors.zipcode && <span className="error">Zip code field is required</span>}

         <input class='btn btn-primary' type="submit" />
      </form>
   );
};

export default ShippingForm;