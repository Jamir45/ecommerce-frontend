import React from 'react';
import { Fab } from '@material-ui/core';
import { Facebook } from '@material-ui/icons';
import { useAuth } from '../UseAuth/useAuth';
import { useHistory, useLocation } from 'react-router-dom';

const FormFooter = () => {
   const auth = useAuth()

   const history = useHistory();
   const location = useLocation();
   const from = location.state ? `${location.state.from.pathname}` : "/";
   // let { from } = location.state || { from: { pathname: "/" } };
   const redirect = () => {
      // history.replace(from)
      history.push(from)
   }

   return (
      <div className=" card-body">
         <Fab onClick={() => auth.signInWithFacebook(redirect)} className='iconButton' color="primary" aria-label="add">
            <Facebook style={{fontSize:'30px !important'}} />
         </Fab>
         <Fab onClick={() => auth.signInWithGmail(redirect)} className='iconButton' color="primary" aria-label="add">
            <i class="fab fa-google-plus"></i>
         </Fab>
      </div>
   );
};

export default FormFooter;