import { useSelector } from 'react-redux'
import React from 'react'
import MovieList2 from './MovieList2'

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector(store => store.movies?.nowPlayingMovies);
  const popularMovies = useSelector(store => store.movies?.popularMovies);
  const topRatedMovies = useSelector(store => store.movies?.topRatedMovies);
  const upcomingMovies = useSelector(store => store.movies?.upcomingMovies);
  return (
    <div className=' bg-black'>
      <div className='-mt-6 md:-mt-40 pl-2 md:pl-8 relative z-10 '>
      <MovieList2 movies={nowPlayingMovies} title={"Now Playing"}/>
      <MovieList2 movies={popularMovies} title={"Popular"}/>
      <MovieList2 movies={topRatedMovies} title={"Top Rated"}/>
      <MovieList2 movies={upcomingMovies} title={"Upcoming"}/>
      </div>
    </div>
  )
}

export default SecondaryContainer