import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../store/userslice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/");
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch, navigate]);

  return (
    <div className="absolute px-4 py-2 bg-gradient-to-b from-black z-10 w-full flex flex-wrap justify-between items-center">
      <img src="Logow.png" alt="Logow" className="w-32 sm:w-24" />

      {/* Navigation Links */}
      <div className="flex space-x-14 mt-2 sm:mt-0">
        <Link to="/" className="text-white font-semibold">
          Home
        </Link>
        <Link to="/search" className="text-white font-semibold">
          Search
        </Link>
        <Link to="/favourites" className="text-white font-semibold">
          Favorites
        </Link>
      </div>

      {/* User Icon and Sign Out Button */}
      <div className="flex items-center mt-2 sm:mt-0">
        <img
          src="userIcon.png"
          alt="user-icon"
          className="w-10 h-10 bg-green-600 rounded-full p-1 mr-2"
        />
        <button className="font-semibold text-white" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
