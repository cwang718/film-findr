import axios from "axios";
import { fireAuth, fireDb } from "./firebase";

async function getRecommendations() {
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
  if (fireAuth.currentUser) {
    try {
      fireDb
        .ref("users/" + fireAuth.currentUser?.uid)
        .on("value", (snapshot) => {
          snapshot.forEach((snap) => {
            h.push(snap.val());
          });
          //   let snaps = snapshot.map((s) => s.val());
          //   h.push(...snaps);
        });
    } catch (err) {}
    // } else {
    //   console.log("local");
    //   try {
    //     fireDb.ref("users/" + localStorage.user).on("value", (snapshot) => {
    //       let snaps = snapshot.map((s) => s.val());
    //       h.push(...snaps);
    //       // snapshot.forEach((snap) => {
    //       //   h.push(snap.val());
    //       // });
    //     });
    //   } catch (err) {}
  }

  let y = h.filter((review) => review.movieId.rating >= 4);

  let promises = y.map((review) => apiCall(review)); // tried async function in map

  let gets = (await Promise.all(promises)).flat();
  return gets;
}

export default getRecommendations;
