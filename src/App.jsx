import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Browse from "./components/Browse";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import MovieDetail from "./components/MovieDetail";

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:movieId" element={<MovieDetail />} />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
};

export default App;
