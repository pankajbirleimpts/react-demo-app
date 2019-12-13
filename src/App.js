import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ToastContainer } from "react-toastify";
import rootReducer from "./RootReducer";
import Routing from "./components";
import "react-toastify/dist/ReactToastify.min.css";

const store = createStore(rootReducer, applyMiddleware(thunk));
function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={8000} />
      <Routing />
    </Provider>
  );
}

export default App;
