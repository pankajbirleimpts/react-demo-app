import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import { Grid, Image } from "semantic-ui-react";
import "./header.css";
import { signout } from "../../actions/UserAction";

export function Header({ user, signout, history }) {
  const signoutToUser = () => {
    signout(() => {
      history.push("/login");
    });
  };

  return (
    <Grid className="header-container">
      <Grid.Row className="header-name-section">
        <Grid.Column width={12}>
          <h3 className="web-logo">Canteen Management System</h3>
        </Grid.Column>
        {user.isAuthenticated === true && (
          <Grid.Column width={4} data-test="user-details-section">
            <div className="user-details">
              <p className="user-name">
                {user.data.firstName} {user.data.lastName}
              </p>
              <p className="user-role">({user.data.role})</p>
              <a href="javasctipt:void(0)" data-test="logout-action" onClick={() => signoutToUser()}>
                Logout
              </a>
            </div>
          </Grid.Column>
        )}
      </Grid.Row>

      <Grid.Row className="menu-container">
        <Grid.Column>
          <div className="ui secondary pointing menu">
            {user.isAuthenticated === true && (
              <React.Fragment key="user-menu">
                <MenuLink to="/dashboard" label="Dashboard" />
                {user.data && user.data.role && user.data.role === "ADMIN" && (
                  <React.Fragment key="admin-nav">
                    <MenuLink data-test="admin-navigation" to="/users" label="Users" />
                    <MenuLink to="/items" label="Items" />
                    <MenuLink to="/day-items" label="Day Items" />
                    <MenuLink to="/purchase-item" label="Purchase Item" />
                  </React.Fragment>
                )}
                <MenuLink to="/transactions" label="Transactions" />
              </React.Fragment>
            )}
            {user.isAuthenticated !== true && (
              <React.Fragment >
                <MenuLink  to="/" label="Home" />
                <MenuLink data-test="sign-navigation" to="/signup" label="Signup" />
              </React.Fragment>
            )}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { signout })(withRouter(Header));
