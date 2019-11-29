import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

import { signin } from "../actions/UserAction";

import Header from "./header";
import Login from "./signin";
import Home from "./home";
import Dashboard from "./dashboard";
import About from "./about";
import NoPage from "./common/NoPage";
import Sigup from "./signin/signup";

import languageContext from "../context/language";

function Routing(props) {
  const [lang, setlanguage] = useState({ language: 'english'});
  console.log("language ", lang);
  const checkInitialAuth = () => {
    const isAuthenticated = reactLocalStorage.get("isAuthenticated");
    if (isAuthenticated) {
      props.signin(() => {
        console.log("callback ");
      });
    }
  };
  checkInitialAuth();

  const changeLanguage = () => {
    let lan = lang.language == "English" ? "Spanish" : "English";
   // setlanguage(lang.up);
  };

  return (
    <Container>
      <languageContext.Provider>
        <a onClick={() => changeLanguage()}> Change Language</a>
        <Router>
          <Header />
          <div className="ui segment">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Sigup />
              </Route>
              <AuthRoute path="/dashboard">
                <Dashboard />
              </AuthRoute>
              <Route path="*">
                <NoPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </languageContext.Provider>
    </Container>
  );
}

export default connect(
  null,
  { signin }
)(Routing);

// screen if you're not yet authenticated.
const AuthRouteFn = ({ children, user, ...rest }) => {
  console.log("AuthRouteFn user ", user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const AuthRoute = connect(
  ({ user }) => {
    return { user };
  },
  null
)(AuthRouteFn);
