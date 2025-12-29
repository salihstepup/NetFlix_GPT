import { useState } from "react";
import Header from "./Header";
//lex flex-col items-center justify-center min-h-screen bg-black text-white
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Netflix Logo"
          // className="h-12 mx-auto mt-4"
        />
      </div>

      <form className="w-3/12 absolute p-12 bg-black/70 backdrop-blur-sm my-36 mx-auto right-0 left-0 text-white rounded-lg shadow-xl">
        {isSignInForm ? (
          <h1 className="font-bold text-xl p-4">Sign In</h1>
        ) : (
          <h1 className="font-bold text-xl p-4">Sign Up</h1>
        )}
        {!isSignInForm && (
          <input
            type="text"
            placeholder="First Name"
            className="p-4 my-2 w-full bg-gray-700"
          />
        )}
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Last Name"
            className="p-4 my-2 w-full bg-gray-700"
          />
        )}
        {/* {!isSignInForm && (
          <input
            type="number"
            placeholder="Phone Number"
            className="p-4 my-2 w-full bg-gray-700"
          />
        )} */}
        <input
          type="email"
          placeholder="Email or phone number"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {isSignInForm ? (
          <button
            type="submit"
            className="p-4 my-6 bg-red-500 w-full rounded-lg"
          >
            Sign In
          </button>
        ) : (
          <button
            type="submit"
            className="p-4 my-6 bg-red-500 w-full rounded-lg"
          >
            Sign Up
          </button>
        )}
        {isSignInForm ? (
          <p className="py-4" onClick={toggleSignInForm}>
            New to Netflix? Signup Now
          </p>
        ) : (
          <p className="py-4" onClick={toggleSignInForm}>
            Already have an account? Sign In
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
