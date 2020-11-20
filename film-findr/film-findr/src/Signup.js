import React, { useState } from "react";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import { fireAuth, fireDb } from "./firebase";
import { animations } from "react-animation";
function Signup() {
  const history = useHistory();
  const [name, setName] = useState(""); // the variable name will have whatever the user inputted
  const [email, setEmail] = useState(""); // the variable email will have whatever the user inputted
  const [password, setPassword] = useState(""); // the variable password will have whatever the user inputted
  const [errorMessage, setErrorMessage] = useState("");
  const handlesignUp = (e) => {
    e.preventDefault();
    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          // if there is a user
          localStorage.setItem("user", auth.user.uid);
          history.push("./");
        }
      })
      .catch((err) => setErrorMessage(err.message));
    // firebase sign up here
  };
  const style = {
    animation: animations.fadeIn,
  };
  return (
    <div className="main">
      <div className="signup" style={style}>
        <img className="lights" src="lights.png" alt="logo" />
        <Link to="/">
          <img className="signup__logo" src="./logomovie.png" alt="logo" />
        </Link>
        <div className="signup_fields">
          <label className="signup__labels">name:</label>
          <input
            type="name"
            className="signup__email"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <label className="signup__labels">email:</label>
          <input
            type="email"
            className="signup__email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exampleemail@email.com"
            required
          ></input>
          <label className="signup__labels">password:</label>
          <input
            type="password"
            className="signup__password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="************"
            required
          ></input>
        </div>
        <button className="signup__button" onClick={handlesignUp}>
          create account
        </button>
        <h1 className="signup__error">{errorMessage}</h1>
        <div className="empty"></div>
      </div>
    </div>
  );
}

export default Signup;
