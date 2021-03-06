import React, { useState, useEffect } from "react";
import "./ReviewsPage.css";
import ReviewComponent from "./ReviewComponent";
import { fireAuth, fireDb } from "./firebase";
import { useStateValue } from "./StateProvider";
import { animations } from "react-animation";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import Recommendations from "./Recommendations";

function ReviewsPage() {
  // get firebase movies collection
  const [{ reviews, user, movieId }, dispatch] = useStateValue();
  const [movies, setMovies] = useState([]);
  const [sign, setSign] = useState("");
  const [toreview, setToreview] = useState("");
  const [count, setCount] = useState(0);

  let h = [];
  useEffect(async () => {
    if (!fireAuth.currentUser && localStorage.user == "null") {
      setSign("Sign in");
      setToreview("to see your reviewed movies");
    }
    if (fireAuth.currentUser) {
      try {
        fireDb
          .ref("users/" + fireAuth.currentUser?.uid)
          .on("value", (snapshot) => {
            snapshot.forEach((snap) => {
              h.push(snap.val());
            });
            setMovies(h);
            setCount(h.length);
            if (
              h.length == 0 &&
              fireAuth.currentUser &&
              localStorage.user != "null"
            ) {
              setSign("Please review some movies first!");
            }
          });
      } catch {}
    } else {
      try {
        fireDb.ref("users/" + localStorage.user).on("value", (snapshot) => {
          snapshot.forEach((snap) => {
            h.push(snap.val());
          });

          setMovies(h);
          setCount(h.length);
          if (
            h.length == 0 &&
            fireAuth.currentUser &&
            localStorage.user != "null"
          ) {
            setSign("Please review some movies first!");
          }
        });
      } catch {}
    }
  }, []);

  const style = {
    animation: animations.fadeIn,
  };

  if (!fireAuth.currentUser) {
    return <Loading />;
  }

  return (
    <div className="reviewsPage">
      <img className="review__lights" src="/lights.png" alt="" />
      <Recommendations />
      <div className="review__count" style={style}>
        <span style={style}> You have reviewed {count} movies so far!</span>
      </div>
      <div className="review__container" style={style}>
        {movies
          .map((film) => film.movieId)
          .map((movie, idx) => (
            <ReviewComponent
              title={movie.movieTitle}
              image={movie.poster}
              rating={movie.rating}
              review={movie.review}
              id={movie.id}
              key={movie.id + "reviewspage" + idx}
            />
          ))}
      </div>
      <div className="empty">
        <span className="review__spans">
          <Link to="login" style={{ color: "#a19ff2" }}>
            {sign}
          </Link>{" "}
          <span className="review__spant">{toreview}</span>
        </span>
        <div className="review__empty"></div>
      </div>
    </div>
  );
}

export default ReviewsPage;
