import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import Review from './Component/Review/Review';
import Inventory from './Component/Manage Inventory/Inventory';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import NotFound from './Component/NotFound/NotFound';
import SignUp from './Component/LoginAndSignup/SignUp/SignUp'
import Login from './Component/LoginAndSignup/LogIn/Login'
import { createContext } from 'react';
import fakeData from './fakeData';
import { getDatabaseCart } from './utilities/databaseManager';
import { AuthContextProvider, useAuth } from './Component/UseAuth/useAuth';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Shipping from './Component/Shipping/Shipping';
import CompleteRegistrtion from './Component/CompleteRegistration/CompleteRegistrtion';

export const DataContext = createContext()

function App() {
  const auth = useAuth()
  console.log(auth)

  const [productData, setProductData] = useState([])
  useEffect(() => {
    setProductData(fakeData)
  }, [])

  
  

  // All Context
  const store = {productData, setProductData}

  return (
    <div>
      <AuthContextProvider>
      <DataContext.Provider value={store}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path='/shop'>
            <Shop></Shop>
          </Route>
          <Route path='/review'>
            <Review></Review>
          </Route>
          <Route path='/manage-cart'>
            <Inventory></Inventory>
          </Route>
          <Route path='/product/:productKey'>
            <ProductDetails></ProductDetails>
          </Route>
          <Route path='/sign-up'>
            <SignUp></SignUp>
          </Route>
          <Route path='/sign-in'>
            <Login></Login>
          </Route>
          <Route path='/complete-registration'>
            <CompleteRegistrtion></CompleteRegistrtion>
          </Route>
          <PrivateRoute path='/shipping'>
            <Shipping></Shipping>
          </PrivateRoute>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      </DataContext.Provider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
