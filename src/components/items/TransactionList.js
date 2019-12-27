import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Checkbox } from 'semantic-ui-react';
import { getAllTransactions } from '../../actions/ItemAction';
import { langs } from '../../config';
import { Loader, CustomTable } from '../common';

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: 'User Name',
          keyName: 'userName',
          sort: true,
          searchable: true,
          sortable: true
        },
        {
          label: 'Item name',
          keyName: 'itemName',
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: 'Category',
          keyName: 'category',
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: 'Date',
          keyName: 'date',
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: 'Rate',
          keyName: 'amount',
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: 'Quantity',
          keyName: 'quantity',
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: 'Total Amount',
          keyName: 'purchaseAmount',
          sort: null,
          searchable: true,
          sortable: true
        }
      ]
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const userId = user.data.role === 'EMPLOYEE' ? user.data.id : '';
    this.props.getAllTransactions(userId);
  }

  formSubmitHandler = values => {};

  render() {
    console.log('this.props.item ', this.props.item);
    return (
      <Grid>
        <Loader isLoading={this.props.item.isLoading} />
        <Grid.Row centered>
          <CustomTable
            columns={this.state.columns}
            tableData={this.props.item.allTransactions}
            module='TRANSACTIONS'
          />
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

export default connect(mapStateToProp, { getAllTransactions })(
  withRouter(TransactionList)
);
