import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  //Fetch data from the API and store it in Redux
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store: any) => store.movies.nowPlayingMovies,
  ); //selecting the now playing movies from the redux store, this will allow us to access the now playing movies in our components that use this hook, we can use this data to display the now playing movies in our UI, and it will also allow us to keep our components clean and focused on rendering the UI while the data fetching and state management is handled in this custom hook, making our code more modular and reusable across different components that need access to the now playing movies data.
  //this is taking to avoid unecessary API calls, if the now playing movies are already present in the redux store, we can skip the API call and directly use the data from the store, this way we can optimize our application and reduce the number of API calls, improving performance and user experience.
  //called memoization to avoid unnecessary API calls, if the now playing movies are already present in the redux store, we can skip the API call and directly use the data from the store, this way we can optimize our application and reduce the number of API calls, improving performance and user experience.
  // if (nowPlayingMovies.length > 0) {
  //   console.log("Now Playing Movies from Store:", nowPlayingMovies); //printing the now playing movies from the store in console
  //   return; //returning early to avoid unnecessary API call
  // }

  const getNowplayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1'", //avoid language filter put page filter if needed
      API_OPTIONS, //api options with headers vilkam ivde, it returns a promise
    );
    const jsonData = await data.json(); //converting the data to json format to readable stream
    console.log("Now Playing Movies:", jsonData.results); //printing the results in console
    dispatch(addNowPlayingMovies(jsonData.results)); //dispatching the action to store the movies in redux store
  };

  useEffect(() => {
    // if(nowPlayingMovies.length > 0) {
    //       console.log("Now Playing Movies from Store:", nowPlayingMovies); //printing the now playing movies from the store in console
    //       return; //returning early to avoid unnecessary API call
    //     }

    if (!nowPlayingMovies || nowPlayingMovies.length === 0) {
      console.log("Now Playing Movies from Store:", nowPlayingMovies); //printing the now playing movies from the store in console
      getNowplayingMovies(); //calling the function to fetch now playing movies if not present in the store
    } else {
      console.log("Now Playing Movies from Store:", nowPlayingMovies); //printing the now playing movies from the store in console
    } //this way we can avoid unnecessary API calls and only fetch the now playing movies when they are not already present in the redux store, optimizing our application and improving performance.
    //called memoization concept.

    //or do as below simple code
    //!nowPlayingMovies && getNowplayingMovies(); //this is a shorter way to achieve the same result as above, it checks if nowPlayingMovies is falsy (null, undefined, or empty array) and if so, it calls the getNowplayingMovies function to fetch the data, otherwise it does nothing, this is a more concise way to handle the conditional logic for fetching the now playing movies data when it's not already present in the redux store, while still avoiding unnecessary API calls and optimizing our application performance.

    //calling the function inside useEffect to avoid infinite loop using []
    // getNowplayingMovies();
  }, []);
};

export default useNowPlayingMovies;
