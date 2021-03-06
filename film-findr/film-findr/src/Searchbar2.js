import React, { useState } from "react";
import SearchIcon from "./icons/SearchIcon.svg";
// import autocomplete from "./Autocomplete.js";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { debounce } from "debounce";
import "./HeaderMain.css";
import "./Searchbar.css";
import axios from "axios";

const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=" +
  process.env.REACT_APP_FIREBASE_imdb +
  "&query=";

async function httpGetMovies(title) {
  if (document.getElementById("myInput").value) {
    let response = await axios({
      method: "GET",
      url: searchUrl + title,
    });
    return response.data.results;
  }
  // let response = fetch(searchUrl + title)
  //   .then((response) => response.json())
  //   .then((data) => data.results);
  return; //returns array of movies
}

const autocomplete = (arr) => {
  let curFocus;
  let a,
    b,
    i,
    val = document.getElementById("myInput").value.toUpperCase();
  curFocus = -1;
  //Closes any open list of autocomplete values
  closeAllLists();
  if (!val) {
    return false;
  }
  a = document.createElement("div");

  //div that contains suggestions
  a.setAttribute(
    "id",
    document.getElementById("myInput").id + "autocomplete-list"
  );
  a.setAttribute("class", "autocomplete-items");
  document.getElementById("myInput").parentNode.appendChild(a);

  for (i = 0; i < arr.length; i++) {
    //Check if item starts with same letters as text field value
    if (
      arr[i].title.substring(0, val.length).toUpperCase() === val.toUpperCase()
    ) {
      //Make div for matching element
      b = document.createElement("div");
      //Make matching letters bold
      b.innerHTML =
        "<strong>" + arr[i].title.substring(0, val.length) + "</strong>";
      b.innerHTML += arr[i].title.substring(val.length);
      b.innerHTML += "  (" + arr[i].release_date.substring(0, 4) + ")";
      //Make new input field that holds current arrr item's value
      b.innerHTML +=
        "<input type='hidden' value='" +
        arr[i].title +
        " (" +
        arr[i].release_date.substring(0, 4) +
        ")' data-mid=" +
        arr[i].id +
        ">";
      //Execute function when someone clicks on a suggestion
      b.addEventListener("click", function (e) {
        //Insert value for autocomplete text field
        document.getElementById("myInput").value = this.children[1].value;
        //Close list of autocompleted values
        closeAllLists();
        //Returns data-mid with the movie id
        // return this.children[1].getAttribute("data-mid");
        let mid = this.children[1].getAttribute("data-mid");
        document.getElementById("myInput").setAttribute("data-mid", mid);
      });
      a.appendChild(b);
    }
  }

  //Execute a function on keypresses
  let fired = false;
  document.getElementById("myInput").addEventListener("keydown", function (e) {
    if (!fired) {
      fired = true;
      let x = document.getElementById(
        document.getElementById("myInput").id + "autocomplete-list"
      );
      if (x) {
        x = x.getElementsByTagName("div");
      }
      if (e.keyCode === 40) {
        //Down key press => increase curFocus
        curFocus++;
        //Make current item more visible
        addActive(x);
      } else if (e.keyCode === 38) {
        //Up key press => decrease curFocus
        curFocus--;
        //Make current item more visible
        addActive(x);
      } else if (e.keyCode === 13) {
        //Enter key is pressed, prevent form from being submitted
        e.preventDefault();
        if (curFocus > -1) {
          //Simulate a click on active item
          if (x) {
            x[curFocus].click();
            // return x[curFocus].children[1].getAttribute("data-mid");
            document
              .getElementById("myInput")
              .setAttribute(
                "data-mid",
                x[curFocus].children[1].getAttribute("data-mid")
              );
          }
        }
      }
    }
  });
  // a.appendChild(b);

  document.getElementById("myInput").addEventListener("keyup", function (e) {
    fired = false;
  });

  function addActive(x) {
    //Function to classify if item is active
    if (!x) {
      return false;
    }
    removeActive(x);
    if (curFocus >= x.length) {
      curFocus = 0;
    }
    if (curFocus < 0) {
      curFocus = x.length - 1;
    }

    //Add class "autocomplete-active"
    x[curFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    //Function to remove active class from autocomplete list
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elt) {
    //Close all autocomplete lists
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elt !== x[i] && elt !== document.getElementById("myInput")) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
};

async function getHttpAndSearch() {
  let word = document.getElementById("myInput").value;
  try {
    await httpGetMovies(word).then((result) => autocomplete(result));
  } catch (e) {}

  // autocomplete(document.getElementById("myInput"), searchtitle);
}

function Searchbar2() {
  const [search, setSearch] = useState("");
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  return (
    <div className="header__search">
      <form autoComplete="off">
        <p className="autocomplete">
          <input
            className="header__searchInput"
            id="myInput"
            type="text"
            data-mid=""
            onChange={debounce(getHttpAndSearch, 500)}
            placeholder="search for a movie..."
          />
        </p>
      </form>

      <button
        className="searchbutton header__searchIcon"
        onClick={function () {
          let mid = document.getElementById("myInput").getAttribute("data-mid");
          if (document.getElementById("myInput").value !== "" || null) {
            dispatch({
              type: "SET_MOVIE_ID",
              movieId: mid,
            });
            //localStorage.setItem("movieId", mid);
            history.push("/onemovie/" + mid);
          }
        }}
      >
        <img src={SearchIcon} id="searchicon" alt="search" />
      </button>
    </div>
  );
}

export default Searchbar2;
