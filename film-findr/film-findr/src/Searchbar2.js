import React, { useState } from "react";
import SearchIcon from "./icons/SearchIcon.svg";
import autocomplete from "./Autocomplete.js";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
// import { debounce } from "debounce";
import "./HeaderMain.css";
import "./Searchbar.css";

const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=" +
  process.env.REACT_APP_FIREBASE_imdb +
  "&query=";

function httpGetMovies(title) {
  let response = fetch(searchUrl + title)
    .then((response) => response.json())
    .then((data) => data.results);
  return response;
}

function Searchbar2() {
  const [search, setSearch] = useState("");
  const [state, dispatch] = useStateValue();

  return (
    <div className="header__search">
      <form autoComplete="off">
        <p className="autocomplete">
          <input
            className="header__searchInput"
            id="myInput"
            type="text"
            data-mid=""
            onChange={async function (e) {
              setSearch(e.target.value);
              let searchtitle = await httpGetMovies(search);
              autocomplete(document.getElementById("myInput"), searchtitle);
            }}
            placeholder="search for a movie..."
          />
        </p>
      </form>
      <Link to="/onemovie">
        <button
          className="searchbutton header__searchIcon"
          onClick={function () {
            let mid = document
              .getElementById("myInput")
              .getAttribute("data-mid");
            dispatch({
              type: "SET_MOVIE_ID",
              movieId: mid,
            });
            localStorage.setItem("movieId", mid);
          }}
        >
          <img src={SearchIcon} id="searchicon" alt="search" />
        </button>
      </Link>
    </div>
  );
}

export default Searchbar2;
