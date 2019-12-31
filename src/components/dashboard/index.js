import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Table } from "semantic-ui-react";
import { getAllDayItems, getAllTransactions } from "../../actions/ItemAction";
import moment from "moment";

class Dashboard extends Component {
  componentDidMount() {
    const today = moment().format("DD-MMM-YYYY");
    this.props.getAllDayItems(today);
    this.props.getAllTransactions();
  }

  calculateTotalIncome() {
    const { allTransactions } = this.props.item;
    const totalIncome = allTransactions.reduce((total, val) => {
      console.log("total, val", total, val.purchaseAmount, val);
      const purchaseAmount = parseFloat(val.purchaseAmount);
      console.log("purchaseAmount", typeof purchaseAmount, purchaseAmount);
      total = total + purchaseAmount;
    }, 0);

    console.log("totalIncome", totalIncome);
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
              <div>
                <h4>Balance</h4>
                <p>Rs. {userData.balance}</p>
              </div>
              <div>
                <h4>Total Income</h4>
                <p>Rs. {this.calculateTotalIncome()}</p>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <h4>Today Items</h4>
              <Table attached="top" basic verticalAlign="top">
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
  console.log("item ", item);
  return {
    user,
    item
  };
}

export default connect(mapStateToProps, { getAllDayItems, getAllTransactions })(
  withRouter(Dashboard)
);
