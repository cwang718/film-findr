import React, { useEffect, useState } from "react";
import "./Home.css";
import MovieHomePage from "./MovieHomePage";
import { animations } from "react-animation";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Loading from "./Loading.js";

function Home() {
  const style = {
    animation: animations.fadeIn,
  };
  const [popularMoviesInfo, setPopularMoviesInfo] = useState([]);
  const [genreList, setGenreList] = useState([]);
  useEffect(() => {
    async function fetchInfo() {
      let response = await axios({
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_FIREBASE_imdb}&language=en-US&page=1`,
        method: "GET",
      });
      setPopularMoviesInfo(response.data.results);

      let genreResponse = await axios({
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_FIREBASE_imdb}&language=en-US`,
        method: "GET",
      });
      setGenreList(genreResponse.data.genres);
    }
    fetchInfo();
  }, []);

  //.map((genre) => " " + genre.name)
  //.toString();
  if (popularMoviesInfo.length === 0) {
    return <Loading style={style} />;
  }
  return (
    <div className="home" style={style}>
      <div className="home__container">
        <img className="home__image" src="/lights.png" alt="" />
        <div className="grid-container">
          {popularMoviesInfo.map(
            ({ title, poster_path, genre_ids, vote_average, id }) => (
              <div className="grid-item" style={style}>
                <MovieHomePage
                  id={id}
                  title={title}
                  image={`https://image.tmdb.org/t/p/original/${poster_path}`}
                  genres={genreList
                    .filter((oneGenre) => genre_ids.includes(oneGenre.id))
                    .map((one) => " " + one.name)
                    .toString()}
                  rating={vote_average}
                  style={style}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
