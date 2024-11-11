import { useDispatch } from "react-redux";
import { ApiOptions } from "../utils/constants";
import { addTrailerVideo } from "../store/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const getMovieVideo = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            ApiOptions
          );
          const json = await response.json();
        //   console.log(json.results);
          
          // Filter for trailer
          const filteredData = json.results.filter(
            (video) => video.type === "Trailer"
          );
          
          const selectedTrailer = filteredData.length ? filteredData[0] : json.results[0];
          
          // Set the trailer in state
          dispatch(addTrailerVideo(selectedTrailer));
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      };
    
      useEffect(() => {
        getMovieVideo();
      }, [movieId]);
}

export default useMovieTrailer

