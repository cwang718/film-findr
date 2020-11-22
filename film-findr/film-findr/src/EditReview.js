import React, { useEffect, useState } from "react";
import Star from "./icons/Star.svg";
import "./EditReview.css";
import { useStateValue } from "./StateProvider";
import { fireAuth, fireDb } from "./firebase";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

function EditReview() {
  const [state, action] = useStateValue();
  const [selected, setSelected] = useState(0);
  const [myReview, setMyReview] = useState("");
  const [oldReview, setOldReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [movieInfo, setMovieInfo] = useState([]);
  const { film_id } = useParams();

  useEffect(async () => {
    if (!fireAuth.currentUser && localStorage.user == "null") {
      history.push("/login");
    }
    if (fireAuth.currentUser) {
      let response = await axios({
        url: `https://api.themoviedb.org/3/movie/${film_id}?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
        method: "GET",
      });
      let response2 = await axios({
        url: `https://${process.env.REACT_APP_FIREBASE_projectId}.firebaseio.com/users/${state.user?.uid}/${film_id}/movieId.json`,
        method: "GET",
      });
      setMovieInfo(response.data);
      setOldReview(response2.data);
    } else {
      let response = await axios({
        url: `https://api.themoviedb.org/3/movie/${film_id}?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
        method: "GET",
      });
      let response2 = await axios({
        url: `https://${process.env.REACT_APP_FIREBASE_projectId}.firebaseio.com/users/${localStorage.user}/${film_id}/movieId.json`,
        method: "GET",
      });
      setMovieInfo(response.data);
      setOldReview(response2.data);
    }
  }, [state.user]);

  let imgUrl;
  if (movieInfo.poster_path) {
    imgUrl = `https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`;
  } else {
    imgUrl = "/error.png";
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
        fireDb.ref("users/" + fireAuth.currentUser?.uid + "/" + film_id).set({
          movieId: {
            rating: selected,
            review: myReview,
            movieTitle: movieInfo.title,
            poster: imgUrl,
            id: film_id,
          },
        });
        history.push("/onemovie/" + film_id);
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
  };

  const handleImageClick = () => {
    history.push("/onemovie/" + film_id);
  };

  if (!state.user) {
    return <Loading />;
  }

  return (
    <div className="testing">
      <div className="movie__info">
        <div className="moviename">{movieInfo.title}</div>
        <img
          src={imgUrl}
          className="poster"
          alt="movie_poster"
          onClick={handleImageClick}
        />
      </div>
      <div className="edit">
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
          {}
          <textarea
            className="createR__textarea"
            id="create_review_text"
            placeholder={`You rated ${String(oldReview.movieTitle)} ${
              oldReview.rating
            } out of 5 stars and said " ${oldReview.review} "`}
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

export default EditReview;
