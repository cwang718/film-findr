import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recommendations.css";
import { fireAuth, fireDb } from "./firebase";
import { useStateValue } from "./StateProvider";

function Recommendations() {
  const [state, dispatch] = useStateValue();
  const [related, setRelated] = useState([]);
  const [movies, setMovies] = useState([]); // movies has all the ids we need
  let h = [];

  const getFirebase = async () => {
    if (fireAuth.currentUser) {
      try {
        fireDb
          .ref("users/" + fireAuth.currentUser?.uid)
          .on("value", (snapshot) => {
            snapshot.forEach((snap) => {
              h.push(snap.val());
            });
            dispatch({
              type: "ADD_REVIEW",
              reviews: h,
            });
          });
      } catch (err) {}
    } else {
      try {
        fireDb.ref("users/" + localStorage.user).on("value", (snapshot) => {
          snapshot.forEach((snap) => {
            h.push(snap.val());
          });
          dispatch({
            type: "ADD_REVIEW",
            reviews: h,
          });
        });
      } catch (err) {}
    }
  };

  const filterMovies = () => {
    let g = state.reviews.filter((review) => review.movieId.rating >= 4);
    dispatch({
      type: "ADD_REVIEW",
      reviews: g,
    });
  };

  const getMovies = async () => {
    let j = state.reviews;
    let o = [];
    j.map(async (f_id) => {
      let response = await axios({
        url: `https://api.themoviedb.org/3/movie/${f_id.movieId.id}/similar?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
        method: "GET",
      });
      //console.log(response.data.results);
      o.push(response.data.results);
    });
    //console.log(o);
    return o;
  };

  const extract = () => {
    let y = [];
    related.map((arr) => {
      arr.map((elm) => y.push(elm));
    });
    return y;
  };

  useEffect(async () => {
    getFirebase();
    filterMovies();
    let goodMovies = await getMovies();
    setRelated(goodMovies);
  }, []);
  // h is all movies on database that you have reviewed

  return (
    <>
      <div className="container">
        {related.map((src) => (
          <div
            key={src.id}
            className="card"
            style={{
              backgroundColor: "black",
            }}
          />
        ))}
      </div>
    </>
  );
}

export default Recommendations;
