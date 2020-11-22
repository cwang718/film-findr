export const initialState = {
  reviews: [],
  user: null,
  movieId: null,
  isEdited: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_REVIEW":
      return {
        ...state,
        reviews: action.reviews,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_MOVIE_ID":
      return {
        ...state,
        movieId: action.movieId,
      };

    case "SET_EDIT":
      return {
        ...state,
        isEdited: action.isEdited,
      };

    default:
      return state;
  }
};

export default reducer;
