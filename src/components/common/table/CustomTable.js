import React, { Component } from 'react';
import './CustomTable.css';
import {
  Header,
  Table,
  Icon,
  Grid,
  // Pagination,
  Form,
  Input,
  Confirm
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Pagination from 'react-js-pagination';
import { Route, withRouter } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../../../actions/UserAction';
import {
  deleteItem,
  getAllItems,
  deleteDayItem,
  getAllDayItems
} from '../../../actions/ItemAction';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      dataPerPage: 10,
      search: '',
      rowData: [5, 10, 15],
      status: '',
      selectedRow: null,
      statusOptions: [
        {
          label: 'CSV',
          value: 'csv'
        },
        {
          label: 'XLS',
          value: 'xls'
        }
      ],
      columns: [],
      tableData: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tableData !== prevState.tableData) {
      return {
        ...prevState,
        tableData: nextProps.tableData,
        columns: nextProps.columns
      };
    } else {
      return prevState;
    }
  }

  /** Handle page count */
  handlePageChange = currentPage => {
    this.setState({
      currentPage
    });
  };

  /** Apply filter  */
  filterData = () => {
    const { tableData, search, status, columns } = this.state;
    if (search !== '' && status !== '') {
      const filteredData = tableData.filter(item => {
        for (let val of columns) {
          if (
            val.searchable === true &&
            item[val.keyName] &&
            item[val.keyName]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) >= 0 &&
            item.format === status
          )
            return true;
        }
        return false;
      });
      return filteredData;
    } else if (search !== '') {
      const filteredData = tableData.filter(item => {
        for (let val of columns) {
          if (
            val.searchable === true &&
            item[val.keyName] &&
            item[val.keyName]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) >= 0
          )
            return true;
        }
        return false;
      });
      return filteredData;
    } else if (status !== '') {
      const filteredData = tableData.filter(item => item.format === status);
      return filteredData;
    }
    return tableData;
  };

  /** Delete a row */
  deleteRow = (event, id) => {
    event.preventDefault();
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure to want delete it?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (this.props.module === 'USERS') {
              this.props.deleteUser(id, () => {
                this.props.getAllUsers();
              });
            } else if (this.props.module === 'ITEMS') {
              // Delete items
              this.props.deleteItem(id, () => {
                this.props.getAllItems();
              });
            } else if (this.props.module === 'DAYITEMS') {
              // Delete items
              this.props.deleteDayItem(id, () => {
                this.props.getAllDayItems();
              });
            }
          }
        },
        {
          label: 'No'
        }
      ]
    });
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
      error: selectedRow[keyName] == '' ? true : false
    });
  };

  /** Grid.Row per change input */
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
          className='form-control'
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
          type='text'
          className='form-control'
          value={inputValue}
          onChange={event => this.updateRowValue(keyName, event.target.value)}
        />
        {inputValue == '' && <p className='error'>The value is required</p>}
      </div>
    );
  };

  /* render the table row */
  renderRow = () => {
    const { currentPage, dataPerPage, columns } = this.state;
    const indexOfLastTodo = currentPage * dataPerPage;
    const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
    let filterData = this.filterData();
    /* Sorting data */
    const sortedColumn = columns.find(val => val.sort !== null);
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
    }

    const currentTodos = filterData.slice(indexOfFirstTodo, indexOfLastTodo);

    if (currentTodos.length === 0) {
      return (
        <Table.Row>
          <Table.HeaderCell colSpan={(columns.length + 1)}>
            <div className='alert alert-warning'>It seems, no data found!</div>
          </Table.HeaderCell>
        </Table.Row>
      );
    }
    return currentTodos.map((rowData, rowkey) => {
      // const viewLabelText =
      //   ViewLabel.charAt(0).toUpperCase() + ViewLabel.slice(1).toLowerCase();
      // const previousRoutePath = "/".concat(viewLabelText.toLowerCase());
      return (
        
        <Table.Row key={`tblrow-${rowkey}`}>
          {this.state.columns.map((tableColumnName, key) => {
            if (tableColumnName === 'editDelete') {
              return null;
            }
            let value = rowData[tableColumnName.keyName];
            if (value) {
              value = value.toString();
            }

            const sortColumnStyle = classNames({
              'sort-enabled': sortedColumn.keyName === tableColumnName,
              'highlighted-search-text':
                value &&
                value.includes(this.state.search) &&
                this.state.search === '',
              'text-right': value && !isNaN(parseInt(value))
            });
            return (
              <Table.Cell key={`col-${key}`} className={sortColumnStyle}>
                {rowData[tableColumnName.keyName]}
              </Table.Cell>
            );
          })}
          {this.props.module !== 'TRANSACTIONS' && (
            <Table.Cell className='d-flex justify-content-center modify-row-data'>
              {this.props.module === 'ITEMS' && (
                <Link
                  to={{
                    pathname: `/update-item/${rowData.id}`
                  }}
                >
                  <Icon name='edit' />
                </Link>
              )}
              {this.props.module === 'DAYITEMS' && (
                <Link
                  to={{
                    pathname: `/update-day-item/${rowData.id}`
                  }}
                >
                  <Icon name='edit' />
                </Link>
              )}
              {this.props.module === 'USERS' && (
                <Link
                  to={{
                    pathname: `/update-user/${rowData.id}`
                  }}
                >
                  <Icon name='edit' />
                </Link>
              )}
              <a
                className='action-icon'
                href='#'
                onClick={event => {
                  this.deleteRow(event, rowData.id);
                }}
              >
                <Icon name='trash alternate' />
              </a>
            </Table.Cell>
          )}
        </Table.Row>
      );
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

  /** Grid.Row per change input */
  renderRowPerPage = () => {
    const { rowData, dataPerPage } = this.state;
    const rowDataOption = rowData.map(val => (
      <option key={val} value={val}>
        {val}
      </option>
    ));

    return (
      <div className='form-group row'>
        <div className='col-sm-12'>
          <span className='row-per-label'>Grid.Row per page</span>
          <select
            className='form-control-sm'
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

  /** Grid.Row per change input */
  renderStatusFilter = () => {
    let { status, statusOptions } = this.state;
    statusOptions = [...statusOptions];
    statusOptions.unshift({
      label: 'All',
      value: ''
    });
    const rowDataOption = statusOptions.map(val => (
      <option key={val.value} value={val.value}>
        {val.label}
      </option>
    ));

    return (
      <div className='form-group row'>
        <label className='col-sm-2 col-form-label'>Show</label>
        <div className='col-sm-10'>
          <select
            className='form-control'
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
    const { columns } = this.state;
    const updatedColumns = columns.map(val => {
      if (val.keyName === selected && val.sort === null) {
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
  };

  /* Render coloumn */
  renderColumns = () => {
    const { columns } = this.state;
    return columns.map(val => {
      let dynamicClass = '';
      if (val.sortable) {
        dynamicClass = 'sort';
        if (val.sort === true) {
          dynamicClass = 'sort down';
        } else if (val.sort === false) dynamicClass = 'sort up';
      }
      return (
        <Table.HeaderCell
          key={`key${val.keyName}`}
          onClick={() => this.handleSorting(val.keyName, val.sortable)}
        >
          {val.label}
          <Icon name={dynamicClass} />
        </Table.HeaderCell>
      );
    });
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={4}> </Grid.Column>
          <Grid.Column width={8} textAlign='right'>
            <Form>
              <Form.Field inline>
                <label>Search</label>
                <Input
                  placeholder='Please search here..'
                  type='text'
                  className='search-input'
                  value={this.state.search}
                  onChange={event => this.handleSearchInput(event.target.value)}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  {this.renderColumns()}
                  {this.props.module !== 'TRANSACTIONS' && (
                    <Table.HeaderCell></Table.HeaderCell>
                  )}
                </Table.Row>
              </Table.Header>
              <tbody>{this.renderRow()}</tbody>
            </Table>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}></Grid.Column>
          <Grid.Column width={8} textAlign='right'>
            {/* <Pagination
              defaultActivePage={this.state.currentPage}
              totalPages={this.filterData().length}
              onPageChange={this.handlePageChange}
              activePage={this.state.currentPage}
              boundaryRange={5}
            /> */}
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.dataPerPage}
              totalItemsCount={this.state.tableData.length}
              onChange={this.handlePageChange}
              linkClass='page-link'
              itemClass='page-item'
              innerClass='pagination pagination-sm'
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {};

export default connect(mapStateToProps, {
  deleteUser,
  getAllUsers,
  deleteItem,
  getAllItems,
  deleteDayItem,
  getAllDayItems
})(withRouter(CustomTable));
