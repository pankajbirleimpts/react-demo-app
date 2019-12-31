import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Checkbox } from "semantic-ui-react";
import { signin, signout } from "../../actions/UserAction";
import { langs } from "../../config";
import { Loader } from "../common";

class Signin extends Component {
  state = {
    //  location : useLocation()
  };

  componentDidMount() {
    const isAuthenticated = reactLocalStorage.get("isAuthenticated");
    console.log("isAuthenticated ", isAuthenticated, typeof isAuthenticated);
    if (isAuthenticated) {
      this.props.history.replace("/dashboard");
    }
  }

  formSubmitHandler = values => {
    console.log("formSubmitHandler ", values);
    this.props.signin(values, () => {
      let { from } = this.props.location.state || { from: { pathname: "/" } };
      this.props.history.replace("/dashboard");
    });
  };

  /**
   * @loginFormValidation
   * @desc: form validation
   */
  loginFormValidation = () => {
    return Yup.object().shape({
      password: Yup.string().required(langs.messages.REQUIRED),
      email: Yup.string()
        .email(langs.messages.INVALID_EMAIL)
        .required(langs.messages.REQUIRED)
    });
  };

  renderForm = () => {
    return (
      <Form noValidate className="ui form">
        <div className="field">
          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage component="p" name="email" className="red" />
        </div>
        <div className="field">
          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage component="p" name="password" className="red" />
        </div>
        <div className="field">
          <div class="ui fitted toggle checkbox">
            <Field
              name="loginasadmin"
              type="checkbox"
              readonly=""
              tabindex="0"
            />
            <label></label>
          </div>
        </div>
        <button className="ui button primary" type="submit">
          Signin
        </button>
      </Form>
    );
  };

  render() {
    return (
      <Grid>
        <Loader isLoading={this.props.user.isLoading} />
        <Grid.Row centered>
          <Grid.Column width="8">
            <h2>Signin</h2>
            <Formik
              initialValues={{
                email: "",
                password: "",
                loginasadmin: ""
              }}
              validationSchema={this.loginFormValidation()}
              onSubmit={values => {
                this.formSubmitHandler(values);
              }}
            >
              {this.renderForm}
            </Formik>
          </Grid.Column>
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

export default connect(mapStateToProp, { signin, signout })(withRouter(Signin));
