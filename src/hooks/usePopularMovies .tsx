import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  //Fetch data from the API and store it in Redux
  const dispatch = useDispatch();
  const popularMovies = useSelector((store: any) => store.movies.popularMovies);
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1", //avoid language filter put page filter if needed
      API_OPTIONS, //api options with headers vilkam ivde, it returns a promise
    );
    const jsonData = await data.json(); //converting the data to json format to readable stream
    console.log("Popular Movies:", jsonData.results); //printing the results in console
    dispatch(addPopularMovies(jsonData.results)); //dispatching the action to store the movies in redux store
  };

  //   useEffect(() => {
  //     //calling the function inside useEffect to avoid infinite loop using []
  //     !popularMovies && getPopularMovies();
  //   }, []);
  // }; //or

  useEffect(() => {
    if (!popularMovies) {
      //if popular movies are not present in the store, then fetch the popular movies from the API, this way we can avoid unnecessary API calls and only fetch the popular movies when they are not already present in the redux store, optimizing our application and improving performance.
      getPopularMovies(); //by doing this we are implementing memoization concept to avoid unnecessary API calls
    }
  }, [popularMovies]);
};

export default usePopularMovies;
