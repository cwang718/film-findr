import React from "react";
import "./Review.css";
import Star from "./icons/Star.svg";

function Review({ rating, review }) {
  return (
    <div className="reviewT">
      <div className="reviewT__rating">
        <div className="reviewT__your__rating">
          {Array(rating)
            .fill()
            .map((rating) => (
              <img src={Star} className="reviewT__star" alt="star" />
            ))}
        </div>
      </div>
      <div className="reviewT__text__container">
        <div className="reviewT__your__review">
          <span>"{review}"</span>
        </div>
      </div>
    </div>
  );
}

export default Review;
