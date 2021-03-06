import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid } from "semantic-ui-react";
/* import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import DatePicker from 'react-date-picker'; */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  getAllItems,
  addDayItem,
  updateDayItem,
  getDayItem
} from "../../actions/ItemAction";
import { langs } from "../../config";
import { Loader } from "../common";
import "./dayitem.css";
export class UnconnectedDayItem extends Component {
  state = {
    id: "",
    initialValues: {
      itemId: "",
      itemDetails: null,
      date: "",
      totalQuantity: 0,
      remainingQuantity: 0
    }
  };

  componentDidMount() {
    this.props.getAllItems();
    const { id } = this.props.match.params;
    if (id) {
      this.props.getDayItem(id, response => {
        response.date = moment(response.date).toDate();
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
    // debugger;
    const { date } = values;
    values.itemDetails = this.props.item.allItems.find(
      val => val.id === values.itemId
    );
    values.itemDate = moment(date).format("DD-MMM-YYYY");
    const { id } = this.props.match.params;
    if (id) {
      // Update item
      this.props.updateDayItem(
        this.state.id,
        values,
        () => {
          this.props.history.replace("/day-items");
        },
        true
      );
    } else {
      // Add Item
      this.props.addDayItem(values, () => {
        this.props.history.replace("/day-items");
      });
    }
  };

  /**
   * @formValidation
   * @desc: form validation
   */
  formValidation = () => {
    return Yup.object().shape({
      date: Yup.string().required(langs.messages.REQUIRED),
      itemId: Yup.string().required(langs.messages.REQUIRED),
      totalQuantity: Yup.number().required(langs.messages.REQUIRED)
    });
  };

  /**
   * @renderForm
   * @desc: rednder form
   */
  renderForm = ({ values, setFieldValue }) => {
    return (
      <Form noValidate className="ui form">
        <div className="field">
          <label>Date *</label>
          <Field name="date">
            {({
              field, // { name, value, onChange, onBlur }
              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }) => (
                <DatePicker
                  data-test="date-input"
                  dateFormat="dd/MMM/yyyy"
                  selected={values.date}
                  onChange={(date) => {
                    //   setFieldValue("date", moment(date, "DD-MMM-YYYY").toDate());
                    setFieldValue("date", date);
                  }}
                />
              )}
          </Field>
          <ErrorMessage component="p" name="date" className="red" />
        </div>
        <div className="field">
          <label>Item *</label>
          <Field data-test="itemId-input" name="itemId" as="select">
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
        </div>
        <div className="field">
          <label>Quantity *</label>
          <Field data-test="totalQuantity-input" name="totalQuantity" type="number" />
          <ErrorMessage component="p" name="totalQuantity" className="red" />
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
    const { id } = this.props.match.params;
    return (
      <Grid>
        <Loader isLoading={this.props.item.isLoading} />
        <Grid.Row centered className="add-day-item-container">
          <Grid.Column width="8">
            <h2 data-test="page-heading">{id ? "Update" : "Add"} Day Item</h2>
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

function mapStateToProp({ item }) {
  return {
    item
  };
}

export default connect(mapStateToProp, {
  addDayItem,
  updateDayItem,
  getDayItem,
  getAllItems
})(UnconnectedDayItem);
