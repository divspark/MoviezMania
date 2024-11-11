import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";


const store = configureStore({
  reducer: {
    user: userReducer,
    // products: productsReducer,
    // cart: cartReducer,
  },
});

export default store;