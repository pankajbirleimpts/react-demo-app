import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid } from "semantic-ui-react";
import { signin, signout, signup } from "../../actions/UserAction";
import { langs } from "../../config";
import { Loader } from "../common";

function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg,
    params: {
      reference: ref.path
    },
    test: function(value) {
      return value && value === this.resolve(ref);
    }
  });
}
Yup.addMethod(Yup.string, "equalTo", equalTo);

class Signup extends Component {
  
  componentDidMount() {
    const isAuthenticated = reactLocalStorage.get("isAuthenticated");
    console.log("isAuthenticated ", isAuthenticated, typeof isAuthenticated);
    if (isAuthenticated) {
      this.props.history.replace("/dashboard");
    }
  }

  /**
   * @formSubmitHandler
   * @desc: Submit the signup form
   */
  formSubmitHandler = values => {
    delete values.confirmPassword;
    values.balance = 0;
    values.role = "EMPLOYEE";
    this.props.signup(values, () => {
      this.props.history.replace("/login");
    });
  };

  /**
   * @loginFormValidation
   * @desc: form validation
   */
  loginFormValidation = () => {
    return Yup.object().shape({
      firstName: Yup.string()
        .max(25, langs.messages.CHAR_MAX_LIMIT_25)
        .required(langs.messages.REQUIRED),
      lastName: Yup.string()
        .max(25, langs.messages.CHAR_MAX_LIMIT_25)
        .required(langs.messages.REQUIRED),
      password: Yup.string()
        .min(8, langs.messages.CHAR_MIN_LIMIT_8)
        .required(langs.messages.REQUIRED),
      confirmPassword: Yup.string()
        .required(langs.messages.REQUIRED)
        .equalTo(Yup.ref("password"), langs.messages.PASSWORD_NOT_MATCH),
      email: Yup.string()
        .email(langs.messages.INVALID_EMAIL)
        .required(langs.messages.REQUIRED),
      country: Yup.string().required(langs.messages.REQUIRED)
    });
  };

  /**
   * @renderForm
   * @desc: rednder form
   */
  renderForm = ({ values, onChange, setFieldValue }) => {
    return (
      <Form noValidate className="ui form">
        <div className="field">
          <label>First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage component="p" name="firstName" className="red" />
        </div>
        <div className="field">
          <label>Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage component="p" name="lastName" className="red" />
        </div>
        <div className="field">
          <label>Employee ID</label>
          <Field name="employeeId" type="text" />
          <ErrorMessage component="p" name="employeeId" className="red" />
        </div>
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
          <label>Confirm Password</label>
          <Field name="confirmPassword" type="password" />
          <ErrorMessage component="p" name="confirmPassword" className="red" />
        </div>
        <div className="field">
          <label>Location</label>
          <Field name="country" as="select">
            <option value="">Select Location</option>
            <option value="Indore">Indore</option>
            <option value="Indore">Noida</option>
            <option value="Banglore">Banglore</option>
          </Field>
          <ErrorMessage component="p" name="country" className="red" />
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
            <h2>Signup</h2>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                employeeId: "",
                country: ""
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

export default connect(mapStateToProp, { signin, signout, signup })(
  withRouter(Signup)
);
