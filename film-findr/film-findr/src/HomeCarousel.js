import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HomeCarousel.css";
import { Carousel } from 'react-responsive-carousel';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";

const tooglesGroupId = 'Toggles';
const valuesGroupId = 'Values';
const mainGroupId = 'Main';

const getConfigurableProps = () => ({
    showArrows: boolean('showArrows', true, tooglesGroupId),
    showStatus: boolean('showStatus', false, tooglesGroupId),
    showIndicators: boolean('showIndicators', true, tooglesGroupId),
    infiniteLoop: boolean('infiniteLoop', true, tooglesGroupId),
    showThumbs: boolean('showThumbs', false, tooglesGroupId),
    useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
    autoPlay: boolean('autoPlay', true, tooglesGroupId),
    stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
    swipeable: boolean('swipeable', true, tooglesGroupId),
    dynamicHeight: boolean('dynamicHeight', false, tooglesGroupId),
    emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
    thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
    selectedItem: number('selectedItem', 0, {}, valuesGroupId),
    interval: number('interval', 4000, {}, valuesGroupId),
    transitionTime: number('transitionTime', 1000, {}, valuesGroupId),
    swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
});

function HomeCarousel ({ upcomingmovies }) {
    const history = useHistory();
    const [state, dispatch] = useStateValue();
    const handleImageClick = (e) => {
        let mid = e.target.id.slice(5);
        dispatch({
        type: "SET_MOVIE_ID",
        movieId: mid,
        });
        history.push("/onemovie/" + mid);
    };
    
    return(
        <Carousel {...getConfigurableProps()} className="carousel">
            {upcomingmovies.map( index => 
            (<div className="slideshow" key={index}>
                <span className="upcoming__title">{index.title.toLowerCase()}</span>
                <button 
                    className="details__button" 
                    id={"bdimg" + index.id} 
                    onClick={handleImageClick}
                    >movie details
                </button>
                <img className="bdimage"  
                     src={`https://image.tmdb.org/t/p/original/${index.backdrop_path}`}
                />
            </div>)
            )}
        </Carousel>
    )
}

export default HomeCarousel;