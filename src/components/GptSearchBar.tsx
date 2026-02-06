import { useDispatch, useSelector } from "react-redux";
import languageConstants, {
  type LanguageKey,
} from "../utils/languageConstants";
import { useRef } from "react";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovies } from "../utils/gptSlice";

const GptSearchBar = () => {
  //grid property is used to make grid grid-cols-12 to make input 9 cols and button 3 cols
  //cols-span-9 to make input take 9 cols from 12 cols
  //cols-span-3 to make button take 3 cols from 12 cols
  const langKey = useSelector((store: any) => store.config.lang as LanguageKey);
  console.log("Current language in GptSearchBar:", langKey);

  const searchText = useRef(null); // Create a ref to store the search input value, input box le valueedkan useref use akm or usestate use akm but here we just want to access the value on button click so useref is sufficient, if we want to update the value on every keystroke then useState is better
  //ennit eth input aano edknde avde ref vech ee value edkknam
  const dispatch = useDispatch(); //to dispatch action to add recommended movies to the Redux store, you can then take this data from the Redux store to display in the UI, here we are just dispatching the action for demonstration

  //search movie in TMDB API based on user query and then pass the search results to GPT to get movie recommendations based on the search results, you can also directly pass the user query to GPT and ask it to recommend movies based on the query without searching in TMDB API, but searching in TMDB API will give more accurate results as it will provide GPT with more context about the movies available in TMDB database, you can choose either approach based on your requirement, here we are directly passing the user query to GPT for simplicity
  const searchMovieTMDB = async (movieName: string) => {
    //GPT SEARCH CHYTHE MOVIE MATRAM VECH TMDBL SEARCH CHYTH FULL DETAILS EDKAN VENDY AAN EE API CALL, so that we can show poster, overview etc in the UI for the recommended movies, you can also create a separate function to search for movie details by name and then call that function for each movie in the recommendedMovies array to get the details for each recommended movie, here we are just creating a single function to search for movie details by name and then calling that function for each movie in the recommendedMovies array to get the details for each recommended movie, you can also handle errors using try catch block to catch any errors that may occur during the API call and log them or show an alert to the user
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    // .then(res => res.json()), it is async await so we can directly await the response and then return the data no need of .then() here, you can also handle errors using try catch block to catch any errors that may occur during the API call and log them or show an alert to the user
    // .then(res => console.log(res))
    // .catch(err => console.error(err));
    const jsonData = await data.json(); //convert response to json
    return jsonData.results; //return the json data, you can also extract the relevant information from the json data and return it in a more structured format if needed, here we are just returning the entire json response for demonstration
    //IT is not happen immediatly as it is an API call so we need to wait for the response to come back before we can use the data, thats why we are using async await here to wait for the response before we can use the data, you can also handle loading state to show a loading indicator while the API call is in progress and then hide it once the response is received, here we are just returning the data without handling loading state for simplicity
  };

  const handleGptSearchClick = async () => {
    console.log("Search button clicked");
    console.log("Search text:", searchText.current?.value); // Access the current value of the input using the ref
    //Make an API call to your backend with the search text to get GPT response and then display it in the UI, you can use axios or fetch for making API calls, here we are just logging the value for demonstration
    const gptQuery = //ingne crrct context kodtha correct movie kittum
      "Act as a Movie recommendation engine. Suggest me some movies similar to the query " +
      searchText.current?.value +
      "Only give me names of  5 movies, coma seperated like the example result given ahead. Example Result:Durandar,Avatar,Dhoom,Don,Dhrishyam"; //if no value is entered then default to Inception
    const response = await client.responses.create({
      //this code in openaI DOC
      //take this code from openai.tsx where we created client instance and use it here to make API call to OpenAI, you can replace the model, instructions and input with your own values as per your requirement
      //create method is used to send a request to the OpenAI API, it takes an object as parameter where you can specify the model, instructions and input for the GPT model
      // model: "gpt-5.2",
      model: "gpt-4.1-mini",

      //model: "gpt-4.1-mini",
      // instructions: "You are a coding assistant that talks like a pirate",
      instructions: "You are a movie recommendation engine.",

      input: gptQuery, //searchText.current?.value is the value entered in the search input box
    });

    if (!response.output_text) {
      console.error("No output from OpenAI");
      alert("No response from GPT. Try again later.");
      return;
    }
    console.log("saal", response.output_text?.[0]?.message?.content); //response from OpenAI will be in response.output_text, you can log it to see the structure of the response and then extract the relevant information to display in the UI, here we are just logging the response for demonstration

    //you will get output like Durandar,Avatar,Dhoom,Don,Dhrishyam so make it an array by splitting it with comma

    const gptMovies = response.output_text?.[0]?.message?.content.split(",");

    //then gptMovies will be an array of movie names, you can use this array to display the recommended movies in the UI, you can also trim the whitespace from each movie name using map function
    //before split => "Durandar, Avatar, Dhoom, Don, Dhrishyam" after split => ["Durandar", " Avatar", " Dhoom", " Don", " Dhrishyam"] so we can trim the whitespace from each movie name using map function and then we can use this array to display the recommended movies in the UI

    // const recommendedMovies = gptMovies?.map((movie: string) => movie.trim());

    //for each movie i will search TMDP API to get the movie details like poster, overview etc and then display it in the UI, you can use axios or fetch to make API calls to TMDB API, you can create a function to search for movie details by name and then call that function for each movie in the recommendedMovies array

    const movieDetailsPromises = gptMovies?.map((movieName: string) =>
      searchMovieTMDB(movieName.trim())
    ); //here passing the trimmed movie name to the searchMovieTMDB function to get the movie details from TMDB API, this will return an array of promises as we are making multiple API calls to TMDB API for each movie in the recommendedMovies array, so we need to wait for all the promises to resolve using Promise.all to get the movie details for all the recommended movies before displaying them in the UI
    //here we get output as array of promises so we need to wait for all the promises to resolve using Promise.all
    //out put like => ["Promise {<pending>}", "Promise {<pending>}", "Promise {<pending>}", "Promise {<pending>}", "Promise {<pending>}"] so we need to wait for all the promises to resolve using Promise.all

    const movieDetails = await Promise.all(movieDetailsPromises || []); //wait for all the promises to resolve, thats why using promise.all
    //so after using promise.all we will get an array of movie details for each recommended movie, you can log this array to see the structure of the movie details and then extract the relevant information to display in the UI, here we are just logging the movie details for demonstration

    console.log("Movie details from TMDB:", movieDetails); //log the movie details to see the structure of the response and then extract the relevant information to display in the UI
    //here output gettng like => Movie details from TMDB: [Array(1), Array(1), Array(1), Array(1), Array(1)] so we need to extract the relevant information from each movie details array to display in the UI, you can use map function to extract the relevant information from each movie details array and then display it in the UI as per your requirement, here we are just logging the movie details for demonstration
    //each movie details array will have the structure like => [{title: "Durandar", poster: "url", overview: "movie overview", release_date: "2020-01-01", etc}] so you can extract the relevant information from this array to display in the UI, you can also handle cases where the movie details array is empty or null to avoid errors in the UI, here we are just logging the movie details for demonstration
    //we can do like push all given movies to store and take from store to display in UI or we can directly use this movieDetails array to display in the UI without storing it in the Redux store, it depends on your requirement and how you want to manage the state of the recommended movies in your application, here we are just logging the movie details for demonstration
    //working=>like while clicking on search button in gpt search-> we will get the recommended movie names from GPT -> then for each recommended movie name we will search in TMDB API to get the movie details -> then push all the movie details to the Redux store -> then take the movie details from the Redux store to display in the UI, you can also directly use the movieDetails array to display in the UI without storing it in the Redux store, it depends on your requirement and how you want to manage the state of the recommended movies in your application, here we are just logging the movie details for demonstration

    // dispatch(addGptMovies(movieDetails)); //dispatch the action to add the recommended movies to the Redux store, you can then take this data from the Redux store to display in the UI, here we are just dispatching the action for demonstration
    //or if we show multiple data using {}
    dispatch(
      addGptMovies({ movieNames: gptMovies, movieResults: movieDetails }) //here we are dispatching an object with both the movie names and movie details to the Redux store, you can then take this data from the Redux store to display in the UI, here we are just dispatching the action for demonstration
    );
    //here get result as array of arrays like => [[{title: "Durandar", poster: "url", overview: "movie overview", release_date: "2020-01-01", etc}], [{title: "Avatar", poster: "url", overview: "movie overview", release_date: "2020-01-01", etc}], [{title: "Dhoom", poster: "url", overview: "movie overview", release_date: "2020-01-01", etc}], [{title: "Don", poster: "url", overview: "movie overview", release_date: "2020-01-01", etc}], [{title: "Dhrishyam", poster: "url", overview: "movie overview", release_date: "2020-01-01", etc}]] so we can flatten this array to get a single array of movie details for all the recommended movies before storing it in the Redux store or displaying it in the UI, you can use flat() method to flatten the array like movieDetails.flat() to get a single array of movie details for all the recommended movies, here we are just logging the movie details for demonstration
  };
  //   const recommendedMovies = response.output_text
  //     ?.trim()
  //     .split(",")
  //     .map((movie: string) => movie.trim()); //split the response by comma and trim the whitespace from each movie name
  // };

  //or do code like below to handle error properly and show alert to user if there is any error with API call like billing issue or usage limit exceeded etc

  //   const handleGptSearchClick = async () => {
  //     try {
  //       const response = await client.responses.create({
  //         model: "gpt-4.1-mini",
  //         input: `Suggest 5 movies similar to ${searchText.current?.value}.
  // Only return comma separated movie names.`,
  //       });

  //       console.log(response.output_text);
  //     } catch (error: any) {
  //       console.error("OpenAI Error:", error);
  //       alert("API error. Check billing or usage limits.");
  //     }
  //   };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()} //prevent page reload on form submit,it will prevent the refreshing of the page
      >
        <input
          ref={searchText} // Attach the ref to the input element to access its value later
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg bg-gray-800 text-white focus:outline-none"
          //placeholder="What would you like to watch today?"
          placeholder={languageConstants[langKey]?.gptSearchPlaceholder}
          //languageConstants[langKey] dynamic placeholder based on selected language thats y using [] bracket becoz of dynamic key otherwise use dot notation
        />
        <button
          className="col-span-3 m-4 bg-red-600 text-white rounded-lg"
          //onClick={() => console.log("Search button clicked")} //placeholder for search functionality, you can replace it with actual search logic later
          onClick={handleGptSearchClick} //call the function to handle GPT search on button click
        >
          {languageConstants[langKey]?.search}
          {/* dynamic button text based on selected language */}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
