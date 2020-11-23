# Welcome to filmfindr

Filmfindr lets you create a film journal for all your film needs. Create any type of notes or reviews on a movie and it will only be seen by you.
So if you have anything on your mind about a specific film, just use filmfindr to store those thoughts.

## This web application is also completely usable without an account

To get the most out of the website, you should make an account, but it will still work if you are not logged in.
As a guest, you will be able to see the popular movies on the home page and search for any movie and see the rating, actors, title, director, and plot synopsis
You can do all that and more with an account though

# APIs used

TMDB implemenation document here: https://developers.themoviedb.org/
React Context Api
Firebase

## UI Design

Logo, favicon, error poster, and lights header were all made in Adobe Illustrator. We also prototyped the UI/UX in figma beforehand

## Frontend Implementation

The frontend was build through React.js components and our own css files for each of those React components.

## Backend Implementation

The database we decided to use was firebase realtime database
The backend is set up in this way:

users:

------ (firebase Authentication Id):

---------------------------------------(movieId):

---------------------------------------------------- movieId:

---------------------------------------------------------------- id: (id from TMDB)

---------------------------------------------------------------- movieTitle: (title from TMDB)

---------------------------------------------------------------- poster: (poster_path from TMDB or /error.png)

---------------------------------------------------------------- rating: (rating from user)

---------------------------------------------------------------- user: (review from user)

### Routes

`/` : GET (TMDB ?popular, ?toprated, ?upcoming) - Home page that gets popular, top rated, and upcoming movies and houses the navigation

`/signup`: POST (firebase function) - Sign up page that makes an API call to firebase and registers an account

`/login`: POST (firebase function) - Log in page that makes an API call to firebase and authenticates based on the provided credentials

`/reviews`: GET (database) - Makes an API call to the database and gets all of the user's reviews and shows recommended movies (if applicable)

`/onemovie/:film_id`: GET (user), GET (TMDB ?details) POST (database) - Makes an API call to the TMDB database based on the url params to get the specific movie's information

`/edit/:film_id`: GET (TMDB), GET (database), POST (database) - Makes a GET request to the TMDB database to get the specific movie, then makes a GET request to the database to get the pre-edited review, and then makes a POST request to the database

# Made by

Vivek Patel and Charlotte Wang
