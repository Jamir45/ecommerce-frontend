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
import ProductDetails from './Component/ProductDetails/ProductDetails';
import NotFound from './Component/NotFound/NotFound';
import SignUp from './Component/LoginAndSignup/SignUp/SignUp'
import Login from './Component/LoginAndSignup/LogIn/Login'
import { createContext } from 'react';
import { AuthContextProvider } from './Component/UseAuth/useAuth';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Shipping from './Component/Shipping/Shipping';
import CompleteRegistrtion from './Component/CompleteRegistration/CompleteRegistrtion';
import Profile from './Component/Profile/Profile';

export const DataContext = createContext()

function App() {

  const [searchValue, setSearchValue] = useState('')
  const [productData, setProductData] = useState([])
  useEffect(() => {
    fetch('https://mern-ecommerce-backend-server.herokuapp.com/insert-all?search='+searchValue, {
         method: 'GET',
         headers: { 
            'Content-Type': 'application/json'
         }
      })
      .then(response => response.json())
      .then(result => {
         console.log(result)
         setProductData(result)
      })
  }, [searchValue])

  // All Context
  const store = {productData, setProductData, setSearchValue}

  return (
    <div>
      <AuthContextProvider>
      <DataContext.Provider value={store}>
      <Router>
        <Header />
        <Switch>
          <Route path='/shop'>
            <Shop></Shop>
          </Route>
          <Route path='/review'>
            <Review></Review>
          </Route>
          <Route path='/product/:productKey'>
            <ProductDetails></ProductDetails>
          </Route>
          <Route path='/sign-up'>
            <SignUp></SignUp>
          </Route>
          <Route path='/profile'>
            <Profile></Profile>
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
