import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import HeaderMain from "./HeaderMain";
import Login from "./Login";
import Signup from "./Signup";
import ReviewsPage from "./ReviewsPage";
import { fireAuth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    fireAuth.onAuthStateChanged((authUser) => {
      // if someone logs in or logs out
      //console.log(authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
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
          <Route exact path="/reviews">
            <HeaderMain />
            <ReviewsPage />
          </Route>
          <Route exact path="/">
            <HeaderMain />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
