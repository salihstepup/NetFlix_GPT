import { Provider } from "react-redux";
import Body from "./components/Body";
import { store } from "./utils/appStore";

function App() {
  return (
    <>
      <div>
        <Provider store={store}>
          <Body />
        </Provider>
      </div>
    </>
  );
}

export default App;
