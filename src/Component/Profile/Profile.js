import React from 'react';
import { useAuth } from '../UseAuth/useAuth';

const Profile = () => {
   const auth = useAuth()
   
   return (
      <div>
         {auth.toastMessage()}
         <h1>This is your profile page</h1>
      </div>
   );
};

export default Profile;