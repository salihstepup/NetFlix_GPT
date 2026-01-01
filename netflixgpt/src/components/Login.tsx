import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [authError, setAuthError] = useState<string | null>(null);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";

    // reset previous errors
    setEmailError(null);
    setPasswordError(null);

    // required field checks
    if (!emailValue) {
      setEmailError("Email is required");
    }

    if (!passwordValue) {
      setPasswordError("Password is required");
    }

    // stop further validation if required fields are missing
    if (!emailValue || !passwordValue) return;

    // format validation
    const message = checkValidData(emailValue, passwordValue);

    if (message === "Email ID is not valid") {
      setEmailError(message);
      return;
    }

    if (message === "Password is not valid") {
      setPasswordError(message);
      return;
    }

    console.log("Form is valid");

    if (message) return; // extra safety check if(!message) return;//or if(message===null) return;

    if (!isSignInForm) {
      //sign up logic here
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("User signed up:", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

          console.error("Error signing up:", errorCode, errorMessage);
          // setEmailError(errorMessage + " " + errorCode);
          // setPasswordError(errorMessage + " " + errorCode);
          setAuthError(errorMessage + " " + errorCode);
        });
    } else {
      //sign in logic here coming from firebase docs

      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          console.log("User signed in:", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing in:", errorCode, errorMessage);
          // setEmailError(errorMessage + " " + errorCode);
          // setPasswordError(errorMessage + " " + errorCode);
          setAuthError(errorMessage + " " + errorCode);
        });
    }
  };

  const [loading, setLoading] = useState(false);

  const toggleSignInForm = () => {
    if (loading) return;
    setIsSignInForm(!isSignInForm);
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent page reload on form submit
    e.preventDefault(); //form submit aakumbol page reload aakathirikan

    // Start loading (disable button & show feedback)
    setLoading(true);

    // Simulating API call (Sign In / Sign Up)
    setTimeout(() => {
      console.log(isSignInForm ? "Sign In API call" : "Sign Up API call"); //simulate API call

      // Stop loading after API finishes
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <Header />

      {/* Background Image */}
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Netflix Background"
        />
      </div>

      {/* Login / Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="w-3/12 absolute p-12 bg-black/70 backdrop-blur-sm my-36 mx-auto right-0 left-0 text-white rounded-lg shadow-xl"
      >
        {/* Form Title */}
        <h1 className="font-bold text-xl p-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {/* Extra fields only for Sign Up */}
        {!isSignInForm && (
          <input
            type="text"
            placeholder="First Name"
            className="p-4 my-2 w-full bg-gray-700"
            disabled={loading} // disable while loading
          />
        )}
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Last Name"
            className="p-4 my-2 w-full bg-gray-700"
            disabled={loading}
          />
        )}
        {/* Email Input */}
        <input
          ref={email} // useRef to access input value
          type="email"
          placeholder="Email or phone number"
          className="p-4 my-2 w-full bg-gray-700"
          disabled={loading}
        />

        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}

        {/* Password Input */}
        <input
          ref={password} // useRef to access input value
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
          disabled={loading}
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}

        {authError && <p className="text-red-500 text-sm mt-1">{authError}</p>}

        {/* <p className="text-red-500 text-lg py-2 font-bold">{errorMessage}</p> */}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // 🚫 prevent multiple clicks
          onClick={handleButtonClick}
          className={`p-4 my-6 w-full rounded-lg ${
            loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500"
          }`}
        >
          {/* Button text changes based on mode & loading */}
          {loading
            ? isSignInForm
              ? "Signing In..."
              : "Signing Up..."
            : isSignInForm
            ? "Sign In"
            : "Sign Up"}
        </button>

        <p
          className={`py-4 ${
            loading ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Signup Now"
            : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
