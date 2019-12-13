import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Grid } from "semantic-ui-react";

export default function Header() {
  return (
    <Grid.Row>
      <div className="ui secondary pointing menu">
        <MenuLink to="/" label="Home" />
        <MenuLink to="/about" label="About" />
        <MenuLink to="/dashboard" label="Dashboard" />
        <MenuLink to="/login" label="Login" />
        <MenuLink to="/signup" label="Signup" />
      </div>
    </Grid.Row>
  );
}

function MenuLink({ label, to, activeOnlyWhenExact = true }) {
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
