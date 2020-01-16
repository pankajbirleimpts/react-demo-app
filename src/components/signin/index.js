// eslint-disable-next-line linebreak-style
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Grid } from 'semantic-ui-react';
import { signin, signout } from '../../actions/UserAction';
import { langs } from '../../config';
import { Loader } from '../common';

export class UnConnectedSignin extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { isAuthenticated } = this.props.user;
    if (isAuthenticated) {
      const { history } = this.props;
      history.replace('/dashboard');
    }
  }

  formSubmitHandler(values) {
    const { signin, history } = this.props;
    signin(values, () => {
      console.log(" this.props ", this.props);
      history.replace('/dashboard');
    });
  };

  /**
   * @loginFormValidation
   * @desc: form validation
   */
  loginFormValidation = () =>
    Yup.object().shape({
      password: Yup.string().required(langs.messages.REQUIRED),
      email: Yup.string()
        .email(langs.messages.INVALID_EMAIL)
        .required(langs.messages.REQUIRED)
    });

  renderForm = () => (
    <Form noValidate className='ui form'>
      <div className='field'>
        <label>Email</label>
        <Field data-test="email-input" name='email' type='email' />
        <ErrorMessage component='p' name='email' className='red' />
      </div>
      <div className='field'>
        <label>Password</label>
        <Field data-test="password-input" name='password' type='password' />
        <ErrorMessage component='p' name='password' className='red' />
      </div>
      <div className='field'>
        <div className='ui fitted toggle checkbox'>
          <Field name='loginasadmin' type='checkbox' />
          <label />
        </div>
        <span className="label-login-as-admin">Login as Admin</span>
      </div>
      <button className='ui button primary' type='submit'>
        Signin
      </button>
    </Form>
  );

  render() {
    return (
      <Grid>
        <Loader isLoading={this.props.user.isLoading} />
        <Grid.Row centered>
          <Grid.Column width='8'>
            <h2>Signin</h2>
            <Formik
              initialValues={{
                email: '',
                password: '',
                loginasadmin: ''
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

export default connect(mapStateToProp, { signin, signout })(UnConnectedSignin);
