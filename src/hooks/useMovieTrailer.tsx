import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId: number) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store: any) => store.movies.trailerVideo); //get trailer video from redux store
  //trailrvideo first null ayrkum appo useeffectil ninnu api call cheythu trailer video edukkanam athil kore data indavum ath storel save cheyyum
  //athil nammk vendath matram use cheyyum

  //using usestate we can get trailer id from the movie api but better to use redux store so that other components can also access the trailer video if needed
  // const [trailerId, setTrailerId] = useState<string | null>(null); //state to store trailer id

  //fetch movie trailer videos from the movie api using movieId prop && update the redux store with the trailer video
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS //options object from constant.ts, contains headers with api key, kore ezthne pakarm otte file itt vilicha mathy
    );
    const json = await data.json();
    console.log("Video Background Movie Videos:", json); //log to verify video data

    const filterData = json.results.filter(
      (video: any) => video.type === "Trailer"
    );

    console.log("Filtered Trailer Data:", filterData); //log to verify filtered trailer data

    //select the first trailer video from the filtered data or default to the first video in the results if there is no trailer select any video
    const trailer = filterData.length ? filterData[0] : json.results[0];

    console.log("Selected Trailer:", trailer); //log to verify selected trailer

    // setTrailerId(trailer.key); //set trailer id in state

    //dispatch action to add trailer video to Redux store
    dispatch(addTrailerVideo(trailer));
  };
  // useEffect(() => {
  //   !trailerVideo && getMovieVideos();
  // }, []);  //simple one line code or use below code

  useEffect(() => {
    if (!trailerVideo) {
      //trailervideoyil data indankl matram function call chytha mathy
      //only fetch trailer video if it's not already in the Redux store or not null
      getMovieVideos();
    }
  }, []);

  //or use usecallback to memoize getmovievideos function and then use useeffect with getmovievideos as dependency array

  //   BEST practice (professional)

  // Wrap function with useCallback:

  // const getMovieVideos = useCallback(async (): Promise<void> => {
  //   // fetch
  // }, []);

  // useEffect(() => {
  //   if (!trailerVideo) {
  //     getMovieVideos();
  //   }
  // }, [trailerVideo, getMovieVideos]);
};

export default useMovieTrailer;
