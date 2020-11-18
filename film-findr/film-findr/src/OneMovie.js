import React, { useEffect, useState } from "react";
import HeaderMain from "./HeaderMain";
import { useStateValue } from "./StateProvider";
import { fireAuth, fireDb } from "./firebase";
import axios from "axios";
import "./Home.css";
import "./OneMovie.css";
import { Link } from "react-router-dom";
import Review from "./Review";
import CreateReview from "./CreateReview";
import { animations } from "react-animation";

function OneMovie() {
  const [state, action] = useStateValue(); // get movie id by state.movieId
  const [movieInfo, setMovieInfo] = useState([]);
  const [cast, setCast] = useState([]);
  const [sign, setSign] = useState("");
  const [toreview, setToreview] = useState("");
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState(0);

  let h = [];
  let reloadMovie;
  const style = {
    animation: animations.fadeIn,
  };
  useEffect(async () => {
    if (state.movieId) {
      reloadMovie = state.movieId;
      console.log(
        reloadMovie,
        "reload",
        "movieId",
        state.movieId,
        "while localStorage has " + localStorage.movieId
      );
    } else {
      reloadMovie = localStorage.movieId;
      console.log(reloadMovie, "reload", "localStorage", localStorage.movieId);
    }
    if (!fireAuth.currentUser && localStorage.user == "null") {
      setSign("Sign in");
      setToreview("to see your reviewed movies");
    }

    if (fireAuth.currentUser) {
      try {
        fireDb
          .ref("users/" + fireAuth.currentUser?.uid + "/" + reloadMovie)
          .on("value", (snapshot) => {
            snapshot.forEach((snap) => {
              h.push(snap.val());
            });
            setMovies(h);
            setCount(h.length);
          });
      } catch {
        
      }
    } else {
      try {
        fireDb
          .ref("users/" + localStorage.user + "/" + reloadMovie)
          .on("value", (snapshot) => {
            snapshot.forEach((snap) => {
              h.push(snap.val());
            });
            setMovies(h);
            setCount(h.length);
          });
      } catch {
        //console.log("no review");
      }
    }
    let response = await axios({
      url: `https://api.themoviedb.org/3/movie/${reloadMovie}?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
      method: "GET",
    });

    let response2 = await axios({
      url: `https://api.themoviedb.org/3/movie/${reloadMovie}/credits?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
      method: "GET",
    });
    setMovieInfo(response.data);
    setCast(response2.data);
  }, []);
  let imgUrl;
  if (movieInfo.poster_path) {
    imgUrl = `https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`;
  } else {
    imgUrl = "./error.png";
  }

  const genres = () => {
    try {
      return movieInfo.genres
        .slice(0, 3)
        .map((genre) => " " + genre.name)
        .toString();
    } catch {
      return "no genres found";
    }
  };

  const actors = () => {
    try {
      return cast.cast
        .map((actor) => actor.name)
        .slice(0, 3)
        .map((genre) => " " + genre)
        .toString();
    } catch {
      return "no actors found in the database";
    }
  };

  const director = () => {
    try {
      return cast.crew.find((c) => c.job === "Director").name;
    } catch {
      return "no director found in the database";
    }
  };
  const overview = () => {
    try {
      return movieInfo.overview;
    } catch {
      return "no plot summary found in the database";
    }
  };

  const test = () => {
    if (!fireAuth.currentUser && localStorage.user == "null") {
      return (
        <span className="review__spans">
          <Link to="login" style={{ color: "#a19ff2" }}>
            {sign}
          </Link>{" "}
          <span className="review__spant">{toreview}</span>
        </span>
      );
    }
    if (movies.length !== 0) {
      return (
        <div className="review__true">
          <Review rating={movies[0].rating} review={movies[0].review} />
        </div>
      );
    } else {
      return (
        <CreateReview
          movieId={state.movieId ? state.movieId : localStorage.movieId}
        />
      );
    }
  };

  return (
    <div className="onemovie" style={style}>
      <div className="home">
        <img className="home__image" src="./lights.png" alt="" />
        <div className="home__container"></div>
      </div>

      <div className="movie__container">
        <div>
          <div>{} </div>

          <div className="moviename">
            {movieInfo.title}
            <span className="movieyear">
              {" "}
              ({String(movieInfo.release_date).substr(0, 4)})
            </span>
          </div>
          <div className="content__container">
            <div className="left__container">
              <img src={imgUrl} className="poster" alt="movie_poster" />
              <div className="tagline">{movieInfo.tagline}</div>
            </div>
            <div className="right_container">
              <div className="rating">
                <span className="rating__title">RATING</span>
                <span className="rating__count">{movieInfo.vote_average}</span>
              </div>
              <div className="info">
                <div className="info__container">
                  <span className="info__title">Genre: </span>
                  <span className="info__value">{genres()}</span>
                </div>
                <div className="info__container">
                  <span className="info__title">Director: </span>
                  <span className="info__value">{director()}</span>
                </div>
                <div className="info__container">
                  <span className="info__title">Cast: </span>
                  <span className="info__value">{actors()}</span>
                </div>
                <div className="info__container">
                  <span className="info__overview">{overview()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="your_review">{test()}</div>
    </div>
  );
}

export default OneMovie;
