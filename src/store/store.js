import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import moviesReducer from "./movieSlice";
import favoritesReducer from "./favouriteSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
});

export default store;