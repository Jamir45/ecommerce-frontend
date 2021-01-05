import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from './UseAuth/useAuth';

const FirebaseConcept = () => {
   const auth = useAuth()
   const user = auth.user
   console.log(user)

   const { register, handleSubmit, watch, errors } = useForm();
   const onSubmit = data => {
      console.log(data)
      auth.signUpWithEmailAndPassword(data.name, data.email, data.password)
   };

   return (
      <div className="container">
         <div className="row">
            <div className="col-3"></div>
            <div className="col-6 text-center">
               <h1>Firebase Concept Apply</h1>
               {
                  auth.user ? <button onClick={() => auth.signOut()}>Sign Out</button> : <button onClick={() => auth.signInWithGmail()}>Sign In</button>
               }
               <br/>
               <button onClick={() => auth.signInWithFacebook()}>Facebook SignIn</button>
               <div className='card p-3 mt-5'>
                  <h3>Sign Up</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <input className="form-control mb-3" type="text" name="name" placeholder="Enter Your Name" ref={register({ required: true })} />

                     <input className="form-control mb-3" type="text" name="email" placeholder="Enter Your Email" ref={register({ required: true })} />
                     {errors.email && <span>Email is required</span>}

                     <input className="form-control mb-3" type="password" name="password" placeholder="Enter Your Password" ref={register({ required: true })} />
                     {errors.password && <span>Password is required</span>}

                     <input type="submit" />
                  </form>
               </div>
            </div>
            <div className="col-3"></div>
            
         </div>
      </div>
   );
};

export default FirebaseConcept;