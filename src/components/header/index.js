import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import { Grid, Image } from "semantic-ui-react";
import "./header.css";
import { signout } from "../../actions/UserAction";

function Header({ user, signout, history }) {
  const signoutToUser = () => {
    signout(() => {
      history.push("/login");
    });
  };

  return (
    <Grid className="header-container">
      <Grid.Row className="header-name-section">
        <Grid.Column width={12}>
          <h3>Canteen Management System</h3>
        </Grid.Column>
        {user.isAuthenticated === true && (
          <Grid.Column width={4}>
            <div className="user-details">
              {user.data.firstName} {user.data.lastName}
              <p>({user.data.role})</p>
              <a href="javasctipt:void(0)" onClick={() => signoutToUser()}>
                Logout
              </a>
            </div>
          </Grid.Column>
        )}
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <div className="ui secondary pointing menu">
            <MenuLink to="/" label="Home" />
            {user.isAuthenticated === true && (
              <MenuLink to="/dashboard" label="Dashboard" />
            )}
            {user.isAuthenticated !== true && (
              <React.Fragment>
                <MenuLink to="/login" label="Login" />
                <MenuLink to="/signup" label="Signup" />
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
