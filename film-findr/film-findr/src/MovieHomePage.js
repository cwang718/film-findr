import React from "react";
import "./MovieHomePage.css";

function MovieHomePage({ image, title, genres, rating }) {
  return (
    <div className="movie">
      <div className="movie__rating">
        <span>{rating}</span>
        <img src={image} alt="movie_poster" />
      </div>
      <h1 className="movie__title">{title}</h1>
      <p className="movie__genres">{genres}</p>
    </div>
  );
}

export default MovieHomePage;
