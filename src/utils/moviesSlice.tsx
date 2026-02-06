import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null, //It is a state property to hold now playing movies
    popularMovies: null, //It is a state property to hold popular movies
    trailerVideo: null,
  },

  //   State name = what data is

  // Reducer name = what action does
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload; // array of movies,whatever comes from the action payload will put into nowPlayingMovies
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload; // array of movies,whatever comes from the action payload will put into popularMovies
    },
    addTrailerVideo: (state, action) => {
      // add trailer video to the redux store
      state.trailerVideo = action.payload; // add trailer video to the state
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies } =
  movieSlice.actions;
export default movieSlice.reducer;

//or use typescript version below
// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// /** Movie type (you can expand later) */
// export interface Movie {
//   id: number;
//   title: string;
//   overview: string;
//   poster_path: string;
// }

// /** Slice state type */
// interface MovieState {
//   nowPlayingMovies: Movie[] | null;
// }

// const initialState: MovieState = {
//   nowPlayingMovies: null,
// };

// const movieSlice = createSlice({
//   name: "movies",
//   initialState,
//   reducers: {
//     addNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
//       state.nowPlayingMovies = action.payload;
//     },
//   },
// });

// export const { addNowPlayingMovies } = movieSlice.actions;
// export default movieSlice.reducer;
