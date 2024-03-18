import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import YouTube from "react-youtube";
import Popular from "./MovieList/Popular";
import TopRated from "./MovieList/TopRated";
import Upcoming from "./MovieList/Upcoming";
import "./MovieList/Movielist.css";
import Hero from "./Hero/Hero";

const MovieSlider = () => {
  return (
    <>
      <Hero />
      <div style={{ backgroundColor: "#141414" }}>
        <Popular />
        <TopRated />
        <Upcoming />
      </div>
    </>
  );
};

export default MovieSlider;
