import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  console.log(movies);
  return (
    <div className='px-6 py-3  bg-op'>
        <h1 className='text-2xl font-normal text-white mb-2'>{title}</h1>
      <div className='flex overflow-x-scroll scrollbar-hide'>
        
        <div className='flex'>
          {movies?.map((movie) => (
            <MovieCard 
              key={movie.id} // Use a unique key for each movie
              posterPath={movie.poster_path} // Access each movie's poster_path
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
