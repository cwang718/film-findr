import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import HeaderMain from "./HeaderMain";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <HeaderMain />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;