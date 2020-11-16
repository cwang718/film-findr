import React, {  useEffect, useState } from "react";
import HeaderMain from "./HeaderMain";
import { useStateValue } from "./StateProvider";
import axios from 'axios';
import "./Home.css";
import "./OneMovie.css";

function OneMovie() {
  const [state, action] = useStateValue(); // get movie id by state.movieId
  const [movieInfo, setMovieInfo] = useState([]);
  console.log("onemovie: " + state.movieId);

  useEffect(async () => {
    let response = await axios({
      url: `https://api.themoviedb.org/3/movie/${state.movieId}?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
      method: 'GET',
    });
    setMovieInfo(response.data);
  }, []);
  let imgUrl = `https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`;

  return (
    <div className="onemovie">
      <HeaderMain></HeaderMain>
      <div className="home">
        <div className="home__container">
          <img className="home__image" src="./lights.png" alt="" />
        </div>
      </div>

      <div className="movie__container">
        <div>{console.log(movieInfo)}</div>
          <div className="moviename">{movieInfo.title}<span className="movieyear"> ({String(movieInfo.release_date).substr(0, 4)})</span></div>
          <div className="content__container">
              <div className="left__container">
                  <img src={imgUrl} className="poster" alt="movie_poster"/>
                  <div className="tagline">{movieInfo.tagline}</div>
              </div>
              <div className="right__container">
                <div className="rating">3</div>
              </div>
          </div>
      </div>

      
  </div>
  );
}

export default OneMovie;
