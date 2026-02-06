// import { BG_URL } from "../utils/constant";
// import GptMovieSuggestions from "./GptMovieSuggestions";
// import GptSearchBar from "./GptSearchBar";

// const GPTSearchPage = () => {
//   //background image absolute position cheythittund z-index -10 koduthittund appol content munnil kanikkyum
//   //absolute position koduthittund appol content munnil kanikkyum, z-index -10 koduthittund appol background image contentin munnil kanikkyum, w-full and h-full koduthittund appol background image full width and full height aayi kanikkyum
//   //fixed position koduthittund appol background image screen scroll cheyyumboo fixed aayi kanikkyum, -z-10 koduthittund appol background image contentin munnil kanikkyum, w-full and h-full koduthittund appol background image full width and full height aayi kanikkyum
//   return (
//     <div>
//       <div className="fixed -z-10 w-full h-full">
//         <img src={BG_URL} alt="Netflix Background" />
//       </div>
//       <GptSearchBar />
//       <GptMovieSuggestions />
//     </div>
//   );
// };

// export default GPTSearchPage;

import { BG_URL } from "../utils/constant";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearGptMovies } from "../utils/gptSlice"; // ✅ import this

const GPTSearchPage = () => {
  const dispatch = useDispatch(); // ✅ create dispatch

  useEffect(() => {
    return () => {
      // ✅ This runs when leaving the GPT page
      dispatch(clearGptMovies()); // ✅ Clear GPT movies from the store when leaving the GPT page, this will help to reset the GPT search results when we navigate away from the GPT search page and come back again, so that we can start with a fresh state for the GPT search results, you can also add any additional cleanup logic here if needed when leaving the GPT page
    };
  }, [dispatch]);

  return (
    <div>
      <div className="fixed -z-10 w-full h-full">
        <img src={BG_URL} alt="Netflix Background" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GPTSearchPage;
