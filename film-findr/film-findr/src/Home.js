import React, { useEffect, useState } from "react";
import "./Home.css";
import MovieHomePage from "./MovieHomePage";
import { animations } from "react-animation";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Home() {
  const style = {
    animation: animations.fadeIn,
  };
  const history = useHistory();
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
  const linkToOneMovie = (e) => {
    //localStorage.setItem("movieId", 2);
    console.log("hey");
  };
  //.map((genre) => " " + genre.name)
  //.toString();
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src="./lights.png" alt="" />

        <div className="grid-container" style={style}>
          {popularMoviesInfo.map(
            ({ title, poster_path, genre_ids, vote_average, id }) => (
              <div className="grid-item">
                <MovieHomePage
                  className="grid-item"
                  id={id}
                  title={title}
                  image={`https://image.tmdb.org/t/p/original/${poster_path}`}
                  genres={genreList
                    .filter((oneGenre) => genre_ids.includes(oneGenre.id))
                    .map((one) => " " + one.name)
                    .toString()}
                  rating={vote_average}
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
