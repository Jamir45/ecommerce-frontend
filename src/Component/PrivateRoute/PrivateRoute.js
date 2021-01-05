import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../UseAuth/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
   const auth = useAuth();
   const user = auth.user

   return (
     <Route
       {...rest}
       render={({ location }) =>
         user ? (
            children
         ) : (
           <Redirect
             to={{
               pathname: "/sign-in",
               state: { from: location }
             }}
           />
         )
       }
     />
   );
 }

export default PrivateRoute;