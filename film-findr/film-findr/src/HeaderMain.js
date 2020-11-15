import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./HeaderMain.css";
import SearchIcon from "./icons/SearchIcon.svg";
import { useStateValue } from "./StateProvider";
import { fireAuth } from "./firebase";
import Searchbar from "./Searchbar.js";

function HeaderMain() {
  const [state, action] = useStateValue(); // get user by state.user and get reviews by state.reviews
  const history = useHistory();
  const handleLogInOrReviews = () => {
    console.log(state.user);
    if (state.user) {
      // is there someone logged in????
      console.log(state.user);
      // go to reviews page
      history.push("./reviews"); //redirect to the reviews path
    } else {
      history.push("./login");
    }
  };

  const handleCreateOrLogOut = () => {
    if (state.user) {
      // is there someone logged in????
      console.log(state.user);
      fireAuth.signOut();
      history.push("./");
      // go to reviews page
    } else {
      history.push("./signup");
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src="logomovie.png" alt="logo" />
      </Link>

      <Searchbar></Searchbar>

      <div className="header__nav">
        <div onClick={handleLogInOrReviews} className="header__option">
          <span className="header__optionLog">
            {!state.user ? "log in" : "reviews"}
          </span>
        </div>

        <div onClick={handleCreateOrLogOut} className="header__option">
          <span className="header__optionSign">
            {!state.user ? "create account" : "log out"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeaderMain;
