import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard"; // Import MovieCard component
import Header from "./Header";

const FavoritePage = () => {
  // Access the list of favorite movies from Redux store
  const favorites = useSelector((state) => state.favorites.movies);

  return (
    <>
    <Header />
    <div className="favorite-page p-4 bg-black min-h-screen bg-opacity-85 ">
      <h2 className=" text-white mt-6 mb-12 text-3xl text-center font-semibold mt-24">
        My Favorite Movies
      </h2>

      {/* Check if there are any favorite movies */}
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500">
          You don't have any favorite movies yet!
        </div>
      ) : (
        // Display all favorite movies
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default FavoritePage;
