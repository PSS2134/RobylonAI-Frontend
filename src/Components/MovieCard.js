import React, { useState } from "react";
import "./MovieCard.css";

const MovieCard = ({ url }) => {
  console.log(url);
  const [movie, setMovie] = useState(false);
  return (
    <div>
      <div className="moviecard-box">
        <div className="moviecard-img-box">
          <img
            className="moviecard-img"
            src={`https://image.tmdb.org/t/p/w500${url}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
