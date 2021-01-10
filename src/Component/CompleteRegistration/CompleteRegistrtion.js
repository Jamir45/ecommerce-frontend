import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../UseAuth/useAuth';

const CompleteRegistrtion = () => {
   const history = useHistory()
   const auth = useAuth()

   const registrationComplete = () => {
      const userData = localStorage.getItem('userForSignUp')
      const {name, email, password} = JSON.parse(userData)
      auth.signUpWithEmailAndPassword(name, email, password, history)
   }

   return (
      <div className='container'>
         <div className='row mt-5'>
            <div className='col-1 col-md-3'></div>
            <div className='col-10 col-md-6 card text-center py-5'>
               {auth.toastMessage()}
               <h3>
                  Your Email Verification Successful. Now Please Complete Your Registration Process
               </h3>
               <Button 
                  className='mt-3' 
                  onClick={() => 
                  registrationComplete()} 
                  variant="contained" 
                  color="secondary"
               >
                  Complete Registration
               </Button>
            </div>
            <div className='col-1 col-md-3'></div>
         </div>
      </div>
   );
};

export default CompleteRegistrtion;