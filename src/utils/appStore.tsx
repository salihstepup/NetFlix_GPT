import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // key name user and its reducer function userReducer we can give any name but while accessing in useSelector we have to use this key name
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

//export default store; //typescript error verathe irkan thazhe chythe pole chyynm
export type RootState = ReturnType<typeof store.getState>;
