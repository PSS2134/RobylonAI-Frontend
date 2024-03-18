import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import YouTube from "react-youtube";

const api_key = "8699a49a5755d63f4f562e7f838cf0a5";

const opts = {
  width: "100%",
  height: "400px",
  autoplay: 1,
};

const Upcoming = () => {
  const [Movies, setMovies] = useState([]);
  const [Videos, setVideos] = useState([]);
  const [showMovie, setShowMovie] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
    } catch (e) {
      console.error(e);
      setError(true);
    }
  }, []);

  const getVideos = (movieid) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data.results));
  };

  const handleMovieClick = async (movie) => {
    setShowMovie(!showMovie);
    const movieid = String(movie.id);
    getVideos(movieid);
  };

  const nextSlide = () => {
    const newIndex =
      currentIndex === Movies.length - 1 ? Movies.length - 1 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  if (error) {
    return (
      <>
        <h1
          style={{
            fontSize: "2rem",
            textAlign: "center",
            color: "red",
            marginTop: "2vh",
          }}
        >
          Sorry, Not Able to Fetch Upcoming Movies!
        </h1>
      </>
    );
  }
  return (
    <>
      <p className="movielist-title">Upcoming</p>
      <div className="slider-container">
        <div
          className="movie-slider"
          style={{ transform: `translateX(-${currentIndex * 4.3}%)` }}
        >
          {Movies.map((movie, index) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="slide"
            >
              <MovieCard url={movie.poster_path} />
            </div>
          ))}
        </div>
        <button className="prev-btn" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next-btn" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
      {showMovie && (
        <div className="moviecard-trailer">
          <YouTube
            videoId={Videos[1] ? Videos[1]?.key : Videos[0]?.key}
            opts={opts}
          />
        </div>
      )}
    </>
  );
};

export default Upcoming;
