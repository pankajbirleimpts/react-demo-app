import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../actions/UserAction";

class Dashboard extends Component {
  signout = () => {
    this.props.signout(() => {
      this.props.history.push("/login");
    });
  };

  render() {
    const AuthButton = () => {
      return this.props.user.isAuthenticated ? (
        <p>
          Welcome! <button onClick={() => this.signout()}>Sign out</button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      );
    };

    return (
      <div>
        <h2>Dashboard</h2>
        <AuthButton />
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(
  mapStateToProps,
  { signout }
)(withRouter(Dashboard));
