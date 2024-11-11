import { useSelector } from "react-redux";
import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailer2 = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div>
      {trailer2 ? (
        <iframe
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailer2?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer2?.key}&modestbranding=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        // Shimmer Effect Placeholder
        <div className="w-screen h-64 bg-gray-300 animate-pulse">
          <div className="w-full h-full bg-gray-400 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
