import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Checkbox } from "semantic-ui-react";
import { getAllDayItems } from "../../actions/ItemAction";
import { langs } from "../../config";
import { Loader, CustomTable } from "../common";

class DayItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Item Name",
          keyName: "itemName",
          sort: true,
          searchable: true,
          sortable: true
        },
        {
          label: "Category",
          keyName: "category",
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: "Date",
          keyName: "date",
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: "Amount",
          keyName: "amount",
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: "Total Quantity",
          keyName: "totalQuantity",
          sort: null,
          searchable: true,
          sortable: true
        },
        {
          label: "Remaining Quantity",
          keyName: "remainingQuantity",
          sort: null,
          searchable: true,
          sortable: true
        }
      ]
    };
  }

  componentDidMount() {
    this.props.getAllDayItems();
  }

  formSubmitHandler = values => { };

  render() {
    console.log("this.props.item ", this.props.item);
    return (
      <Grid>
        <Loader isLoading={this.props.item.isLoading} />
        <Grid.Row>
          <Grid.Column width={8} textAlign="left"><h3>Manage Day Items</h3></Grid.Column>
          <Grid.Column width={8} textAlign="right"><Link to="/add-day-item" className="ui button primary">+ Add Day item</Link></Grid.Column>
        </Grid.Row>


        <Grid.Row centered>
          <CustomTable
            columns={this.state.columns}
            tableData={this.props.item.allDayItems}
            module="DAYITEMS"
          />
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

export default connect(mapStateToProp, { getAllDayItems })(withRouter(DayItemList));
