import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/appStore"; // adjust path if needed
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  //"https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
  // const [showGptSearch, setShowGptSearch] = useState(false); // State to manage GPT Search visibility or use Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showLanguage = useSelector((store: any) => store.gpt.showGptSearch); // Access GPT Search visibility from Redux store or language from config store

  const user = useSelector((store: RootState) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/");//no need of this because everytime signout aayal onauthstatechanged listener in body component will take care of navigation
        // Sign-out successful.
        //no need to dispatch removeuser here because onauthstatechanged listener in body component will take care of it
      })
      .catch((error) => {
        navigate("/error");
        console.error("Error signing out:", error);
        // An error happened.
      });
  };

  const handleGptSearchClick = () => {
    // setShowGptSearch((prev) => !prev); // Toggle GPT Search visibility
    dispatch(toggleGptSearchView()); // Dispatch action to toggle GPT Search visibility in Redux store
    //not passing any payload because toggle action aan ithil,also action il thanne state ne based chynne toggle cheyyunnu
  };

  //add useeffect in header because in every cases we need header thats why navigate will work without an issue
  useEffect(() => {
    console.log("Body component rendered");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Listen for authentication state changes
      //ee  api aan ellam control chynne authnetctn nte
      if (user) {
        //when user sign in or sign up this part will executed other wise else part means sign out
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            //ithil ille ella datavum storel add avum nmmk redux devtool l kannam
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        ); // Dispatch action to add user to Redux store
        //all this details add cheyyunnu redux store il vennel extrayum cheyyam
        navigate("/browse"); //ivde navigate work avum ith headerl ayond also aa issue povum, eth issue vecha munne direct navigate cheyyan pattumayrnnu, login avathe browse page cheyyan  pattula sign in ayal pattum also direct logoutum pattula
        //navigate("/browse");//ith ivde error verum onnillel window.hreder.location="/browse" ingne cheyyam allel login comp thanne cheyyam ivde cheyyand ivde router akath aan use cheyendath so issue veran chnc ind
        //user sign in ayn aayal user ne next pagelk navigate chyynam using usenavigate hook
        // ...
      } else {
        // User is signed out
        dispatch(removeUser()); // Dispatch action to remove user from Redux store, ivde onnm pass chynn laa so
        // navigate("/");, navigate wll wok only inside components like inside login or browse components or inside it
        //user sign out aayal login page lk navigate chynn
        navigate("/"); //allel login lekmum
        // ...
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //dispatch action to change language in redux store
    console.log("Selected language:", e.target.value);

    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-4 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img
        //absolute top-4 left-4 h-12 , ith use chynne oru imagente molil beran aan or overlap avaan an
        // src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        src={LOGO}
        alt="Netflix Logo"
        className="w-36 ml-4 mt-4"
      />
      {user && ( //if user is logged in than only show signout button and user photo etc..
        <div className="flex p-2 space-x-4 ">
          {/* <select className="text-white px-2 ">
            <option value="en">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
          </select>  make it dynamic as below*/}

          {/* Dynamic Language Selector */}

          {/* You can expand this list as needed */}
          {showLanguage && ( //if showLanguage true aanengil thanne language select oru dropdown kanikkanam
            <select
              className="p-2 m-2 text-white bg-black border border-white rounded"
              onChange={handleLanguageChange} //when user change language this function will be called
            >
              {SUPPORTED_LANGUAGES.map(
                (
                  lang //map through the supported languages array, using key becoz of map
                ) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                )
              )}
            </select>
          )}

          <button
            className="py-2 px-4 bg-purple-800 mx-4 my-2 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showLanguage ? " Go to Home Page" : "Go to GPT Search"}
            {/* //button text based on state */}
          </button>
          <img
            className=" w-12 h-12"
            alt="usericon"
            src={USER_AVATAR} //photoURL coming from redux athine useselctor vech edth ivde display chyth
          />
          <button
            className="font-bold text-white  cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
      {/* 
      👇 Toggle component
      {showGptSearch && <GptSearch />} */}
    </div>
  );
};

export default Header;
