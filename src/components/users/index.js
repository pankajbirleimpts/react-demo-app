import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Checkbox } from "semantic-ui-react";
import { getAllUsers} from "../../actions/UserAction";
import { langs } from "../../config";
import { Loader, CustomTable } from "../common";

class UserList extends Component {
  state = {
    columns: [
      {
        
      }
    ]
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  formSubmitHandler = values => {
  };

  render() {
    return (
      <Grid>
        <Loader isLoading={this.props.user.isLoading} />
        <h3>Manage UserList</h3>
        <Grid.Row centered>
          <CustomTable columns={this.state.columns} tableData={this.props.user.allUsers}>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProp({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProp, { getAllUsers })(withRouter(UserList));
