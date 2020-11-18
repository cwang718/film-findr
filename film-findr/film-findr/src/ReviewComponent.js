import React from "react";
import "./ReviewComponent.css";
import Star from "./icons/Star.svg";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function ReviewComponent({ image, title, rating, review, id }) {
  return (
    <div className="reviewC">
      <div className="reviewC__rating">
        <div className="reviewC__title">{title}</div>
        <div className="reviewC__your__rating">
          {Array(rating)
            .fill()
            .map((rating) => (
              <img src={Star} className="reviewC__star" alt="star" />
            ))}
        </div>
      </div>
      <div className="reviewC__text__container">
        <img src={image} alt="movie_poster" />
        <div className="reviewC__your__review">
          <span>"{review}"</span>
        </div>
      </div>
    </div>
  );
}

export default ReviewComponent;
