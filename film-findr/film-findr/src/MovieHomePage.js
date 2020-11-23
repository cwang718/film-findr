import React, { useEffect, useState } from "react";
import "./MovieHomePage.css";
import { fireAuth, fireDb } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import Star from "./icons/Star.svg";

function MovieHomePage({ image, title, genres, rating, id }) {
  const history = useHistory();
  const [tooBig, setTooBig] = useState("movie__title");
  const [decimal, setDecimal] = useState(rating);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    if (title.length > 20) {
      setTooBig("movie__title__small");
    }
    let newR = rating.toFixed(1);
    setDecimal(newR);
  }, []);

  const linkToOneMovie = (e) => {
    //localStorage.setItem("movieId", 2);
    let movId = e.currentTarget.id;
    //localStorage.setItem("movieId", movId);
    dispatch({
      type: "SET_MOVIE_ID",
      movieId: movId,
    });
    history.push("/onemovie/" + movId);
  };

  return (
    <div className="movie">
      <div className="movie__rating">
        <span className="star__rating">
          <img
            src={Star}
            className={`star_other_yellow`}
            alt="ratingstars"
            style={{ width: "25px" }}
          />
          <span className="spacer">{decimal}</span>
        </span>
        <img
          className="star"
          src={image}
          alt="movie_poster"
          id={id}
          onClick={linkToOneMovie}
        />
        <h1 className={tooBig}>{title}</h1>
        <p className="movie__genres">{genres}</p>
      </div>
    </div>
  );
}

export default MovieHomePage;
