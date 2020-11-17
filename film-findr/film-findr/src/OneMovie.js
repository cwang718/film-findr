import React, { useEffect, useState } from "react";
import HeaderMain from "./HeaderMain";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import "./Home.css";
import "./OneMovie.css";

function OneMovie() {
  const [state, action] = useStateValue(); // get movie id by state.movieId
  const [movieInfo, setMovieInfo] = useState([]);
  const [cast, setCast] = useState([]);
  console.log("onemovie: " + state.movieId);

  useEffect(async () => {
    let response = await axios({
      url: `https://api.themoviedb.org/3/movie/${state.movieId}?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
      method: "GET",
    });

    let response2 = await axios({
      url: `https://api.themoviedb.org/3/movie/${state.movieId}/credits?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
      method: "GET",
    });
    setMovieInfo(response.data);
    setCast(response2.data);
  }, []);
  let imgUrl = `https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`;
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
  return (
    <div className="onemovie">
      <HeaderMain></HeaderMain>
      <div className="home">
        <div className="home__container">
          <img className="home__img" src="./lights.png" alt="" />
        </div>
      </div>

      <div className="movie__container">
        <div>
          <div>{console.log(genres())} </div>

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
            <div className="right__container">
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
                <span className="info__overview">{overview()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneMovie;
