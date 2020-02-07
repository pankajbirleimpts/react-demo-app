import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Table } from 'semantic-ui-react';
import moment from 'moment';
import { getAllDayItems, getAllTransactions } from '../../actions/ItemAction';

class Dashboard extends Component {
  componentDidMount() {
    const today = moment().format('DD-MMM-YYYY');
    this.props.getAllDayItems(today);
    this.props.getAllTransactions();
  }

  calculateTotalIncome() {
    const { item } = this.props;
    const totalIncome = item.allTransactions.reduce((total, val) => {
      const purchaseAmount = parseFloat(val.purchaseAmount);
      total += purchaseAmount;
      return total;
    }, 0);
    return totalIncome;
  }

  renderDayItemRow = () => {
    const { allDayItems } = this.props.item;
    if (allDayItems.length === 0) {
      return (
        <Table.Row>
          <Table.Cell colSpan="3">
            <center>No day items are added yet!</center>
          </Table.Cell>
        </Table.Row>
      );
    }
    return allDayItems.map((val) => (
      <Table.Row>
        <Table.Cell>{val.itemName}</Table.Cell>
        <Table.Cell>{val.category}</Table.Cell>
        <Table.Cell>
          Rs.
          {val.amount}
        </Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    const userData = this.props.user.data; 
    return (
      <div>
        <h2>Dashboard</h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {
                userData.role === "ADMIN" ?
                  (
                    <div>
                      <h4>Total Income</h4>
                      <p>
                        Rs.{' '}
                        {this.calculateTotalIncome()}
                      </p>
                    </div>
                  )
                  :
                  (
                    <div>
                      <h4>Balance</h4>
                      <p>
                        Rs.{' '}
                        {userData.balance}
                      </p>
                    </div>
                  )
              }
            </Grid.Column>
            <Grid.Column width={8}>
              <h4>Today Items</h4>
              <Table attached="top" basic verticalAlign="top">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Item Name</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                  </Table.Row>
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
  return {
    user,
    item,
  };
}

export default connect(mapStateToProps, { getAllDayItems, getAllTransactions })(Dashboard);
