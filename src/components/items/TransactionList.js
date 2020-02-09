import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { getAllTransactions } from '../../actions/ItemAction';
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


  render() {
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
  TransactionList
);
