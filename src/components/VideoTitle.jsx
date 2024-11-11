import React from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 sm:px-12 bg-gradient-to-r from-black'>
      {/* Title Section */}
      <h1 className='text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>{title}</h1>
      
      {/* Overview Section */}
      <p className='text-sm sm:text-md lg:text-lg mb-6 text-white w-full sm:w-2/3 lg:w-1/3 overflow-hidden hidden sm:block'>
        {overview}
      </p>
      
      {/* Buttons */}
      <div className="flex flex-wrap space-x-2">
        {/* Play Button - Only icon on small devices, with text on larger screens */}
        <button className='flex items-center justify-center bg-white hover:bg-opacity-80 text-black py-2 px-6 sm:py-3 sm:px-8 w-16 sm:w-36 text-md sm:text-lg rounded-full'>
          <FaPlay className='text-lg sm:text-xl mr-2 hidden sm:inline' /> {/* Icon with text on larger screens */}
          <span className='hidden sm:inline'>Play</span> {/* Text visible on larger screens */}
        </button>
        
        {/* More Info Button - Only icon on small devices, with text on larger screens */}
        <button className='flex items-center justify-center bg-gray-700 text-white py-2 px-6 sm:py-3 sm:px-8 w-16 sm:w-44 text-md sm:text-lg hover:bg-opacity-50 rounded-full'>
          <FaInfoCircle className='text-lg sm:text-xl mr-2 hidden sm:inline' /> {/* Icon with text on larger screens */}
          <span className='hidden sm:inline'>More Info</span> {/* Text visible on larger screens */}
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
