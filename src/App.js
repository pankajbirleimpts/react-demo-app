import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from "./reducers/RootReducer";
import Routing from "./components";
import "react-toastify/dist/ReactToastify.min.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const store = createStore(rootReducer, applyMiddleware(thunk));
function App() {
  return (
    <Router>
      <Provider store={store}>
        <ToastContainer autoClose={8000} />
        <Routing />
      </Provider>
    </Router>
  );
}

export default App;
