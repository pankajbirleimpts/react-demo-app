import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import moment from "moment";
import {
  getAllItems,
  purchaseItem,
  getDayItem
} from "../../actions/ItemAction";
import { getAllUsers } from "../../actions/UserAction";
import { langs } from "../../config";
import { Loader } from "../common";
import "./dayitem.css";

class PurchaseItem extends Component {
  state = {
    id: "",
    initialValues: {
      itemId: "",
      userId: "",
      userDetails: null,
      itemDetails: null,
      date: "",
      quantity: 0,
      amount: 0
    }
  };

  componentDidMount() {
    // Get all items
    this.props.getAllItems();
    // get all users
    this.props.getAllUsers();
  }
  /**
   * @formSubmitHandler
   * @desc: Submit the signup form
   */
  formSubmitHandler = values => {
    values.itemDetails = this.props.item.allItems.find(
      val => val.id === values.itemId
    );
    values.userDetails = this.props.user.allUsers.find(
      val => val.id === values.userId
    );
    values.date = moment().format("DD-MMM-YYYY");
    values.purchaseAmount = this.getTotalAmount(values.itemId, values.quantity);
    console.log("formSubmitHandler values ", values);
    // Add Item
    this.props.purchaseItem(values, () => {
       this.props.history.push("/transations");
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
      quantity: Yup.number().required(langs.messages.REQUIRED)
    });
  };

  // Get item amount
  getItemAmount = itemId => {
    if (itemId) {
      const selectedItem = this.props.item.allItems.find(
        val => val.id === itemId
      );
      if (selectedItem) {
        return selectedItem.amount;
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

  /**
   * @renderForm
   * @desc: rednder form
   */
  renderForm = ({ values }) => {
    return (
      <Form noValidate className="ui form">
        <div className="field">
          <label>User *</label>
          <Field name="userId" as="select">
            <option value="">Please Select</option>
            {this.props.user.allUsers
              .filter(val => val.role === "EMPLOYEE")
              .map(val => {
                return (
                  <option key={val.id} value={val.id}>
                    {val.firstName} {val.lastName}
                  </option>
                );
              })}
          </Field>
          <ErrorMessage component="p" name="userId" className="red" />
        </div>
        <div className="field">
          <label>Item *</label>
          <Field name="itemId" as="select">
            <option value="">Please Select</option>
            {this.props.item.allItems.map(val => {
              return (
                <option key={val.id} value={val.id}>
                  {val.itemName}
                </option>
              );
            })}
          </Field>
          <ErrorMessage component="p" name="itemId" className="red" />
          {this.getItemAmount(values.itemId) > 0 && (
            <div className="show-amount">
              Rs. {this.getItemAmount(values.itemId)}
            </div>
          )}
        </div>
        <div className="field">
          <label>Quantity *</label>
          <Field name="quantity" type="number" />
          <ErrorMessage component="p" name="quantity" className="red" />
          {this.getTotalAmount(values.itemId, values.quantity) > 0 && (
            <div className="show-total-amount">
              Total: Rs. {this.getTotalAmount(values.itemId, values.quantity)}
            </div>
          )}
        </div>
        <Link to="/day-items" className="ui button">
          Back to Items List
        </Link>
        <button className="ui button primary" type="submit">
          {this.state.id !== "" ? "Update" : "Submit"}
        </button>
      </Form>
    );
  };

  render() {
    return (
      <Grid>
        <Loader isLoading={this.props.item.isLoading} />
        <Grid.Row centered className="add-day-item-container">
          <Grid.Column width="8">
            <h2> {this.state.id !== "" ? "Update" : "Add"} Day Item</h2>
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
  getAllUsers
})(withRouter(PurchaseItem));
