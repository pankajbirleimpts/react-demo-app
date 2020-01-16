import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Grid } from 'semantic-ui-react';
import { getUser, signup, updateUser } from '../../actions/UserAction';
import { langs } from '../../config';
import { Loader } from '../common';

class AddUser extends Component {
  state = {
    id: '',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      balance: '',
      employeeId: '',
      country: ''
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.getUser(id, response => {
        console.log('componentDidMount response', response);
        this.setState({
          initialValues: response,
          id
        });
      });
    }
  }
  /**
   * @formSubmitHandler
   * @desc: Submit the signup form
   */
  formSubmitHandler = values => {
    delete values.confirmPassword;
    values.role = 'EMPLOYEE';
    if (this.state.id !== '') {
      // Update user
      this.props.updateUser(
        this.state.id,
        values,
        () => {
          this.props.history.replace('/users');
        },
        true
      );
    } else {
      // Add User
      this.props.signup(
        values,
        () => {
          this.props.history.replace('/users');
        },
        true
      );
    }
  };

  /**
   * @formValidation
   * @desc: form validation
   */
  formValidation = () => {
    return Yup.object().shape({
      firstName: Yup.string()
        .max(25, langs.messages.CHAR_MAX_LIMIT_25)
        .required(langs.messages.REQUIRED),
      lastName: Yup.string()
        .max(25, langs.messages.CHAR_MAX_LIMIT_25)
        .required(langs.messages.REQUIRED),
      employeeId: Yup.string().required(langs.messages.REQUIRED),
      password: Yup.string()
        .min(8, langs.messages.CHAR_MIN_LIMIT_8)
        .required(langs.messages.REQUIRED),
      balance: Yup.number().required(langs.messages.REQUIRED),
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
  renderForm = ({ values, setFieldValue }) => {
    return (
      <Form noValidate className='ui form'>
        <div className='field'>
          <label>First Name</label>
          <Field name='firstName' type='text' />
          <ErrorMessage component='p' name='firstName' className='red' />
        </div>
        <div className='field'>
          <label>Last Name</label>
          <Field name='lastName' type='text' />
          <ErrorMessage component='p' name='lastName' className='red' />
        </div>
        <div className='field'>
          <label>Employee ID</label>
          <Field name='employeeId' type='text' />
          <ErrorMessage component='p' name='employeeId' className='red' />
        </div>
        <div className='field'>
          <label>Email</label>
          <Field name='email' type='email' />
          <ErrorMessage component='p' name='email' className='red' />
        </div>
        <div className='field'>
          <label>Balance</label>
          <Field name='balance' type='number' />
          <ErrorMessage component='p' name='balance' className='red' />
        </div>
        {this.state.id === '' && (
          <div className='field'>
            <label>Password</label>
            <Field name='password' type='password' />
            <ErrorMessage component='p' name='password' className='red' />
          </div>
        )}
        <div className='field'>
          <label>Location</label>
          <Field name='country' as='select'>
            <option value=''>Select Location</option>
            <option value='Indore'>Indore</option>
            <option value='Indore'>Noida</option>
            <option value='Banglore'>Banglore</option>
          </Field>
          <ErrorMessage component='p' name='country' className='red' />
        </div>
        <Link to='/users' className='ui button'>
          Back to Users List
        </Link>
        <button className='ui button primary' type='submit'>
          {this.state.id !== '' ? 'Update' : 'Submit'}
        </button>
      </Form>
    );
  };

  render() {
    return (
      <Grid>
        <Loader isLoading={this.props.user.isLoading} />
        <Grid.Row centered>
          <Grid.Column width='8'>
            <h2> {this.state.id !== '' ? 'Update' : 'Add'} User</h2>
            <Formik
              enableReinitialize
              initialValues={this.state.initialValues}
              validationSchema={this.formValidation()}
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

export default connect(mapStateToProp, { getUser, signup, updateUser })(
  withRouter(AddUser)
);
