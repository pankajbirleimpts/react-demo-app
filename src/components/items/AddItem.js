import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Grid } from 'semantic-ui-react';
import { getItem, updateItem, addItem } from '../../actions/ItemAction';
import { langs, itemCategories } from '../../config';
import { Loader } from '../common';


export class UnconnectedAddItem extends Component {
  state = {
    id: '',
    initialValues: {
      itemName: '',
      description: '',
      category: '',
      amount: '',
      isActive: '',
    },
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.getItem(id, (response) => {
        this.setState({
          initialValues: response,
          id,
        });
      });
    }
  }

  /**
   * @formSubmitHandler
   * @desc: Submit the signup form
   */
  formSubmitHandler = (values) => {
    const { id } = this.props.match.params;
    if (id) {
      // Update item
      this.props.updateItem(id, values, () => {
        this.props.history.replace('/items');
      }, true);
    } else {
      // Add Item
      this.props.addItem(values, () => {
        this.props.history.replace('/items');
      });
    }
  };

  /**
   * @formValidation
   * @desc: form validation
   */
  formValidation = () => Yup.object().shape({
    itemName: Yup.string()
      .max(25, langs.messages.CHAR_MAX_LIMIT_25)
      .required(langs.messages.REQUIRED),
    description: Yup.string()
      .max(300, langs.messages.CHAR_MAX_LIMIT_300)
      .required(langs.messages.REQUIRED),
    category: Yup.string()
      .required(langs.messages.REQUIRED),
    amount: Yup.number()
      .required(langs.messages.REQUIRED),
    isActive: Yup.string()
      .required(langs.messages.REQUIRED),
  });

  /**
   * @renderForm
   * @desc: rednder form
   */
  renderForm = ({ values, setFieldValue }) => {
    const itemOptions = itemCategories.map(val => <option value={val.value}>{val.label}</option>);
    return (
      <Form noValidate className="ui form" >
        <div className="field">
          <label>Item Name *</label>
          <Field data-test="itemName-input" name="itemName" type="text" />
          <ErrorMessage component="p" name="itemName" className="red" />
        </div>
        <div className="field">
          <label>Category *</label>
          <Field data-test="category-input" name="category" as="select">
            <option value="">Please Select</option>
            {itemOptions}
          </Field>
          <ErrorMessage component="p" name="category" className="red" />
        </div>
        <div className="field">
          <label>Amount *</label>
          <Field data-test="amount-input" name="amount" type="number" />
          <ErrorMessage component="p" name="amount" className="red" />
        </div>
        <div className="field">
          <label>Description *</label>
          <Field data-test="description-input" name="description" as="textarea" />
          <ErrorMessage component="p" name="description" className="red" />
        </div>
        <div className="field">
          <label>Status *</label>
          <Field data-test="isActive-input" name="isActive" as="select">
            <option value="">Please Select</option>
            <option value="Active">Active</option>
            <option value="Deactivev">Deactive</option>
          </Field>
          <ErrorMessage component="p" name="isActive" className="red" />
        </div>
        <Link to="/items" className="ui button">
          Back to Items List
      </Link>
        <button className="ui button primary" type="submit">
          {this.state.id !== '' ? 'Update' : 'Submit'}
        </button>
      </Form>
    );
  }

  render() {
    return (
      <Grid>
        <Loader isLoading={this.props.item.isLoading} />
        <Grid.Row centered>
          <Grid.Column width="8">
            <h2 data-test="page-heading">
              {this.state.id !== '' ? 'Update' : 'Add'}
              {' '}
              Item
            </h2>
            <Formik
              enableReinitialize
              initialValues={this.state.initialValues}
              validationSchema={this.formValidation()}
              onSubmit={(values) => {
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
    item,
  };
}

export default connect(mapStateToProp, { getItem, updateItem, addItem })(UnconnectedAddItem);
