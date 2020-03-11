import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch, Redirect, Route } from "react-router-dom";
import { toast } from 'react-toastify';
import { langs } from '../config';

/**
 * method firebaseResponseTransform
 * desc: change the firebase response as object of array
 * @param {*} response
 */
export function firebaseResponseTransform(response) {
  const result = [];
  if (response) {
    Object.keys(response).forEach(key => {
      result.push({ ...response[key], id: key });
    });
  }
  return result;
}

export function MenuLink({ label, to, activeOnlyWhenExact = true }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <Link className={match ? "item active" : "item"} to={to}>
      {label}
    </Link>
  );
}




// screen if you're not yet authenticated.
const AuthRouteFn = ({ component: Component, permission, user, ...rest }) => {
  console.log("user.isAuthenticated && permission === undefined ", user.isAuthenticated , permission, user.isAuthenticated && permission === undefined);
  return (
    <Route
      {...rest}
      render={({ location, props, history, match }) =>
        (user.isAuthenticated && permission === undefined) ||
 
          (user.isAuthenticated &&
            permission !== undefined &&
            permission === user.data.role) ? (
            <Component {...props} history={history} match={match} />
          ) : (
            <React.Fragment>
              {toast.warning(langs.messages.PERMISSION_MSG)}
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            </React.Fragment>
          )
      }
    />
  );
};

export const AuthRoute = connect(({ user }) => {
  return { user };
}, null)(AuthRouteFn);
