import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../store/userslice";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for hamburger and close

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            uid,
            email,
            displayName,
            photoURL,
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
    <div className="absolute px-4 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between items-center">
      <img src="Logow.png" alt="Logow" className="w-20 sm:w-44 px-0 lg:px-6" />

      {/* Navigation Links for larger screens */}
      <div className="hidden md:flex space-x-14 px-10">
        <Link to="/" className="text-white font-semibold">
          Home
        </Link>
        <Link to="/search" className="text-white font-semibold">
          Search
        </Link>
        <Link to="/favourites" className="text-white font-semibold">
          Favorites
        </Link>
        <button className="font-semibold text-white" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      {/* Hamburger Menu for small screens */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <HiX className="text-white w-8 h-8" /> // Close icon
          ) : (
            <HiMenu className="text-white w-8 h-8" /> // Hamburger icon
          )}
        </button>
      </div>

      {/* Menu Drawer for small screens */}
      {isMenuOpen && (
        <div className="absolute top-14 right-0 w-full bg-black bg-opacity-90 flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link
            to="/"
            className="text-white font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/search"
            className="text-white font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            Search
          </Link>
          <Link
            to="/favourites"
            className="text-white font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            Favorites
          </Link>
          <button
            className="font-semibold text-white"
            onClick={() => {
              handleSignOut();
              setIsMenuOpen(false);
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
