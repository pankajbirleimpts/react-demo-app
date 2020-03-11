import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
  getAllItems,
  purchaseItem,
  getDayItem,
  getAllDayItems
} from '../../actions/ItemAction';
import { getAllUsers } from '../../actions/UserAction';
import { langs } from '../../config';
import { Loader } from '../common';
import './dayitem.css';

export class UnconnectedPurchaseItem extends Component {
  state = {
    id: '',
    otherTransaction: false,
    initialValues: {
      itemId: '',
      userId: '',
      userDetails: null,
      itemDetails: null,
      date: '',
      quantity: '',
      amount: 0
    }
  };

  componentDidMount() {
    // Get all items
    const todayDate = moment().format('DD-MMM-YYYY');
    this.props.getAllDayItems(todayDate);
    // get all users
    this.props.getAllUsers();
  }
  /**
   * @formSubmitHandler
   * @desc: Submit the signup form
   */
  formSubmitHandler = values => {
    const dayItem = this.props.item.allDayItems.find(
      val => val.id === values.itemId
    );
    const userDetails = this.props.user.allUsers.find(
      val => val.id === values.userId
    );
    const purchaseAmount = this.getTotalAmount(values.itemId, values.quantity);
    // If user do not have sufficient balance
    if (this.getUserBalance(userDetails.id) < purchaseAmount) {
      toast.warn(langs.messages.INSUFFICIENT_BALANCE);
      return false;
    }

    const remainingQuantity = dayItem.remainingQuantity + values.quantity;
    if (remainingQuantity > dayItem.totalQuantity) {
      toast.warn(langs.messages.INSUFFICIENT_QUANTITY);
      return false;
    }
    // Update remaining quantity
    dayItem.remainingQuantity = remainingQuantity;
    // Update user balance
    userDetails.balance = userDetails.balance - purchaseAmount;

    values.userDetails = userDetails;
    values.itemDetails = dayItem.itemDetails;
    values.date = moment().format('DD-MMM-YYYY');
    values.purchaseAmount = purchaseAmount;

    this.props.purchaseItem(userDetails, values, dayItem, () => {
      const state = this.state;
      if (state.otherTransaction) {
        const initialValues = {
          ...this.state.initialValues,
          userId: values.userId,
          amount: ''
        };
        this.setState({ initialValues, otherTransaction: false });
      } else {
        this.setState({
          otherTransaction: false,
          initialValues: {
            ...this.state.initialValues,
            userId: '',
            amount: '',
            itemId: ''
          }
        });
      }
    });
  };

  /**
   * @formValidation
   * @desc: form validation
   */
  formValidation = () => {
    return Yup.object().shape({
      userId: Yup.string().required(langs.messages.REQUIRED),
      itemId: Yup.string().required(langs.messages.REQUIRED),
      quantity: Yup.number()
        .required(langs.messages.REQUIRED)
        .test(
          'quantityValidation',
          langs.messages.QUANTITY_VALIDATION,
          function(value) {
            if (value > 0) {
              return true;
            } else {
              return false;
            }
          }
        )
    });
  };

  // Get item amount
  getItemAmount = itemId => {
    if (itemId) {
      const selectedItem = this.props.item.allDayItems.find(
        val => val.id === itemId
      );
      if (selectedItem) {
        return selectedItem.amount;
      }
      return 0;
    }
    return 0;
  };

  // Get item remaining quantity
  getItemRemainQuantity = itemId => {
    if (itemId) {
      const selectedItem = this.props.item.allDayItems.find(
        val => val.id === itemId
      );
      if (selectedItem) {
        return selectedItem.totalQuantity - selectedItem.remainingQuantity;
      }
      return 0;
    }
    return 0;
  };

  //Get total amount
  getTotalAmount = (itemId, quantity) => {
    const itemPrice = this.getItemAmount(itemId);
    return (itemPrice * quantity).toFixed(2);
  };

  handleClickMakeOtherTransaction = () => {
    this.setState({
      otherTransaction: true
    });
  };

  getUserBalance = userId => {
    if (userId) {
      const userDetails = this.props.user.allUsers.find(
        user => user.id === userId
      );
      if (userDetails) return userDetails.balance;
      return 0;
    }
    return 0;
  };

  /**
   * @renderForm
   * @desc: rednder form
   */
  renderForm = ({ values }) => {
    return (
      <Form noValidate className='ui form'>
        <div className='field'>
          <label>User *</label>
          <Field name='userId' as='select' data-test="userId-input">
            <option value=''>Please Select</option>
            {this.props.user.allUsers
              .filter(val => val.role === 'EMPLOYEE')
              .map(val => {
                return (
                  <option key={val.id} value={val.id}>
                    {val.firstName} {val.lastName}
                  </option>
                );
              })}
          </Field>
          {values.userId && (
            <div className='show-user-balance'>
              Current Balance: Rs. {this.getUserBalance(values.userId)}
            </div>
          )}
          <ErrorMessage component='p' name='userId' className='red' />
        </div>
        <div className='field'>
          <label>Item *</label>
          <Field name='itemId' as='select' data-test="itemId-input">
            <option value=''>Please Select</option>
            {this.props.item.allDayItems.map(val => {
              return (
                <option key={val.id} value={val.id}>
                  {val.itemName}
                </option>
              );
            })}
          </Field>
          <ErrorMessage component='p' name='itemId' className='red' />
          {this.getItemAmount(values.itemId) > 0 && (
            <div className='show-amount'>
              Rs. {this.getItemAmount(values.itemId)} {'   '}(Remaining Qty:{' '}
              {this.getItemRemainQuantity(values.itemId)})
            </div>
          )}
        </div>
        <div className='field'>
          <label>Quantity *</label>
          <Field name='quantity' type='number' data-test="quantity-input"/>
          <ErrorMessage component='p' name='quantity' className='red' />
          {this.getTotalAmount(values.itemId, values.quantity) > 0 && (
            <div className='show-total-amount'>
              Total: Rs. {this.getTotalAmount(values.itemId, values.quantity)}
            </div>
          )}
        </div>        
        <button className='ui button primary' type='submit'>
          Submit
        </button>
        <button
          data-test="other-transation-button"
          className='ui button primary'
          type='submit'
          onClick={() => {
            this.handleClickMakeOtherTransaction();
          }}
        >
          Submit & Make Other Transaction
        </button>
      </Form>
    );
  };

  render() {
    return (
      <Grid>
        <Loader isLoading={this.props.item.isLoading} />
        <Grid.Row centered className='add-day-item-container'>
          <Grid.Column width='8'>
            <h2 data-test="page-heading">Purchase Item</h2>
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

function mapStateToProp({ item, user }) {
  return {
    item,
    user
  };
}

export default connect(mapStateToProp, {
  purchaseItem,
  getDayItem,
  getAllItems,
  getAllUsers,
  getAllDayItems
})(UnconnectedPurchaseItem);
