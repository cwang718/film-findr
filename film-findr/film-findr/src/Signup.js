import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState(""); // the variable name will have whatever the user inputted
  const [email, setEmail] = useState(""); // the variable email will have whatever the user inputted
  const [password, setPassword] = useState(""); // the variable password will have whatever the user inputted
  const handlesignUp = (e) => {
    e.preventDefault();

    // firebase sign up here
  };
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
        <div className="empty"></div>
      </div>
    </div>
  );
}

export default Signup;
