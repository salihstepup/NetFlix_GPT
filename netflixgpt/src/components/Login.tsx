import Header from "./Header";
//lex flex-col items-center justify-center min-h-screen bg-black text-white
const Login = () => {
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
        <h1 className="font-bold text-xl p-4">Sign In</h1>
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
        <button type="submit" className="p-4 my-6 bg-red-500 w-full rounded-lg">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
