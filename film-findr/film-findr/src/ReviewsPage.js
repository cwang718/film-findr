import React, { useState, useEffect } from "react";
import "./ReviewsPage.css";
import ReviewComponent from "./ReviewComponent";
import { fireAuth, fireDb } from "./firebase";
import { useStateValue } from "./StateProvider";
import { animations } from "react-animation";
import { Link } from "react-router-dom";

function ReviewsPage() {
  // get firebase movies collection
  const [{ reviews, user }, dispatch] = useStateValue();
  const [critique, setCritique] = useState([]);
  const [movies, setMovies] = useState([]);
  const [member, setMember] = useState([]);
  const [sign, setSign] = useState("");
  const [toreview, setToreview] = useState("");
  const [count, setCount] = useState(0);

  let h = [];
  useEffect(() => {
    if (!fireAuth.currentUser && localStorage.user == "null") {
      setSign("Sign in");
      setToreview("to see your reviewed movies");
    }
    if (fireAuth.currentUser) {
      try {
        console.log("users/" + fireAuth.currentUser?.uid, "fireAuth");
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
        console.log("users/" + localStorage.user, "localStorage");
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
  return (
    <div className="reviewsPage">
      <img className="review__lights" src="./lights.png" alt="" />
      <div className="review__count" style={style}>
        <span style={style}> You have reviewed {count} movies so far!</span>
      </div>
      <div className="review__container" style={style}>
        {movies
          .map((film) => film.movieId)
          .map((movie) => (
            <ReviewComponent
              title={movie.movieTitle}
              image={movie.poster}
              rating={movie.rating}
              review={movie.review}
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
