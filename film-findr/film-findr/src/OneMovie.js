import React, {  Fragment } from "react";
import HeaderMain from "./HeaderMain";
import Searchbar from "./Searchbar";
import "./Home.css";
import "./OneMovie.css";

// let OneMovieComponents = async () => {
//   try {
//     let mid = document.getElementById("searchbutton").getAttribute("data-mid");

//     //Get specific movie info from an api query
//     let movieObj = await httpGetMovieDetails(mid);
//     console.log(movieObj);

//     return(
//       <div className="movie__container">
//         <div className="moviename">{movieObj.title}</div>
//       </div>
//     );
//   } catch(err) {
//     console.log("BOOOOOO: " + err);
//   }
// }


export default class OneMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: null
    }
  }

  componentDidMount() {
    const api_key = '906530dcaef720957c72d285494cce60';
    let movie_id = Searchbar.getMovieId();
  console.log(movie_id);
    fetch('https://api.themoviedb.org/3/movie/' + movie_id + '?api_key=' + api_key)
        .then(response => response.json())
        .then(json => this.setState({loading: false, data: json}));
  }

  renderDetails = data => {
console.log(data);

    return(
      <div className="movie__container">
        <div className="moviename">
          <ul>
            {/* {data.map(item => (
              <li style={{ listStyle: "none" }} key={item.id}>
                {item.title}
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { loading, data } = this.state;

    return (
      <div className="onemovie">
          <HeaderMain></HeaderMain>
          <div className="home">
            <div className="home__container">
              <img className="home__image" src="./lights.png" alt="" />
            </div>
          </div>

          <Fragment>
              {loading ? "Classic loading palceholder" : this.renderDetails(data)}
          </Fragment>
      </div>
    );
  }
}