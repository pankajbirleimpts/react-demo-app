import React, { StrictMode } from "react";
import "./App.scss";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./RootReducer";
import Routing from "./components";

const store = createStore(rootReducer, applyMiddleware(thunk));
function App() {
  return (
    <Provider store={store}>
      <StrictMode>
        <Routing />
      </StrictMode>
    </Provider>
  );
}

export default App;
