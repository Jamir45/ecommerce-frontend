import { Fab } from '@material-ui/core';
import { Facebook } from '@material-ui/icons';
import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { DataContext } from '../../../App';
import { useAuth } from '../../UseAuth/useAuth';


const Login = () => {
   const history = useHistory();
   const auth = useAuth()
   const message = auth.message
   console.log(message)

   const store = useContext(DataContext)
   const setAddToCartEvent = store.setAddToCartEvent

   const { register, handleSubmit, watch, errors } = useForm();
   const onSubmit = data => {
      console.log(data)
      auth.signInWithEmailAndPassword(data.email, data.password, history)
   };


   return (
      <div className="container">
         <div className="row">
            <div className="col-1 col-md-3"></div>
            <div className="col-10 col-md-6 card p-0 text-center mt-5">
               <div className='card-header'>
                  <h3 className='py-3'>Sign In Form</h3>

                  <form onSubmit={handleSubmit(onSubmit)}>
                     {auth.toastMessage()}
                     <input className="form-control mb-3" type="text" name="email" placeholder="Enter Your Email" ref={register({ required: true })} />
                     {errors.email && <span>Email is required</span>}

                     <input className="form-control mb-3" type="password" name="password" placeholder="Enter Your Password" ref={register({ required: true })} />
                     {errors.password && <span>Password is required</span>}

                     <input class='btn btn-primary' type="submit" />
                  </form>
                  <span><Link className='notice' to='/sign-up'>Don't have an Account.?</Link></span>
                  <span className="option">Or Sign In With</span>
               </div>
               <div className=" card-body">
                  <Fab onClick={() => auth.signInWithFacebook(history)} className='iconButton' color="primary" aria-label="add">
                     <Facebook style={{fontSize:'30px !important'}} />
                  </Fab>
                  <Fab onClick={() => auth.signInWithGmail(history)} className='iconButton' color="primary" aria-label="add">
                     <i class="fab fa-google-plus"></i>
                  </Fab>
               </div>
            </div>
            <div className="col-1 col-md-3"></div>
         </div>
      </div>
   );
};

export default Login;