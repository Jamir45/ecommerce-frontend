import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import firebaseConfig from "../../firebase.config";
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// Create Auth Context
const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

// Create Provider For AuthContext
export const AuthContextProvider = (props) => {
   const auth = Auth()
   return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}


// Create All Context Function
const Auth = () => {

   const [user, setUser] = useState(null)
   const [message, setMessage] = useState(null)
   setTimeout( () => {
      setMessage(null)
   }, 4000)

   // Sign In With Gmail
   const signInWithGmail = (history) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(result => {
         userToken()
         history.push('/review')
         toast.success('Sign In Successful With Gmail')
      })
      .catch(error => {
         console.log(error)
         return error.message
      })
   }

   // Sign In With Facebook
   const signInWithFacebook = (history, setAddToCartEvent) => {
      const fbProvider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(fbProvider)
      .then(function(result) {
         userToken()
         toast.success('Sign In Successful With Facebook')
         setUser(user)
         history.push('/review')
         setAddToCartEvent([result])
       })
       .catch(function(error) {
         const errorCode = error.code;
         const errorMessage = error.message;
         toast.error(errorMessage)
         const email = error.email;
         const credential = error.credential;
       });
   }

   // Email verification after submit Sign-up Form 
   const emailVerification = (formData) => {
      const config = {
         url: 'http://localhost:3000/complete-registration',
         handleCodeInApp: true,
       };

      firebase.auth().sendSignInLinkToEmail(formData.email, config)
      .then(() => {
         toast.success(`We are sent an email to ${formData.email}. Please Check Your mail and Complete the registration Process`)
         localStorage.setItem('userForSignUp', JSON.stringify(formData));
      })
      .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorMessage)
      });
   }

   // Sign Up With Email and Password
   const signUpWithEmailAndPassword = (name, email, password, history) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
         toast.success('Sign Up Successful.')
         addUerName(name)
         history.push('/sign-in')
         localStorage.removeItem('userForSignUp')
      })
      .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorMessage)
         toast.error(errorMessage)
      });
   }
   const addUerName = (name) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
      displayName: name,
      }).then(function() {
         console.log('Profile is successfully updated')
      }).catch(function(error) {
         console.log(error)
      });
   }

   // Sign In With Email and Password
   const signInWithEmailAndPassword = (email, password, history, setAddToCartEvent) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
         userToken()
         setMessage({success:'Sign In Successful.'})
         toast.success('Sign In Successful.')
         history.push('/review')
         setAddToCartEvent([result])
      })
      .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         toast.error(errorMessage)
      });
   }
   
   // Cart 
   const [cart, setCart] = useState([])
   useEffect(() => {
      fetch('http://localhost:3005/get-cart-product', {
         method: 'GET',
         headers: { 
            'Content-Type': 'application/json',
            'authorization': sessionStorage.getItem('userToken')
         }
      })
      .then(response => response.json())
      .then(result => {
         console.log(result)
         if (!result.error) {
         setCart(result)
         }
      })
   }, [user])

   // Sign Out
   const signOut = (history) => {
      return firebase.auth().signOut()
      .then(() => {
         setUser(null)
         sessionStorage.removeItem('userToken')
         toast.success('Sign Out Successful.')
         history.push('/')
         setCart([])
      })
      .catch((error) => {
         console.log(error.message)
      });
   }

   // Save Logged in use token
   const userToken = () => {
      firebase.auth().currentUser.getIdToken(true)
      .then(function(idToken) {
         sessionStorage.setItem('userToken', idToken)
         setUser(jwt_decode(idToken))
      }).catch(function(error) {
      // Handle error
      });
   }

   // Manage Signed User 
   useEffect(() => {
      const loggedInUser = sessionStorage.getItem('userToken') && jwt_decode(sessionStorage.getItem('userToken'))
      setUser(loggedInUser)
   }, [])

   // Show Toast Message in Our Component
   const toastMessage = () => {
      return <ToastContainer 
         position="top-center"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
      />
   }



   return {
      user,
      message,
      cart, 
      setCart,
      signInWithGmail,
      signInWithFacebook,
      signOut,
      emailVerification,
      signUpWithEmailAndPassword,
      signInWithEmailAndPassword,
      toastMessage
   }
}

export default Auth;