import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

function signup() {
  return (
    <div className="main">
      <div className="signup">
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
            required
          ></input>
          <label className="signup__labels">email:</label>
          <input
            type="email"
            className="signup__email"
            name="email"
            placeholder="exampleemail@email.com"
            required
          ></input>
          <label className="signup__labels">password:</label>
          <input
            type="password"
            className="signup__password"
            name="password"
            placeholder="************"
            required
          ></input>
        </div>
        <button className="signup__button">create account</button>
        <div className="empty"></div>
      </div>
    </div>
  );
}

export default signup;
