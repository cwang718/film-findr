import React, { useEffect, useMountEffect } from "react";
import "./MovieHomePage.css";
import { fireAuth, fireDb } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";

function MovieHomePage({ image, title, genres, rating, id }) {
  const history = useHistory();
  const linkToOneMovie = (e) => {
    //localStorage.setItem("movieId", 2);
    let movId = e.currentTarget.id;
    localStorage.setItem("movieId", movId);
    history.push("/onemovie");
  };
  return (
    <div className="movie">
      <div className="movie__rating">
        <span>{rating}</span>
        <img src={image} alt="movie_poster" id={id} onClick={linkToOneMovie} />
      </div>
      <h1 className="movie__title">{title}</h1>
      <p className="movie__genres">{genres}</p>
    </div>
  );
}

export default MovieHomePage;
