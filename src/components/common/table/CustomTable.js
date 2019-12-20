import React, { Component } from "react";
import { Row, Col, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import "./CustomTable.css";
import Tooltip from "./Tooltip";

class CustomTable extends Component {
  state = {
    currentPage: 1,
    dataPerPage: 5,
    search: "",
    rowData: [5, 10, 15],
    status: "",
    selectedRow: null,
    statusOptions: [
      {
        label: "CSV",
        value: "csv"
      },
      {
        label: "XLS",
        value: "xls"
      }
    ],
    columns: [],
    tableData: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.tableData !== prevState.tableData &&
      prevState.tableData.length === 0
    ) {
      console.log("getDerivedStateFromProps ", nextProps, prevState);
      return {
        tableData: nextProps.tableData,
        columns: nextProps.columns
      };
    } else return null;
  }

  /** Handle page count */
  handlePageChange = data => {
    console.log("handlePageClick ", data);
    this.setState({
      currentPage: data
    });
  };

  /** Apply filter  */
  filterData = () => {
    const { tableData, search, status, columns } = this.state;
    if (search !== "" && status !== "") {
      console.log("search status ", search, status);
      const filteredData = tableData.filter(item => {
        for (let val of columns) {
          if (
            val.searchable === true &&
            item[val.keyName].toLowerCase().indexOf(search.toLowerCase()) >=
              0 &&
            item.format === status
          )
            return true;
        }
        return false;
      });
      return filteredData;
    } else if (search !== "") {
      console.log("search ", search);
      const filteredData = tableData.filter(item => {
        for (let val of columns) {
          if (
            val.searchable === true &&
            item[val.keyName].toLowerCase().indexOf(search.toLowerCase()) >= 0
          )
            return true;
        }
        return false;
      });
      return filteredData;
    } else if (status !== "") {
      console.log("status ", status);
      const filteredData = tableData.filter(item => item.format === status);
      return filteredData;
    }
    return tableData;
  };

  /** Delete a row */
  deleteRow = id => {
    if (window.confirm("Are you sure want to delete it?")) {
      const tableData = [...this.state.tableData]; // make a separate copy of the array
      const index = tableData.findIndex(val => val.id === id);
      if (index !== -1) {
        tableData.splice(index, 1);
        this.setState({ tableData });
      }
    }
  };

  /** Edit a row */
  editRow = id => {
    const tableData = [...this.state.tableData]; // make a separate copy of the array
    /** close to other forms */
    const newTableData = tableData.map(obj => {
      return {
        ...obj,
        isFormOpen: false
      };
    });
    const index = newTableData.findIndex(val => val.id === id);
    newTableData[index].isFormOpen = true;
    if (index !== -1) {
      const selectedRow = newTableData.find(val => val.id === id);
      console.log("newTableData ", newTableData);
      this.setState({
        selectedRow,
        tableData: newTableData
      });
    }
  };

  /** update a row */
  updateRow = id => {
    const { selectedRow, error } = this.state;
    if (!error) {
      console.log("updateRow selectedRow ", selectedRow);
      const tableData = [...this.state.tableData]; // make a separate copy of the array
      const newTableData = tableData.map(val => {
        if (val.id === id) {
          return {
            ...selectedRow,
            isFormOpen: false
          };
        } else {
          return val;
        }
      });
      this.setState({
        selectedRow: null,
        tableData: newTableData
      });
    }
  };

  /** cancel a row edit */
  cancelEditRow = id => {
    const tableData = [...this.state.tableData]; // make a separate copy of the array
    const index = tableData.findIndex(val => val.id === id);
    tableData[index].isFormOpen = false;
    if (index !== -1) {
      this.setState({
        selectedRow: null,
        tableData,
        error: false
      });
    }
  };

  /** Update row form input value  */
  updateRowValue = (keyName, value) => {
    const selectedRow = { ...this.state.selectedRow };
    selectedRow[keyName] = value;
    this.setState({
      selectedRow,
      error: selectedRow[keyName] == "" ? true : false
    });
  };

  /** Row per change input */
  renderRowSelectInput = keyName => {
    const { statusOptions, selectedRow } = this.state;
    const rowDataOption = statusOptions.map(val => (
      <option key={val.value} value={val.value}>
        {val.label}
      </option>
    ));

    return (
      <div>
        <select
          className="form-control"
          value={selectedRow[keyName]}
          onChange={event => this.updateRowValue(keyName, event.target.value)}
        >
          {rowDataOption}
        </select>
      </div>
    );
  };

  /**Render row input element */
  renderRowInputInput = keyName => {
    const { selectedRow } = this.state;
    const inputValue = selectedRow[keyName];
    return (
      <div>
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={event => this.updateRowValue(keyName, event.target.value)}
        />
        {inputValue == "" && <p className="error">The value is required</p>}
      </div>
    );
  };

  /** Get column key name */
  render = () => {
      
  }

  /* render the table row */
  renderRow = () => {
    const { currentPage, dataPerPage, columns } = this.state;
    const indexOfLastTodo = currentPage * dataPerPage;
    const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
    let filterData = this.filterData();
    /* Sorting data */
    const sortedColumn = columns.find(val => val.sort !== null);
    console.log("sortedColumn ", sortedColumn);
    if (sortedColumn.sort === true) {
      filterData = filterData.sort(function(a, b) {
        if (a[sortedColumn.keyName] < b[sortedColumn.keyName]) {
          return -1;
        }
        if (a[sortedColumn.keyName] > b[sortedColumn.keyName]) {
          return 1;
        }
        return 0;
      });
      console.log("filterData true", filterData);
    } else if (sortedColumn.sort === false) {
      filterData = filterData.sort(function(a, b) {
        if (a[sortedColumn.keyName] < b[sortedColumn.keyName]) {
          return 1;
        }
        if (a[sortedColumn.keyName] > b[sortedColumn.keyName]) {
          return -1;
        }
        return 0;
      });
      console.log("filterData false", filterData);
    }

    const currentTodos = filterData.slice(indexOfFirstTodo, indexOfLastTodo);

    if (currentTodos.length === 0) {
      return (
        <tr>
          <td colSpan="5">
            <div className="alert alert-warning">It seems, no data found!</div>
          </td>
        </tr>
      );
    }  

    return currentTodos.map((rowData, key) => {
      console.log("rowData, key ", rowData, key);
      if (rowData.isFormOpen) {
        return (
          <tr key={key}>
            <td>{this.renderRowInputInput("sourceName")}</td>
            <td>{this.renderRowInputInput("feedName")}</td>
            <td>{this.renderRowInputInput("subFolder")}</td>
            <td>{this.renderRowSelectInput("format")}</td>
            <td className="d-flex justify-content-center">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => this.updateRow(rowData.id)}
              >
                <i className="action-btn-icon far fa-check-circle"></i>
                Update
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => this.cancelEditRow(rowData.id)}
              >
                <i className="action-btn-icon fas fa-undo"></i>
                Cancel
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={key}>
            <td>{rowData.sourceName}</td>
            <td>{rowData.feedName}</td>
            <td>{rowData.subFolder}</td>
            <td>
              {rowData.format} <Tooltip />
            </td>
            <td className="d-flex justify-content-center">
              <a href="#" onClick={() => this.editRow(rowData.id)}>
                <i className="action-icon far fa-edit"></i>
              </a>
              <a href="#" onClick={() => this.deleteRow(rowData.id)}>
                <i className="action-icon far fa-trash-alt"></i>
              </a>
            </td>
          </tr>
        );
      }
    });
  };

  /** Update search input */
  handleSearchInput = value => {
    this.setState({
      search: value,
      currentPage: 1
    });
  };

  /** update data per page count */
  handleRowChange = value => {
    this.setState({
      dataPerPage: value,
      currentPage: 1
    });
  };

  /** Row per change input */
  renderRowPerPage = () => {
    const { rowData, dataPerPage } = this.state;
    const rowDataOption = rowData.map(val => (
      <option key={val} value={val}>
        {val}
      </option>
    ));

    return (
      <div className="form-group row">
        <div className="col-sm-12">
          <span className="row-per-label">Row per page</span>
          <select
            className="form-control-sm"
            value={dataPerPage}
            onChange={event => this.handleRowChange(event.target.value)}
          >
            {rowDataOption}
          </select>
        </div>
      </div>
    );
  };

  /** Handle status filter */
  handleStatusFilter = value => {
    this.setState({
      status: value,
      currentPage: 1
    });
  };

  /** Row per change input */
  renderStatusFilter = () => {
    let { status, statusOptions } = this.state;
    statusOptions = [...statusOptions];
    statusOptions.unshift({
      label: "All",
      value: ""
    });
    const rowDataOption = statusOptions.map(val => (
      <option key={val.value} value={val.value}>
        {val.label}
      </option>
    ));

    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Show</label>
        <div className="col-sm-10">
          <select
            className="form-control"
            value={status}
            onChange={event => this.handleStatusFilter(event.target.value)}
          >
            {rowDataOption}
          </select>
        </div>
      </div>
    );
  };

  /** Handle sorting event */
  handleSorting = (selected, sortable) => {
    /** If sorting is not availalbe then return  */
    if (!sortable) return false;
    console.log("selected ", selected);
    const { columns } = this.state;
    const updatedColumns = columns.map(val => {
      if (val.keyName === selected && val.sort === null) {
        console.log("al.keyName ", val.sort);
        return {
          ...val,
          sort: true
        };
      }
      if (val.keyName === selected && val.sort === true) {
        return {
          ...val,
          sort: false
        };
      }
      if (val.keyName === selected && val.sort === false) {
        return {
          ...val,
          sort: true
        };
      } else {
        return {
          ...val,
          sort: null
        };
      }
    });
    this.setState({
      columns: updatedColumns
    });
    console.log("updatedColumns ", updatedColumns);
  };

  /* Render coloumn */
  renderColumns = () => {
    const { columns } = this.state;
    return columns.map(val => {
      let dynamicClass = "";
      if (val.sortable) {
        dynamicClass = "sorting fas fa-sort";
        if (val.sort === true) {
          dynamicClass = "sorting fas fa-sort-down";
        } else if (val.sort === false) dynamicClass = "sorting fas fa-sort-up";
      }
      return (
        <th
          key={`key${val.keyName}`}
          onClick={() => this.handleSorting(val.keyName, val.sortable)}
        >
          {val.label}
          <i className={dynamicClass}></i>
        </th>
      );
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h3>Source</h3>
          </Col>
          <Col>
            <Row>
              <Col>{this.renderStatusFilter()} </Col>
              <Col xs={6}>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Search</label>{" "}
                  <div className="col-sm-9">
                    <input
                      placeholder="Search"
                      className="form-control"
                      type="text"
                      value={this.state.search}
                      onChange={event =>
                        this.handleSearchInput(event.target.value)
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  {this.renderColumns()}
                  <td></td>
                </tr>
              </thead>
              <tbody>{this.renderRow()}</tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Row>
              <Col></Col>
              <Col>{this.renderRowPerPage()}</Col>
              <Col className="d-flex flex-row-reverse">
                <Pagination
                  activePage={this.state.currentPage}
                  itemsCountPerPage={this.state.dataPerPage}
                  totalItemsCount={this.filterData().length}
                  onChange={this.handlePageChange}
                  linkClass="page-link"
                  itemClass="page-item"
                  innerClass="pagination pagination-sm"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CustomTable;
