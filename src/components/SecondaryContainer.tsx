import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  // const nowPlaying = useSelector((store: any) => store.movies.nowPlayingMovies); // get nowPlayingMovies from the Redux store
  const nowPlaying = useSelector((store: any) => store.movies.nowPlayingMovies); // get nowPlayingMovies from the Redux store
  const popularMovies = useSelector((store: any) => store.movies.popularMovies); // get popularMovies from the Redux store

  //The key name in configureStore decides how you access data in useSelector here movies
  //   Redux Store
  // │
  // ├── movies   ← this word comes from configureStore (appStore.tsx)
  // │    └── nowPlayingMovies
  // │
  // ├── user
  // ├── auth
  // └── settings

  console.log("Movies in MainContainer:", nowPlaying); // Log the movies to verify data is being received
  if (!nowPlaying) return null; // Handle case where movies is null or no movies, or loading state can be added here or do below code
  //here adding props as title and movies to MovieList component

  console.log("Movies in SecondaryContainer:", nowPlaying);
  //-mt-10 is to adjust the top margin, pulling the container upwards by 10 units to create a more compact layout.
  //here secondary container will have multiple movie lists like now playing,trending,popular,upcoming etc ,
  //child container should liftup a bit to reduce gap between maincontainer and secondary container
  return (
    nowPlaying && ( //check if nowPlaying is not null u can use this condition or the above one
      <div className="bg-black">
        <div className="mt-0 md:-mt-52 pl-5 md:pl-12 relative z-20">
          <MovieList title={"Now Playing"} movies={nowPlaying} />
          <MovieList title={"Trending Movies"} movies={nowPlaying} />
          <MovieList title={"Popular Movies"} movies={popularMovies} />
          <MovieList title={"Upcoming Movies"} movies={nowPlaying} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
