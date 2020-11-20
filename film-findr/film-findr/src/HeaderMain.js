import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./HeaderMain.css";
import SearchIcon from "./icons/SearchIcon.svg";
import { useStateValue } from "./StateProvider";
import { fireAuth } from "./firebase";
import { animations } from "react-animation";
import Searchbar2 from "./Searchbar2.js";

function HeaderMain() {
  const style = {
    animation: animations.fadeIn,
  };
  const [state, action] = useStateValue(); // get user by state.user and get reviews by state.reviews
  const history = useHistory();
  const handleLogInOrReviews = () => {
 
    if (state.user) {
      // is there someone logged in????
    
      // go to reviews page
      history.push("./reviews"); //redirect to the reviews path
    } else {
      history.push("./login");
    }
  };

  const handleCreateOrLogOut = () => {
    if (state.user) {
      // is there someone logged in????
  
      fireAuth.signOut();
      localStorage.setItem("user", null);
      history.push("./");
      // go to reviews page
    } else {
      history.push("./signup");
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="logomovie.png"
          alt="logo"
          style={style}
        />
      </Link>

      <Searchbar2></Searchbar2>

      <div className="header__nav" style={style}>
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
