import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies ";
import GPTSearch from "./GPTSearchPage";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  const gptSearchVisible = useSelector((store: any) => store.gpt.showGptSearch); // Access GPT Search visibility from Redux store

  //here we or using custom hooks to make code clean or add below normal code to fetch now playing movies
  useNowPlayingMovies();
  usePopularMovies();

  //  data from the API and store it in Redux
  // const dispatch = useDispatch();

  // const getNowplayingMovies = async () => {
  //   const data = await fetch(
  //     "https://api.themoviedb.org/3/movie/now_playing?page=1'", //avoid language filter put page filter if needed
  //     API_OPTIONS //api options with headers vilkam ivde, it returns a promise
  //   );
  //   const jsonData = await data.json(); //converting the data to json format to readable stream
  //   console.log("Now Playing Movies:", jsonData.results); //printing the results in console
  //   dispatch(addNowPlayingMovies(jsonData.results)); //dispatching the action to store the movies in redux store
  // };

  // useEffect(() => {
  //   //calling the function inside useEffect to avoid infinite loop using []
  //   getNowplayingMovies();
  // }, []);

  return (
    <div>
      <Header />
      {/* {gptSearchVisible && <GPTSearch />}{" "} */}
      {/* Conditionally render GPTSearch based on Redux state  , if true */}

      {gptSearchVisible ? ( //showGptSearch state true aanengil
        <GPTSearch />
      ) : (
        <>
          {/* multiple elements need to be wrapped in a fragment */}
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      {/* <MainContainer />
      <SecondaryContainer /> */}
    </div>
  );
};

export default Browse;
