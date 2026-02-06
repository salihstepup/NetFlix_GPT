import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const nowPlaying = useSelector((store: any) => store.movies.nowPlayingMovies); // get nowPlayingMovies from the Redux store

  console.log("Movies in MainContainer:", nowPlaying); // Log the movies to verify data is being received
  if (!nowPlaying) return null; // Handle case where movies is null or no movies, or loading state can be added here or do below code
  //const mainMovie = nowPlaying && nowPlaying.length > 0 ? nowPlaying[0] : null; // Select the first movie as the main movie or simple do below
  const mainMovie = nowPlaying[0]; // Select the first movie as the main movie
  console.log("Main Movie:", mainMovie); // Log the main movie to verify selection

  const { original_title, overview, id } = mainMovie; //destructuring the main movie object to get original_title, overview
  //main moviennn ee rand matram edkknm ath matram ippam mathy, ennit thazhe props ayt kodkam
  //also pass id in videobackground from movie api. so take that also and pass as props to get trailer video
  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
