import { useDispatch } from "react-redux";
import { addTopRatedMovies } from '../store/movieSlice';
import { useEffect } from "react";
import { ApiOptions } from "../utils/constants";


const useTopRatedMovies = () => {
    const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1", ApiOptions);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addTopRatedMovies(json.results));
  }

  useEffect(() => {
    getTopRatedMovies();
  }, [])
}

export default useTopRatedMovies;