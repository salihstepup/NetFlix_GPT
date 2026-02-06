import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gptMovies = useSelector((store: any) => store.gpt); // Access the gptMovies state from the Redux store using useSelector hook, here we are assuming that the gptMovies state is stored in the gpt slice of the Redux store, you can adjust this based on your actual state structure
  //or directly give const { movieNames, movieResults }  = useSelector((store: any) => store.gpt); or do as below code to destructure movieNames and movieResults from the gptMovies state after accessing it from the Redux store
  const { movieNames, movieResults } = gptMovies; // Destructure movieNames and movieResults from the gptMovies state, here we are assuming that the gptMovies state has movieNames and movieResults properties, you can adjust this based on your actual state structure

  console.log("GPT Movies from Redux Store:", gptMovies); // Log the gptMovies state to verify that we are getting the correct data from the Redux store, you can also log movieNames and movieResults separately to verify their values

  if (!movieNames) return null; // Handle case where movieResults is null or no movies, or loading state can be added here or add shimmer UI

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90 rounded-lg">
      <div>
        {movieNames.map((Moviename: string, index: number) => (
          <MovieList
            key={index} //title an movies aan movielist nte props so athilek nmmde data add aky, ivde ann comp reusablty kannunnath main aytt
            title={Moviename} //title, movies ello MovieList componentil title and movies props pass cheyyan vendy, titleil movie name pass cheyyum, moviesil corresponding movie details pass cheyyum, here we are assuming that movieResults is an array of arrays where each inner array corresponds to the movies for the respective movie name in movieNames, you can adjust this based on your actual data structure, here we are just mapping through the movieNames and passing the corresponding movies from movieResults to the MovieList component for display, you can also add error handling or loading state as needed
            movies={movieResults[index]} //movieresults[0] aan add chynde, so athine index vech chythu, oro index 0,1,2 ingne act chyyum map functionl
          /> // Assuming movieResults is an array of arrays where each inner array corresponds to the movies for the respective movie name in movieNames, you can adjust this based on your actual data structure, here we are just mapping through the movieNames and passing the corresponding movies from movieResults to the MovieList component for display, you can also add error handling or loading state as needed
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
