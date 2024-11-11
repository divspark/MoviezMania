import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import moviesReducer from "./movieSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    // cart: cartReducer,
  },
});

export default store;