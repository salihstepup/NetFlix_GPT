import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  //add useeffect in header because in every cases we need header thats why navigate will work without an issue
  useEffect(() => {
    console.log("Body component rendered");
    onAuthStateChanged(auth, (user) => {
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

        //navigate("/browse");//ith ivde error verum onnillel window.hreder.location="/browse" ingne cheyyam allel login comp thanne cheyyam ivde cheyyand ivde router akath aan use cheyendath so issue veran chnc ind
        //user sign in ayn aayal user ne next pagelk navigate chyynam using usenavigate hook
        // ...
      } else {
        // User is signed out
        dispatch(removeUser()); // Dispatch action to remove user from Redux store, ivde onnm pass chynn laa so
        // navigate("/");, navigate wll wok only inside components like inside login or browse components or inside it
        //user sign out aayal login page lk navigate chynn
        // ...
      }
    });
  }, []);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
