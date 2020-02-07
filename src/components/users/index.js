import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Checkbox } from "semantic-ui-react";
import { getAllUsers } from "../../actions/UserAction";
import { langs } from "../../config";
import { Loader, CustomTable } from "../common";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "First Name",
          keyName: "firstName",
          sort: true,
          searchable: true,
          sortable: true
        },
        {
          label: "Last Name",
          keyName: "lastName",
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: "Email",
          keyName: "email",
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: "Employee Id",
          keyName: "employeeId",
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: "Balance",
          keyName: "balance",
          sort: null,
          searchable: true,
          sortable: true
        }
      ]
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  formSubmitHandler = values => { };

  render() {
    return (
      <Grid>
        <Loader isLoading={this.props.user.isLoading} />
        <Grid.Row>
          <Grid.Column width={8} textAlign="left"><h3>Manage Users</h3></Grid.Column>
          <Grid.Column width={8} textAlign="right"><Link to="/add-user" className="ui button primary">+ Add User</Link></Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <CustomTable
            columns={this.state.columns}
            tableData={this.props.user.allUsers}
            module="USERS"
          />
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

export default connect(mapStateToProp, { getAllUsers })(UserList);
