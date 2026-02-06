export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR =
  "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e";
//"https://media.licdn.com/dms/image/v2/C4D03AQH1OYxvg0Xjlg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1630600998344?e=1768435200&v=beta&t=Rkxt7HqEFfGYgEEwP57hvEiH3BkChEA2YrPKOiDQKr4";

// export const API_OPTIONS = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
//   },
// };

export const API_OPTIONS = {
  //api options object for fetch requests
  method: "GET",
  headers: {
    accept: "application/json",
    //Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY, // Use the TMDB API key from environment variables for authorization in API requests, this way we can keep our API key secure and not hardcode it in our codebase, make sure to set the REACT_APP_TMDB_KEY environment variable with your actual TMDB API key in your .env file for this to work properly, and also ensure that you have proper security measures in place to protect your API keys when using them in a frontend application.
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY, // Use the TMDB API key from environment variables for authorization in API requests, this way we can keep our API key secure and not hardcode it in our codebase, make sure to set the VITE_TMDB_KEY environment variable with your actual TMDB API key in your .env file for this to work properly, and also ensure that you have proper security measures in place to protect your API keys when using them in a frontend application, here we are using VITE_TMDB_KEY as the environment variable name for the TMDB API key, you can adjust this based on your actual environment variable name and setup.
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"; //base url for images from tmdb

export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const SUPPORTED_LANGUAGES = [
  //array of supported languages
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;
console.log("OPENAI KEY:", OPENAI_KEY);
