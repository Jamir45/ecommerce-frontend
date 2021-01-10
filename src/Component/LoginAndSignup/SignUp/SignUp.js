import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../UseAuth/useAuth';
import FormFooter from '../FormFooter';
import './SignUp.css'


const SignUp = () => {
   const auth = useAuth()

   const { register, handleSubmit, errors } = useForm();
   const onSubmit = data => {
      console.log(data)
      auth.emailVerification(data)
   };

   return (
      <div className="container">
         {auth.toastMessage()}
         <div className="row">
            <div className="col-1 col-md-3"></div>
            <div className="col-10 col-md-6 card cardStyle p-0 text-center mt-5">
               <div className='card-header'>
                  <h3 className='py-3'>Sign Up Form</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <input 
                        className="form-control mb-3" 
                        type="text" 
                        name="name" 
                        placeholder="Enter Your Name" 
                        ref={register({ required: true })} 
                     />
                     {errors.name && <span>Name is required</span>}

                     <input 
                        className="form-control mb-3" 
                        type="text" 
                        name="email" 
                        placeholder="Enter Your Email" 
                        ref={register({ required: true })} 
                     />
                     {errors.email && <span>Email is required</span>}

                     <input 
                        className="form-control mb-3" 
                        type="password" 
                        name="password" 
                        placeholder="Enter Your Password" 
                        ref={register({ required: true })} 
                     />
                     {errors.password && <span>Password is required</span>}

                     <input class='btn btn-primary' type="submit" />
                  </form>
                  <span>
                     <Link className='notice' to='/sign-in'>
                        Already have an Account.?
                     </Link>
                  </span>
                  <FormFooter></FormFooter>
               </div>
            </div>
            <div className="col-1 col-md-3"></div>
         </div>
      </div>
   );
};

export default SignUp;