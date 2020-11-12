import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(""); // the variable email will have whatever the user inputted
  const [password, setPassword] = useState(""); // the variable password will have whatever the user inputted

  const logIn = (e) => {
    e.preventDefault();

    // firebase log in here
  };

  return (
    <div className="main">
      <div className="login">
        <img className="lights" src="lights.png" alt="logo" />
        <Link to="/">
          <img className="login__logo" src="./logomovie.png" alt="logo" />
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
        <div className="empty"></div>
      </div>
    </div>
  );
}

export default Login;
