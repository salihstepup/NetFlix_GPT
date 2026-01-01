// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD7fJygke6FtY8J5H5WQA9iA1Or89arLiU",
//   authDomain: "netflix-gpt-d0762.firebaseapp.com",
//   projectId: "netflix-gpt-d0762",
//   storageBucket: "netflix-gpt-d0762.firebasestorage.app",
//   messagingSenderId: "240810526900",
//   appId: "1:240810526900:web:fec079ff8544990880afe1",
//   measurementId: "G-K38SFCEB7Q",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7fJygke6FtY8J5H5WQA9iA1Or89arLiU",
  authDomain: "netflix-gpt-d0762.firebaseapp.com",
  projectId: "netflix-gpt-d0762",
  storageBucket: "netflix-gpt-d0762.firebasestorage.app",
  messagingSenderId: "240810526900",
  appId: "1:240810526900:web:fec079ff8544990880afe1",
  measurementId: "G-K38SFCEB7Q",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
