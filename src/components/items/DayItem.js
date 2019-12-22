import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid } from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import { getItem, updateItem, addItem, getAllItems } from "../../actions/ItemAction";
import { langs } from "../../config";
import { Loader } from "../common";


class DayItem extends Component {

  state = {
    id: "",
    initialValues: {
      itemId: "",
      itemDetails: null,
      date: "",
      totalQuantity: "",
      remainingQuantity: ""
    }
  }

  componentDidMount() {
    this.props.getAllItems();
    const { id } = this.props.match.params;
    if (id) {
      this.props.getItem(id, response => {
        console.log('response', response);
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
    if (this.state.id !== "") {
      // Update item
      this.props.updateItem(this.state.id, values, () => {
        this.props.history.replace("/items");
      }, true);
    } else {
      // Add Item 
      this.props.addItem(values, () => {
        this.props.history.replace("/items");
      });
    }
  };

  /**
   * @formValidation
   * @desc: form validation
   */
  formValidation = () => {
    return Yup.object().shape({
      date: Yup.string()
        .required(langs.messages.REQUIRED),
      itemId: Yup.string()
        .required(langs.messages.REQUIRED),
      totalQuantity: Yup.number()
        .required(langs.messages.REQUIRED),
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
          <SemanticDatepicker locale="pt-BR" name="date"  />
          <ErrorMessage component="p" name="date" className="red" />
        </div>
        <div className="field">
          <label>Item *</label>
          <Field name="category" as="select">
            <option value="">Please Select</option>
            {
              this.props.item.allItems.map(val => {
                return <option key={val.id} value={val.id}>{val.itemName}</option>
              })
            }
          </Field>
          <ErrorMessage component="p" name="category" className="red" />
        </div>
        <div className="field">
          <label>Quantity *</label>
          <Field name="amount" type="number" />
          <ErrorMessage component="p" name="amount" className="red" />
        </div>
        <Link to="/items" className="ui button">
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
        <Grid.Row centered>
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

function mapStateToProp({ item }) {
  return {
    item
  };
}

export default connect(mapStateToProp, { getItem, updateItem, addItem, getAllItems })(
  withRouter(DayItem)
);
