import React from 'react';
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const mainMovie = movies && movies[0];

  // Destructure movie details
  const original_title = mainMovie?.original_title;
  const overview = mainMovie?.overview;
  const id = mainMovie?.id;

  return (
    <div className="relative">
      {/* Video Title Section */}
      {mainMovie && (
        <VideoTitle title={original_title} overview={overview} />
      )}

      {/* Video Background Section */}
      {mainMovie && (
        <VideoBackground movieId={id} />
      )}
    </div>
  );
};

export default MainContainer;