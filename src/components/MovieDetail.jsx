import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiOptions } from '../utils/constants';

const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500'; // The base URL for images

const MovieDetail = () => {
  const { movieId } = useParams(); // Get movieId from the URL parameters
  const [movie, setMovie] = useState(null); // Store the movie data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, ApiOptions);
        const data = await response.json();
        setMovie(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchMovieDetails();
  }, [movieId]); // Re-run when movieId changes

  if (loading) {
    return (
      <div className="movie-detail max-w-4xl mx-auto bg-gray-800 rounded-lg p-6 mt-10 shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          {/* Shimmer Placeholder for Image */}
          <div className="w-full md:w-1/3 h-64 bg-gray-300 rounded-lg shimmer mb-4 md:mb-0"></div>

          <div className="md:ml-6 text-white">
            {/* Shimmer Placeholder for Text */}
            <div className="h-8 bg-gray-300 shimmer w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 shimmer w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 shimmer w-full mb-4"></div>
            <div className="h-4 bg-gray-300 shimmer w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-300 shimmer w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 shimmer w-1/2 mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) return <p>Movie not found</p>; // Handle case where movie is not found

  return (
    <div className="movie-detail max-w-4xl mx-auto bg-gray-800 rounded-lg p-6 mt-10 shadow-lg">
      <div className="flex flex-col md:flex-row items-center">
        <img 
          src={IMG_CDN_URL + movie.poster_path} 
          alt={movie.title} 
          className="w-full md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0"
        />
        <div className="md:ml-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 text-lg mb-4">{movie.release_date}</p>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          
          {/* Display genres */}
          <p className="text-gray-500 text-sm mb-4">Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
          
          {/* Display production companies */}
          <p className="text-gray-500 text-sm mb-4">
            Production Companies: {movie.production_companies.map(company => company.name).join(', ')}
          </p>
          
          {/* Display revenue */}
          <p className="text-gray-500 text-sm mb-4">
            Revenue: ${movie.revenue.toLocaleString()}
          </p>
          
          {/* Display runtime */}
          <p className="text-gray-500 text-sm mb-4">
            Runtime: {movie.runtime} minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
