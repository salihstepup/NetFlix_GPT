// import OpenAI from "openai";
// import { OPENAI_KEY } from "./constant";

// const client = new OpenAI({
//   //apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
//   apiKey: OPENAI_KEY, // You can also directly pass the API key here
//   dangerouslyAllowBrowser: true, // This option allows the OpenAI client to be used in a browser environment, but be cautious as it can expose your API key if not handled properly. Make sure to implement proper security measures when using this option.
// });

// // const response = await client.responses.create({
// //   model: "gpt-5.2",
// //   instructions: "You are a coding assistant that talks like a pirate",
// //   input: "Are semicolons optional in JavaScript?",
// // });

// // console.log(response.output_text);
// console.log("OPENAI KEY:", OPENAI_KEY);

// export default client;

import OpenAI from "openai";
import { OPENAI_KEY } from "./constant";

console.log("ALL ENV:", import.meta.env);

const client = new OpenAI({
  //apiKey: import.meta.env.VITE_OPENAI_KEY || "", //From .env file  by doing this it can direct access from env no need of import and also u can use below code  from constant file, you can choose either way to set the API key, just make sure to set the VITE_OPENAI_KEY environment variable with your actual OpenAI API key in your .env file for this to work properly, and also ensure that you have proper security measures in place to protect your API keys when using them in a frontend application.
  apiKey: OPENAI_KEY || "", // You can also directly pass the API key here, make sure to set the VITE_OPENAI_KEY environment variable with your actual OpenAI API key in your .env file for this to work properly, and also ensure that you have proper security measures in place to protect your API keys when using them in a frontend application.
  dangerouslyAllowBrowser: true,
});

export default client;
