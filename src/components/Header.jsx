import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../store/userslice";
import { FaSearch } from "react-icons/fa"; // For the search icon
import axios from "axios"; // For API requests
import { ApiOptions } from "../utils/constants";

const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for images

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for search input, results, and loading status
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ref to handle clicks outside of the search area
  const searchRef = useRef(null);

  // Handle sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  // Search API request with debouncing
  const fetchSearchResults = useCallback(async () => {
    if (!query) {
      setSearchResults([]);  // Clear results if query is empty
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`,
        ApiOptions
      );
      
      setSearchResults(response.data.results.slice(0, 6));  // Limit to first 6 results
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  }, [query]);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchResults();
    }, 500); // 500ms delay to avoid frequent API calls

    return () => clearTimeout(timer); // Cleanup the timer on component unmount or query change
  }, [query, fetchSearchResults]);

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

  // Handle suggestion click to navigate to the movie detail page
  const handleSuggestionClick = (id) => {
    navigate(`/${id}`);
  };

  // Handle click outside to hide suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);  // Clear suggestions if click is outside the search area
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
      <img src="Logow.png" alt="Logow" className="w-32" />

      {/* Search Bar */}
      <div className="flex items-center relative w-1/3" ref={searchRef}>
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-3 pl-4 pr-10 bg-gray-800 text-white rounded-full outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query on input change
        />
        <FaSearch className="absolute right-3 text-gray-400 cursor-pointer" />

        {/* Display Search Suggestions */}
        {query && !loading && searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-gray-800 text-white rounded-lg shadow-lg mt-2">
            <ul>
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  className="p-2 cursor-pointer hover:bg-gray-700"
                  onClick={() => handleSuggestionClick(result.id)} // Navigate on click
                >
                  {result.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show loading indicator if the search is in progress */}
        {loading && (
          <div className="absolute top-full left-0 w-full bg-gray-800 text-white rounded-lg shadow-lg mt-2 p-2 text-center">
            Loading...
          </div>
        )}
      </div>

      {/* User Icon and Sign Out Button */}
      <div className="flex items-center">
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
