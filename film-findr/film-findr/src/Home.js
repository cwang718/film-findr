import React from "react";
import "./Home.css";
import MovieHomePage from "./MovieHomePage";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src="./lights.png" alt="" />

        <div className="home__row">
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
        </div>

        <div className="home__row">
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
        </div>

        <div className="home__row">
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
          <MovieHomePage
            title="Sample Movie"
            image="https://images-na.ssl-images-amazon.com/images/I/71tUSFn3W0L._AC_SL1000_.jpg"
            genres="Mystery, Supernatural, Action"
            rating="9.0"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
