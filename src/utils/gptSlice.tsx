import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false, // State property to manage GPT Search visibility,toggle chymbo maaran vendy
    movieResults: null, // State property to store movies fetched from GPT
    movieNames: null, // State property to store movie names fetched from GPT
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch; // Toggle GPT Search visibility,if true make false if false make true
    },
    addGptMovies: (state, action) => {
      const { movieNames, movieResults } = action.payload; // Destructure movieNames and movieResults from the action payload, here we are assuming that the action payload is an object with movieNames and movieResults properties, you can adjust this based on how you are dispatching the action and the structure of your data
      //rand action indel or rand data onnch store cheyyan vendy ingne setup cheyyaam

      state.movieNames = movieNames; // Update movieNames state with the movie names fetched from GPT
      state.movieResults = movieResults; // Update movieResults state with the movies fetched from GPT, action.payload contains the movies data passed when dispatching this action
      // Here you can also add logic to append new movies to the existing gptMovies state instead of replacing it, depending on your requirements, for example if you want to keep adding recommended movies to the existing list instead of replacing it, you can do something like state.gptMovies = [...state.gptMovies, ...action.payload] to append new movies to the existing list of gptMovies in the state, here we are just replacing the existing gptMovies with the new movies data for demonstration
    },
    clearGptMovies: (state) => {
      state.movieNames = null;
      state.movieResults = null;
    },
  },
});

export const { toggleGptSearchView, addGptMovies, clearGptMovies } =
  gptSlice.actions;
export default gptSlice.reducer;
