import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
//import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [authError, setAuthError] = useState<string | null>(null);

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";
    const nameValue = name.current?.value || "";

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
          updateProfile(user, {
            //namml kodknne name um photourl koody add avan vendy ulle code
            displayName: nameValue,
            photoURL: USER_AVATAR, //default avatar url
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser!; //find these detals from updated value of this user
              //! tells TS: “I guarantee this is not null”
              //?? "" handles Firebase nullable fields safely
              dispatch(
                addUser({
                  //ithil ille ella datavum storel add avum nmmk redux devtool l kannam
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );

              // dispatch(
              //   addUser({
              //     uid: currentUser.uid,
              //     email: currentUser.email ?? "",
              //     displayName: currentUser.displayName ?? "",
              //     photoURL: currentUser.photoURL ?? "",
              //   })
              // );

              // Profile updated!
              // navigate("/browse"); //user signup aayth profile update aayth kazhinjal browse page lk navigate chynn, ini ippam ith avshym lla headerl ee concept kodtht ind

              // ...
            })
            .catch((error) => {
              // An error occurred
              console.log("error,", error);
              setAuthError(error);
              // ...
            });

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
          //navigate("/browse");//same as signup  here also navigate to browse page after signin, ini ippam ith avshym lla headerl ee concept kodtht ind
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
      {/* inset-0 Same as: top: 0; right: 0; bottom: 0; left: 0; Makes div full
      screen. w-full h-full Makes image fill container. object-cover Maintains
      aspect ratio and covers screen. -z-10 Pushes background behind form. */}
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img //w-full h-full object-cover to make the image cover the entire area without distortion, and absolute with inset-0 to position it as a background
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="Netflix Background"
        />
      </div>
      {/* Login / Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-3/12 absolute p-12 bg-black/70 backdrop-blur-sm my-36 mx-auto right-0 left-0 text-white rounded-lg shadow-xl"
      >
        {/* Form Title */}
        <h1 className="font-bold text-xl p-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {/* Extra fields only for Sign Up */}
        {!isSignInForm && (
          <input
            ref={name}
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
