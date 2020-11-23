import React, { useEffect, useState } from "react";
import "./Home.css";
import MovieHomePage from "./MovieHomePage";
import { animations } from "react-animation";
import axios from "axios";
import Loading from "./Loading.js";
import HomeCarousel from "./HomeCarousel";

function Home() {
  const style = {
    animation: animations.fadeIn,
  };
  const [popularMoviesInfo, setPopularMoviesInfo] = useState([]);
  const [soonMovies, setSoonMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [select, setSelect] = useState("popular");
  useEffect(() => {
    async function fetchInfo() {
      if(select=="popular") {
        let response = await axios({
          url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_FIREBASE_imdb}&language=en-US&page=1`,
          method: "GET",
        });
        setPopularMoviesInfo(response.data.results);
      } else if(select=="toprated") {
        let response = await axios({
          url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_FIREBASE_imdb}&language=en-US&page=1`,
          method: "GET",
        });
        setPopularMoviesInfo(response.data.results);
      } 
      let soonResponse = await axios({
        url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_FIREBASE_imdb}&language=en-US&page=1`,
        method: "GET",
      })
      setSoonMovies(soonResponse.data.results);
      // }
      let genreResponse = await axios({
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_FIREBASE_imdb}&language=en-US`,
        method: "GET",
      });
      setGenreList(genreResponse.data.genres);
    }
    fetchInfo();
  }, [select]);

  const handleDropdownChange = (e) => {
    setSelect(e.target.value);
  }

  //.map((genre) => " " + genre.name)
  //.toString();
  if (popularMoviesInfo.length === 0) {
    return <Loading style={style} />;
  }
  return (
    <div className="home" style={style}>
      <div className="home__container">
        <img className="home__image" src="/lights.png" alt="" />
        <div className="home__carousel">
          <HomeCarousel upcomingmovies={soonMovies}></HomeCarousel>
        </div>
        <div className="selectCon">
          <label htmlFor="sort">Sort by: </label>
          <select className="sort" id="mySort" defaultValue="popular" onChange={handleDropdownChange}>
            <option value="popular">Popularity</option>
            <option value="toprated">Top rated</option>
          </select>
        </div>
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