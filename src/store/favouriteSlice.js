import { createSlice } from '@reduxjs/toolkit';

// Utility function to get favorites from localStorage
const loadFavoritesFromLocalStorage = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const initialState = {
  movies: loadFavoritesFromLocalStorage(),
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const newMovie = action.payload;
      state.movies.push(newMovie);
      localStorage.setItem('favorites', JSON.stringify(state.movies)); // Save to local storage
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.movies)); // Save to local storage
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
