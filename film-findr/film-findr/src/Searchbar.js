import React from "react";
import SearchIcon from "./icons/SearchIcon.svg";
import autocomplete from "./Autocomplete.js";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
// import { debounce } from "debounce";
import "./HeaderMain.css";
import "./Searchbar.css";

export default class Searchbar extends React.Component {
<<<<<<< Updated upstream
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      placeholder: "search for a movie...",
    };
=======
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
>>>>>>> Stashed changes

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    this.setState({ value: event.target.value });
    let searchtitle = await httpGetMovies(this.state.value);
    console.log(autocomplete(document.getElementById("myInput"), searchtitle));
  }

<<<<<<< Updated upstream
  render() {
    return (
      <div className="header__search">
        <form autoComplete="off">
          <p className="autocomplete">
            <input
              className="header__searchInput"
              id="myInput"
              type="text"
              onChange={this.handleChange}
              placeholder={this.state.placeholder}
            />
          </p>
        </form>
        <Link to="/example">
          <button className="searchbutton header__searchIcon" data-mid="">
            <img src={SearchIcon} id="searchicon" alt="search" />
          </button>
        </Link>
      </div>
    );
  }
}

Searchbar.handleMovieId = (type, mid) => {
  // let movie_id = 0;
  // if(type==="set") {
  //     movie_id = mid;
  // } else if(type==="get") {
  //     return movie_id;
  // }
};

const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=" +
  process.env.REACT_APP_FIREBASE_imdb +
  "&query=";
=======
    render() {
        return (
            <div className="header__search">
                <form autoComplete="off">
                    <p className="autocomplete">
                        <input className="header__searchInput" id="myInput" type="text" onChange={this.handleChange} placeholder='search for a movie...' />
                    </p>
                </form>
                <Link to="/example">
                    <button className="searchbutton header__searchIcon" data-mid="">
                        <img src={SearchIcon} id="searchicon" alt="search" />
                    </button>
                </Link>
            </div>
        );
    }
}

const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + process.env.REACT_APP_FIREBASE_imdb + '&query=';
>>>>>>> Stashed changes

function httpGetMovies(title) {
  let response = fetch(searchUrl + title)
    .then((response) => response.json())
    .then((data) => data.results);
  return response;
}
