import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

/**
 * method firebaseResponseTransform
 * desc: change the firebase response as object of array
 * @param {*} response
 */
export function firebaseResponseTransform(response) {
  console.log("response", response, typeof response);
  const result = [];
  Object.keys(response).forEach(key => {
    result.push({ ...response[key], id: key });
  });
  return result;
}

function MenuLinkfn({ label, to, activeOnlyWhenExact = true, user }) {
  console.log("user MenuLink", user);
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
