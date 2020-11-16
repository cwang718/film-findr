import React, { useState, useEffect } from "react";
import "./ReviewsPage.css";
import ReviewComponent from "./ReviewComponent";
import { fireAuth, fireDb } from "./firebase";
import { useStateValue } from "./StateProvider";
import { animations } from "react-animation";

function ReviewsPage() {
  // get firebase movies collection
  const [{ reviews, user }, dispatch] = useStateValue();
  const [critique, setCritique] = useState([]);
  const [movies, setMovies] = useState([]);
  let h = [];
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        fireDb
          .ref("users/" + fireAuth.currentUser.uid)
          .on("value", (snapshot) => {
            snapshot.forEach((snap) => {
              h.push(snap.val());
            });
            console.log(h);
            setMovies(h);
          });
      } catch {}
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const style = {
    animation: animations.fadeIn,
  };
  return (
    <div className="reviewsPage" style={style}>
      <img className="review__lights" src="./lights.png" alt="" />
      <div className="review__container">
        {movies.map((movie) => (
          <ReviewComponent
            title="{movie.title}"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            rating={movie.rating}
            review={movie.review}
          />
        ))}
      </div>
      <div className="empty"></div>
    </div>
  );
}

export default ReviewsPage;
