import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { signin, signout } from "../../actions/UserAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid } from "semantic-ui-react";
import { langs } from "../../config";


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
  state = {
    //  location : useLocation()
  };

  login = () => {
    this.props.signin(() => {
      let { from } = this.props.location.state || { from: { pathname: "/" } };
      console.log("from ", from);
      this.props.history.replace(from);
    });
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
      bio: Yup.string().max(250, langs.messages.CHAR_MAX_LIMIT_250),
      gender: Yup.string().required(langs.messages.REQUIRED),
      country: Yup.string().required(langs.messages.REQUIRED)
    });
  };

  renderForm = ({ values, setFieldValue }) => {
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
          <label>Gender</label>
          <div className="field">
            <div className="ui radio checkbox">
              <Field
                type="radio"
                name="gender"
                value="male"
                checked={values.gender === "male"}
                onChange={() => setFieldValue("gender", "male")}
              />
              <label onClick={() => setFieldValue("gender", "male")}>
                Male
              </label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <Field
                type="radio"
                name="gender"
                value="female"
                checked={values.gender === "female"}
                onChange={() => setFieldValue("gender", "female")}
              />
              <label onClick={() => setFieldValue("gender", "female")}>
                Female
              </label>
            </div>
          </div>
          <ErrorMessage component="p" name="gender" className="red" />
        </div>
        <div className="field">
          <label>Bio</label>
          <Field name="bio" rows={2} as="textarea" />
          <ErrorMessage component="p" name="bio" className="red" />
        </div>
        <div className="field">
          <label>Country</label>
          <Field name="country" as="select">
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            <option value="England">England</option>
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
      <Grid celled="internally">
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
                gender: "",
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

export default connect(
  mapStateToProp,
  { signin, signout }
)(withRouter(Signup));
