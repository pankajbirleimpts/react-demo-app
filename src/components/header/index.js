import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import languageContext from "../../context/language";

export default function Header() {
  const langContext = useContext(languageContext);
  console.log("languageContext header ", langContext);
  return (
    <Grid.Row>
      <p>{langContext}</p>
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
