// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const movie = action.payload;
      if (!state.movies.some((item) => item.id === movie.id)) {
        state.movies.push(movie);
      }
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
