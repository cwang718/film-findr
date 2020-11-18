import React, { useEffect, useState } from "react";
import Star from "./icons/Star.svg";
import "./CreateReview.css";
import { useStateValue } from "./StateProvider";
import { fireAuth, fireDb } from "./firebase";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function CreateReview({ movieId, title }) {
  const [state, action] = useStateValue();
  const [selected, setSelected] = useState(0);
  const [myReview, setMyReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [movieInfo, setMovieInfo] = useState([]);

  useEffect(async () => {
    let response = await axios({
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
      method: "GET",
    });
    setMovieInfo(response.data);
  }, []);

  let imgUrl;
  if (movieInfo.poster_path) {
    imgUrl = `https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`;
  } else {
    imgUrl = "./error.png";
  }

  const changeColor = (e) => {
    if (selected !== 0) {
      return;
    }

    let stars = [
      document.getElementById(`1star`),
      document.getElementById(`2star`),
      document.getElementById(`3star`),
      document.getElementById(`4star`),
      document.getElementById(`5star`),
    ];
    let cId = e.currentTarget.id;
    let realId = cId.slice(0, 1);
    let h = Number(realId);
    if (
      h == 1 &&
      stars[0].classList.contains("createR__star__yellow") &&
      !stars[1].classList.contains("createR__star__yellow") &&
      !stars[2].classList.contains("createR__star__yellow") &&
      !stars[3].classList.contains("createR__star__yellow") &&
      !stars[4].classList.contains("createR__star__yellow")
    ) {
      stars[0].classList.remove("createR__star__yellow");
    } else {
      for (let i = 0; i < 5; i++) {
        if (i <= h - 1) {
          stars[i].classList.add("createR__star__yellow");
        } else {
          stars[i].classList.remove("createR__star__yellow");
        }
      }
    }
  };

  const select = (e) => {
    let cId = e.currentTarget.id;
    let realId = cId.slice(0, 1);
    let h = Number(realId);

    setSelected(h);

    let stars = [
      document.getElementById(`1star`),
      document.getElementById(`2star`),
      document.getElementById(`3star`),
      document.getElementById(`4star`),
      document.getElementById(`5star`),
    ];
    for (let i = 0; i < 5; i++) {
      if (i < h) {
        if (!stars[i].classList.contains("createR__star__yellow")) {
          stars[i].classList.add("createR__star__yellow");
        }
      } else {
        if (stars[i].classList.contains("createR__star__yellow")) {
          stars[i].classList.remove("createR__star__yellow");
        }
      }
    }
  };

  const fiveStars = (index) => {
    return (
      <img
        src={Star}
        className={`createR__star`}
        id={`${index}star`}
        alt="star"
        onMouseOver={changeColor}
        onClick={select}
      />
    );
  };

  const handleSubmit = () => {
    if (myReview.length == 0) {
      setErrorMessage("Type something in the box first!");
    } else if (selected == 0) {
      setErrorMessage("Rate the movie using the stars!");
    } else {
      try {
        fireDb.ref("users/" + fireAuth.currentUser?.uid + "/" + movieId).set({
          movieId: {
            rating: selected,
            review: myReview,
            movieTitle: movieInfo.title,
            poster: imgUrl,
          },
        });
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div>
      <div className="createR">
        <div className="createR__rating">
          <div className="createR__your__rating">
            {fiveStars(1)}
            {fiveStars(2)}
            {fiveStars(3)}
            {fiveStars(4)}
            {fiveStars(5)}
          </div>
        </div>
        <div className="createR__text__container">
          {console.log(movieId)}
          <textarea
            className="createR__textarea"
            id="create_review_text"
            placeholder="Write a review"
            onChange={(e) => setMyReview(e.target.value)}
          ></textarea>
          <button className="signup__button" onClick={handleSubmit}>
            Save Review
          </button>
          <span className="signup__error">{errorMessage}</span>
        </div>
      </div>
    </div>
  );
}

export default CreateReview;
