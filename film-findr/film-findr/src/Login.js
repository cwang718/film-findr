import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
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
            placeholder="exampleemail@email.com"
            required
          ></input>
          <label className="login__labels">password:</label>
          <input
            type="password"
            className="login__password"
            name="password"
            placeholder="************"
            required
          ></input>
        </div>
        <button className="login__button">see your movies!</button>
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
