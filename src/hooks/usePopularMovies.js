import { useDispatch } from "react-redux";
import { addPopularMovies } from '../store/movieSlice';
import { useEffect } from "react";
import { ApiOptions } from "../utils/constants";


const usePopularMovies = () => {
    const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", ApiOptions);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addPopularMovies(json.results));
  }

  useEffect(() => {
    getPopularMovies();
  }, [])
}

export default usePopularMovies;