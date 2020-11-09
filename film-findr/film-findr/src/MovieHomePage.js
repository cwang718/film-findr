import React from "react";

function MovieHomePage({ image, title }) {
  return (
    <div className="movie">
      <img className="movie__image" src={image} />
      <p className="movie__title">{title}</p>
    </div>
  );
}

export default MovieHomePage;