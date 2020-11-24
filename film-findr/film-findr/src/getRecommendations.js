import axios from "axios";
import { fireAuth, fireDb } from "./firebase";

async function getRecommendations() {
  try {
    let h = [];
    let o = [];
    const apiCall = async function (filmId) {
      let response = await axios({
        url: `https://api.themoviedb.org/3/movie/${filmId.movieId.id}/similar?api_key=${process.env.REACT_APP_FIREBASE_imdb}`,
        method: "GET",
      });
      return response.data.results.slice(0, 3);
    };

    // gets all reviews given the user
    const getAllReviews = async function () {
      let response2 = await axios({
        url: `https://${process.env.REACT_APP_FIREBASE_projectId}.firebaseio.com/users/${fireAuth.currentUser?.uid}.json`,
        method: "GET",
      });
      return response2.data;
    };

    Array.prototype.contains = function (v) {
      for (let i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
      }
      return false;
    };

    Array.prototype.unique = function () {
      let arr = [];
      let h = [];
      for (let i = 0; i < this.length; i++) {
        if (!h.contains(this[i].id)) {
          arr.push(this[i]);
          h.push(this[i].id);
        }
      }
      return arr;
    };

    let j = await getAllReviews();
    console.log(j);
    let n = Object.values(j);
    let y = n.filter((review) => review.movieId.rating >= 4);
    let promises = y.map((review) => apiCall(review)); // tried async function in map
    let gets = (await Promise.all(promises)).flat();
    let myOrderedArray = gets.unique();
    return myOrderedArray;
  } catch (err) {
    return [];
  }
}

export default getRecommendations;
