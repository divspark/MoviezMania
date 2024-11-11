import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from "react";
import Header from "./Header";
import { Dovalidate } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { addUser } from '../store/userslice';
import { Profile_Url } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const name = useRef();
  const email = useRef();
  const password = useRef();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    const msg = Dovalidate(email.current.value,password.current.value);
    setErrorMessage(msg);
    if (msg !== null) return;

    //Sign In / Sign Up Logic
    if(isSignInForm){
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    // console.log(user);
    navigate("/");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });
    }else{
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: Profile_Url
    }).then(() => {
      const {uid, email, displayName, photoURL} = auth.currentUser;
      dispatch(addUser({
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL
      }))
    }).catch((error) => {
      setErrorMessage(error.message);
    });
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="absolute">
        <img src="bg-image5.jpg" alt="bg-image" className="fixed h-screen w-screen" />
      </div>
      <form
        action=""
        className="absolute bg-black bg-opacity-80 p-12 w-10/12 md:w-1/2 lg:w-1/4 my-24 mx-auto right-0 left-0 text-white"
      >
        <div className="flex justify-center">
          <img src="Logow.png" alt="Logo" className="w-44 " />
        </div>
        <h1 className="font-bold text-3xl py-4 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {isSignInForm ? null : (
          <input
          ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 my-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 my-2 w-full bg-gray-700"
        />
        <p className="text-red-800">{errorMessage}</p>
        <button
          className="p-4 my-2 bg-green-600 w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In " : "Sign Up"}
        </button>
        <p
          className="py-4 text-center text-blue-500"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
