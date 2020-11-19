import React, { useEffect, useState } from "react";
import "./Review.css";
import Star from "./icons/Star.svg";
import CreateReview from "./CreateReview";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Review({ rating, review, image, title }) {
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [state, dispatch] = useStateValue();
  function editReview(e) {
    setIsEdit(true);
    history.push("./edit");
  }

  async function deleteReview(e) {
    let response2 = await axios({
      url: `https://${process.env.REACT_APP_FIREBASE_projectId}.firebaseio.com/users/${state.user.uid}/${state.movieId}.json`,
      method: "DELETE",
    });
    dispatch({
      type: "SET_EDIT",
      isEdited: !state.isEdited,
    });
    console.log(state.isEdited);
    //history.push("./reviews");
  }

  return (
    <div className="reviewT">
      <div className="reviewT__rating">
        <div className="reviewT__your__rating">
          {Array(rating)
            .fill()
            .map((rating) => (
              <img src={Star} className="createR__star__yellow" alt="star" />
            ))}
        </div>
      </div>
      <div className="reviewT__text__container">
        <div className="reviewT__your__review">
          <span>"{review}"</span>
        </div>
      </div>
      <div className="reviewT__buttons">
        <button className="signup__button" onClick={editReview}>
          edit
        </button>
        <button className="signup__button" onClick={deleteReview}>
          delete
        </button>
      </div>
    </div>
  );
}

export default Review;
