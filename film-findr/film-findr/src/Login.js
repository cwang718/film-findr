import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { fireAuth } from "./firebase";
import { animations } from "react-animation";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState(""); // the variable email will have whatever the user inputted
  const [password, setPassword] = useState(""); // the variable password will have whatever the user inputted
  const [errorMessage, setErrorMessage] = useState("");

  const logIn = (e) => {
    e.preventDefault();
    fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          // if there is a user
          localStorage.setItem("user", auth.user.uid);
          history.push("/");
        }
      })
      .catch((err) => setErrorMessage(err.message));
    // firebase log in here
  };
  const style = {
    animation: animations.fadeIn,
  };
  return (
    <div className="main">
      <div className="login" style={style}>
        <img className="lights" src="lights.png" alt="logo" />
        <Link to="/">
          <img className="login__logo" src="/logomovie.png" alt="logo" />
        </Link>

        <div className="login_fields">
          <label className="login__labels">email:</label>
          <input
            type="email"
            className="login__email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exampleemail@email.com"
            required
          ></input>
          <label className="login__labels">password:</label>
          <input
            type="password"
            className="login__password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="************"
            required
          ></input>
        </div>
        <button className="login__button" onClick={logIn}>
          see your movies!
        </button>
        <Link
          to="signup"
          className="login__link"
          style={{ textDecoration: "none" }}
        >
          <span className="login__dont">don’t have an account?</span>
          <span className="login__create">create account</span>
        </Link>
        <h1 className="signup__error">{errorMessage}</h1>
        <div className="empty"></div>
      </div>
    </div>
  );
}

export default Login;
