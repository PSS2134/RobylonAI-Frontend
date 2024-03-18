import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import YouTube from "react-youtube";
import Popular from "./MovieList/Popular";
import TopRated from "./MovieList/TopRated";
import Upcoming from "./MovieList/Upcoming";
import "./MovieList/Movielist.css";

const MovieSlider = () => {
  return (
    <>
      <Popular />
      <TopRated />
      <Upcoming />
    </>
  );
};

export default MovieSlider;
