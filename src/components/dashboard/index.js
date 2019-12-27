import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Table } from 'semantic-ui-react';
import { getAllDayItems } from '../../actions/ItemAction';
import moment from 'moment';

class Dashboard extends Component {
  componentDidMount() {
    const today = moment().format('DD-MMM-YYYY');
    this.props.getAllDayItems(today);
  }

  renderDayItemRow = () => {
    const { allDayItems } = this.props.item;
    if (allDayItems.length === 0) {
      return (
        <Table.Row colspan='3'>
          <Table.Cell>Cell</Table.Cell>
          No day items are added yet!
        </Table.Row>
      );
    }
    return allDayItems.map(val => {
      return (
        <Table.Row>
          <Table.Cell>{val.itemName}</Table.Cell>
          <Table.Cell>{val.category}</Table.Cell>
          <Table.Cell>Rs. {val.amount}</Table.Cell>
        </Table.Row>
      );
    });
  };

  render() {
    const userData = this.props.user.data;
    return (
      <div>
        <h2>Dashboard</h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <p>Balance</p>
              <p>Rs. {userData.balance}</p>
            </Grid.Column>
            <Grid.Column width={8}>
              <p>Today Items</p>
              <Table attached='top' basic verticalAlign='top'>
                <Table.Header>
                  <Table.HeaderCell>Item Name</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Header>
                <Table.Body>{this.renderDayItemRow()}</Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ user, item }) {
  console.log('item ', item);
  return {
    user,
    item
  };
}

export default connect(mapStateToProps, { getAllDayItems })(
  withRouter(Dashboard)
);
