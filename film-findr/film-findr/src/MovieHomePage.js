import React, { useEffect, useState } from "react";
import "./MovieHomePage.css";
import { fireAuth, fireDb } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";

function MovieHomePage({ image, title, genres, rating, id }) {
  const history = useHistory();
  const [tooBig, setTooBig] = useState("movie__title");
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    if (title.length > 20) {
      setTooBig("movie__title__small");
    }
  }, []);

  const linkToOneMovie = (e) => {
    //localStorage.setItem("movieId", 2);
    let movId = e.currentTarget.id;
    //localStorage.setItem("movieId", movId);
    dispatch({
      type: "SET_MOVIE_ID",
      movieId: movId,
    });
    history.push("/onemovie");
  };
 

  return (
    <div className="movie">
      <div className="movie__rating">
        <span>{rating}</span>
        <img
          className="star"
          src={image}
          alt="movie_poster"
          id={id}
          onClick={linkToOneMovie}
        />
      </div>
      <h1 className={tooBig}>{title}</h1>
      <p className="movie__genres">{genres}</p>
    </div>
  );
}

export default MovieHomePage;
