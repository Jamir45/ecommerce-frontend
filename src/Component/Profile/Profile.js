import React from 'react';
import { useAuth } from '../UseAuth/useAuth';

const Profile = () => {
   const auth = useAuth()
   
   return (
      <div className='container text-center'>
         {auth.toastMessage()}
         <h1>This is your profile page</h1>
         <h3>This page is under construction.</h3>
      </div>
   );
};

export default Profile;