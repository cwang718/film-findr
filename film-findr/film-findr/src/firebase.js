import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_auth,
  databaseURL: process.env.REACT_APP_FIREBASE_dburl,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storage,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messaging,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_msId,
};

let firebaseFilmFindr;
try {
  firebaseFilmFindr = firebase.initializeApp(firebaseConfig);
} catch (err) {}

const fireDb = firebaseFilmFindr.database();
const fireAuth = firebase.auth();

export { fireDb, fireAuth };
