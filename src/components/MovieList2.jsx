import React from 'react';
import MovieCard2 from './MovieCard2';

const MovieList2 = ({ title, movies }) => {
  console.log(movies);  // Logging movies to see the structure
  return (
    <div className='px-6 py-3 bg-op'>
      <h1 className='text-2xl font-normal text-white mb-2'>{title}</h1>
      <div className='flex overflow-x-scroll scrollbar-hide'>
        <div className='flex'>
          {movies?.map((movie) => (
            <MovieCard2 
              key={movie.id} // Unique key for each movie
              movie={movie}  // Pass the entire movie object to MovieCard
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList2;