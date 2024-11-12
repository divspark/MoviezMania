import React from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const VideoTitle = ({ title, overview, movieId }) => {
  const navigate = useNavigate(); 

 
  const handleRedirect = (type) => {
    if (type === 'play' || type === 'info') {
      navigate(`/movie/${movieId}`); 
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 sm:px-12 bg-gradient-to-r from-black">
      {/* Title Section */}
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 mt-8 md:mt-0">{title}</h1>
      
      {/* Overview Section */}
      <p className="text-xs sm:text-md lg:text-lg mb-6 text-white w-full sm:w-2/3 lg:w-1/3 overflow-hidden hidden sm:block">
        {overview}
      </p>
      
      {/* Buttons */}
      <div className="flex flex-wrap space-x-2">
        {/* Play Button */}
        <button
          className="flex items-center justify-center bg-white hover:bg-opacity-80 text-black py-2 px-2 sm:py-3 sm:px-8 w-10 sm:w-36 text-sm sm:text-lg rounded-full"
          onClick={() => handleRedirect('play')}
        >
          <FaPlay className="text-lg sm:text-xl mr-0 md:mr-2  inline" /> 
          <span className="hidden sm:inline">Play</span>
        </button>
        
     
        <button
          className="flex items-center justify-center bg-gray-700 text-white py-3 px-2 sm:py-3 sm:px-8 w-12 sm:w-44 text-md sm:text-lg hover:bg-opacity-50 rounded-full"
          onClick={() => handleRedirect('info')}
        >
          <FaInfoCircle className="text-lg sm:text-xl inline mr-0 md:mr-2" /> 
          <span className="hidden sm:inline">More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
