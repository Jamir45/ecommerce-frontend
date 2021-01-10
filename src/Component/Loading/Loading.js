import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const Loading = () => {
   return (
      <>
         <div className="col-md-3"></div>
         <div className="col-md-6 text-center my-5">
            <CircularProgress color="secondary" /><br/>
            <strong>Loading...</strong>
         </div>
         <div className="col-md-3"></div>
      </>
   );
};

export default Loading;