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

function MenuLinkfn({ label, to, activeOnlyWhenExact = true, user }) {
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

const mapStateToProps = state => ({
  user: state.user
});

const MenuLink = connect(mapStateToProps, null)(MenuLinkfn);

export { MenuLink };



// screen if you're not yet authenticated.
const AuthRouteFn = ({ children, permission, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user.isAuthenticated && permission === undefined) ||
          (user.isAuthenticated &&
            permission !== undefined &&
            permission === user.data.role) ? (
            children
          ) : (
            <React.Fragment>
              {toast.warn(langs.messages.PERMISSION_MSG)}
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
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
