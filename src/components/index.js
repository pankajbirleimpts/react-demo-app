import React from "react";
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

import { updateUserStore } from "../actions/UserAction";

import Header from "./header";
import Login from "./signin";
import Home from "./home";
import Dashboard from "./dashboard";
import About from "./about";
import NoPage from "./common/NoPage";
import Sigup from "./signin/signup";
import UserList from "./users/index";
import AddUser from "./users/AddUser";
import AddItem from "./items/AddItem";
import ItemList from "./items";

import languageContext from "../context/language";

function Routing(props) {
  /** Check the localstorage have information of logged user */
  (function () {
    const loggedUser = reactLocalStorage.get("loggedUser");
    if (loggedUser && props.user.isAuthenticated === false) {
      props.updateUserStore(JSON.parse(loggedUser));
    }
  })();

  return (
    <Container>
      <languageContext.Provider>
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
              <AuthRoute path="/users">
                <UserList />
              </AuthRoute>
              <AuthRoute path="/add-user">
                <AddUser />
              </AuthRoute>
              <AuthRoute path="/update-user/:id">
                <AddUser />
              </AuthRoute>
              <AuthRoute path="/add-item">
                <AddItem />
              </AuthRoute>
              <AuthRoute path="/update-item/:id">
                <AddItem />
              </AuthRoute>
              <AuthRoute path="/items">
                <ItemList />
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { updateUserStore })(Routing);

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

const AuthRoute = connect(({ user }) => {
  return { user };
}, null)(AuthRouteFn);
