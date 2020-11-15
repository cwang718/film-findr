import React from "react";
import HeaderMain from "./HeaderMain";
import "./Home.css";
import "./Example.css";

export default function Example() {
    return(
        <div className="onemovie">
            <HeaderMain></HeaderMain>
            <div className="home">
                <div className="home__container">
                <img className="home__image" src="./lights.png" alt="" />
                </div>
            </div>

            <div className="movie__container">
                <div className="moviename">Title<span className="movieyear"> (20XX)</span></div>

                <div className="content__container">
                    <div className="left__container">
                        <div className="poster"></div>
                    </div>
                    <div className="right__container">

                    </div>
                </div>
            </div>
        </div>
    );
}