import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { ApiOptions } from "../utils/constants";
import MovieCard from "./MovieCard"; // Import MovieCard component
import Header from "./Header";

const Shimmer = () => (
  <div className="shimmer-container grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-6 ">
    {[...Array(8)].map((_, index) => (
      <div
        key={index}
        className="w-48 h-60 bg-gray-300 animate-pulse rounded-md"
      ></div>
    ))}
  </div>
);

const SearchPage = () => {
  const [query, setQuery] = useState(""); // Store search query
  const [movies, setMovies] = useState([]); // Store fetched movie data
  const [loading, setLoading] = useState(false); // Track loading state
  const [debouncedQuery, setDebouncedQuery] = useState(query); // Store debounced query

  // Debounce effect: update `debouncedQuery` after 500ms of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    // Clear the timeout if `query` changes (user keeps typing)
    return () => clearTimeout(timer);
  }, [query]);

  // Trigger search when `debouncedQuery` changes
  useEffect(() => {
    if (debouncedQuery) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${debouncedQuery}&include_adult=false&page=1`,
            ApiOptions
          );
          setMovies(response.data.results); // Set the movie data from API response
        } catch (error) {
          console.error("Error fetching movies:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    } else {
      setMovies([]); // Clear movies if query is empty
    }
  }, [debouncedQuery]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Update query state on input change
  };

  return (
    <>
    <Header />
    <div className="search-page p-4 bg-black min-h-screen bg-opacity-85 w-screen">
      {/* Search Bar */}
      <div className="flex justify-center mb-8 mt-24">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-3 pl-4 pr-10 bg-gray-800 text-white rounded-full outline-none"
            value={query}
            onChange={handleSearchChange} // Update query on input change
          />
          <FaSearch className="relative right-8 text-gray-400 cursor-pointer" />
        </form>
      </div>

      {/* Shimmer Effect while Loading */}
      {loading ? (
        <Shimmer />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-6 mt-8">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <div className="text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default SearchPage;
