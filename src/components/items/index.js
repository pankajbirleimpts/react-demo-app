import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { getAllItems } from "../../actions/ItemAction";
import { Loader, CustomTable } from "../common";

class ItemList extends Component {
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
          label: "Status",
          keyName: "isActive",
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
          label: "Description",
          keyName: "description",
          sort: null,
          searchable: true,
          sortable: true
        }
      ]
    };
  }

  componentDidMount() {
    this.props.getAllItems();
  }

  render() {
    return (
      <Grid>
        <Loader isLoading={this.props.item.isLoading} />
        <Grid.Row>
          <Grid.Column width={8} textAlign="left"><h3>Manage Items</h3></Grid.Column>
          <Grid.Column width={8} textAlign="right"><Link to="/add-item" className="ui button primary">+ Add item</Link></Grid.Column>
        </Grid.Row>


        <Grid.Row centered>
          <CustomTable
            columns={this.state.columns}
            tableData={this.props.item.allItems}
            module="ITEMS"
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

export default connect(mapStateToProp, { getAllItems })(ItemList);
