import React, { useState, useEffect } from "react";
import "./Recommendations.css";
import { useStateValue } from "./StateProvider";
import getRecommendations from "./getRecommendations";
import { useHistory, useParams } from "react-router-dom";

function Recommendations() {
  const [state, dispatch] = useStateValue();
  const [movies, setMovies] = useState([]); // movies has all the ids we need
  const [similar, setSimilar] = useState("");
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  const onImageClick = function (e) {
    let mid = e.currentTarget.id.slice(3);

    dispatch({
      type: "SET_MOVIE_ID",
      movieId: mid,
    });
    history.push("/onemovie/" + mid);
  };
  useEffect(() => {
    async function fetchInfo() {
      let response = await getRecommendations();
      // console.log(
      //   response,
      //   "response, which should be an array of recommendations"
      // );

      //console.log("got recs", response);
      setMovies(response);
    }
    fetchInfo();
  }, [state.user, state.movieId, loaded]);
  // h is all movies on database that you have reviewed

  return (
    <>
      <div className="span__container">
        <span className="reviews_span_movies">
          {movies.length > 0 ? "Recommended movies: " : ""}
        </span>
      </div>
      <div className="container">
        {movies.map((src) => (
          <div
            key={src.id}
            className="card"
            style={{
              backgroundImage:
                src.poster_path !== ""
                  ? `url(https://image.tmdb.org/t/p/original/${src.poster_path})`
                  : "url(/error.png)",
            }}
            id={`div${src.id}`}
            onClick={onImageClick}
          />
        ))}
      </div>
    </>
  );
}

export default Recommendations;
