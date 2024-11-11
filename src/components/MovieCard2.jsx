import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMG_CDN_URL } from '../utils/constants';
import { addFavorite, removeFavorite } from '../store/favouriteSlice'; // Redux actions for favorites
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons

const MovieCard2 = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = useSelector((state) => state.favorites.movies);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
      setIsFavorite(false);
    } else {
      dispatch(addFavorite(movie));
      setIsFavorite(true);
    }
  };

  const navigateToMovieDetail = () => {
    navigate(`/${movie.id}`);
  };

  return (
    <div className="w-48 pr-4 relative"> {/* Set parent to relative */}
      <div className="cursor-pointer " onClick={navigateToMovieDetail}>
        <img src={IMG_CDN_URL + movie?.poster_path} alt={movie?.title} className="w-full h-auto" />
        <h3 className="text-white text-sm mt-2">{movie?.title}</h3>
        <p className="text-gray-400 text-xs">{movie?.release_date}</p>
      </div>

      {/* Heart button positioned at the bottom right */}
      <div 
        onClick={handleFavoriteToggle} 
        className="absolute bottom-2 right-2 cursor-pointer pr-2 pb-2"
      >
        <FaHeart 
          size={24} 
          color={isFavorite ? 'red' : 'gray'} 
          className="transition-colors duration-300" 
        />
      </div>
    </div>
  );
};

export default MovieCard2;
