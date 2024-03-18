import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import YouTube from "react-youtube";

const api_key = "8699a49a5755d63f4f562e7f838cf0a5";

const opts = {
  width: "100%",
  height: "400px",
  playerVars: {
    autoplay: 1,
  },
};

const Popular = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [Movies, setMovies] = useState([]);
  const [Videos, setVideos] = useState([]);
  const [showMovie, setShowMovie] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovies(data.results);
          setSearchResults(data.results);
        });
    } catch (e) {
      console.error(e);
    }

    document.body.addEventListener("keydown", handleShortcut);
    return () => {
      document.body.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const getVideos = (movieid) => {
    try {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=${api_key}&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => setVideos(data.results));
    } catch (e) {
      console.error(e);
    }
  };

  const handleMovieClick = (movie) => {
    setShowMovie(!showMovie);
    console.log(showMovie);
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
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = Movies.filter((movie) => {
    return Object.values(movie)[5]
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const handleShortcut = (event) => {
    console.log(event);
    if (event.ctrlKey && event.key === "k") {
      // Ctrl + K shortcut is pressed
      event.preventDefault(); // Prevent browser's default Ctrl + K behavior
      // Set focus to the search input field
      document.getElementById("searchInput").focus();
    }
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
          Sorry, Not Able to Fetch Popular Movies!
        </h1>
      </>
    );
  }

  return (
    <>
      <div
        onKeyDown={handleShortcut}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="movielist-title">Popular</p>
        <input
          type="text"
          id="searchInput"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleInputChange}
          className="popularmovie-inputtag"
          style={{
            width: "15vw",
            height: "3vh",
            margin: "0 2vw",
            backgroundColor: "white",
            padding: "1vh",
          }}
        />
      </div>

      <div className="slider-container">
        {filteredItems.length ? (
          <div
            className="movie-slider"
            style={{ transform: `translateX(-${currentIndex * 4.3}%)` }}
          >
            {filteredItems.toReversed().map((movie, index) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
                className="slide"
              >
                <MovieCard url={movie.poster_path} />
              </div>
            ))}
          </div>
        ) : (
          <h1
            style={{ fontSize: "3rem", textAlign: "center", color: "#FF204E" }}
          >
            No Movies Found !
          </h1>
        )}
        <button className="prev-btn" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next-btn" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
      {showMovie && (
        <div className={`moviecard-trailer ${showMovie ? "active" : ""}`}>
          <YouTube
            videoId={Videos[1] ? Videos[1]?.key : Videos[0]?.key}
            opts={opts}
          />
        </div>
      )}
    </>
  );
};

export default Popular;
