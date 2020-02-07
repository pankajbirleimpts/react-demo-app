import React from 'react';
import { shallow } from 'enzyme';
import { confirmAlert } from 'react-confirm-alert';
import CustomTable, { UnconnectedCustomTable } from '../../../components/common/table/CustomTable';
import { findByAttr } from '../../test/TestUtils';
jest.mock('react-confirm-alert');

const setup = (props) => {
    const wrapper = shallow(
        <UnconnectedCustomTable {...props} />,
    );
    return wrapper;
};


describe('User CustomTable with data', () => {
    const props = {
        columns: [
            {
                label: "First Name",
                keyName: "firstName",
                sort: true,
                searchable: true,
                sortable: true
            },
            {
                label: "Last Name",
                keyName: "lastName",
                sort: null,
                searchable: true,
                sortable: true
            }],
        tableData: [
            {
                id: 4,
                firstName: 'Pankaj',
                lastName: 'Birle',
            },
            {
                id: 5,
                firstName: 'Rohan',
                lastName: 'Bajpai',
            },
        ],
        module: 'USERS',
        deleteUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteItem: jest.fn(),
        getAllItems: jest.fn(),
        deleteDayItem: jest.fn(),
        getAllDayItems: jest.fn(),
    };

    // test('Snapshot of CustomTable component', () => {
    //     const wrapper = setup(props);
    //     expect(wrapper).toMatchSnapshot();
    // });

    test('Check column should be rendered properly', () => {
        const wrapper = setup(props);
        const columnHeading = findByAttr(wrapper, 'column-heading');
        expect(columnHeading.length).toBe(props.columns.length);
    });

    test('Table container should be rendered properly', () => {
        const wrapper = setup(props);
        const tableContainer = findByAttr(wrapper, 'table-container');
        expect(tableContainer.length).toBe(1);
    });

    test('No record message should not be displayed', () => {
        const wrapper = setup(props);
        const noRecordMessage = findByAttr(wrapper, 'table-no-record-message');
        expect(noRecordMessage.length).not.toBe(1);
    });

    test('Table row should be rendered properly', () => {
        const wrapper = setup(props);
        const tableRow = findByAttr(wrapper, 'table-row');
        expect(tableRow.length).toBe(props.tableData.length);
    });

    test('Search data by `Pankaj`', () => {
        const wrapper = setup(props);
        wrapper.instance().setState({ search: 'Pankaj' });
        const tableRow = findByAttr(wrapper, 'table-row');
        expect(tableRow.length).toBe(1);
    });

    test('On change search input, value should be update in state', () => {
        const wrapper = setup(props);
        const searchInput = findByAttr(wrapper, 'search-input');
        const value  = 'Pankaj';
        searchInput.simulate('change', { target: { value : value }})
        const { search } = wrapper.state();
        expect(search).toEqual(value);
    });

    test('Search data by unknown word and display not message', () => {
        const wrapper = setup(props);
        wrapper.instance().setState({ search: 'adfdfdfdfd' });
        const tableRow = findByAttr(wrapper, 'table-no-record-message');
        expect(tableRow.length).toBe(1);
    });
  

    // test('After clicking on delete row button, and confirmed action `deleteFeed` action should be called ', () => {
    //     const wrapper = setup(props);

    //     const tableRowFirst = findByAttr(wrapper, 'table-row').at(1);
    //     const deleteRowAction = findByAttr(tableRowFirst, 'delete-row-action');
    //     deleteRowAction.simulate('click', { preventDefault() { } });
    //     // Click to confirm delete action
    //     const deleteModalAction = findByAttr(wrapper, 'delete-modal-action');
    //     deleteModalAction.simulate('click', { preventDefault() { } });
    //     expect(props.deleteFeed).toHaveBeenCalled();
    // });

    test('After sorting, `column` state should be updated.', () => {
        const wrapper = setup(props);
        const columnSecond = findByAttr(wrapper, 'column-heading').at(1);
        columnSecond.simulate('click', { preventDefault() { } });
        const { columns } = wrapper.state();
        const updatedColumns = [
            {
                label: "First Name",
                keyName: "firstName",
                sort: null,
                searchable: true,
                sortable: true
            },
            {
                label: "Last Name",
                keyName: "lastName",
                sort: true,
                searchable: true,
                sortable: true
            }];
        expect(columns).toEqual(updatedColumns);
    });

    test('After desending sorting', () => {
        const wrapper = setup(props);
        const columnSecond = findByAttr(wrapper, 'column-heading').at(0);
        columnSecond.simulate('click', { preventDefault() { } });
        const { columns } = wrapper.state();
        const updatedColumns = [
            {
                label: "First Name",
                keyName: "firstName",
                sort: false,
                searchable: true,
                sortable: true
            },
            {
                label: "Last Name",
                keyName: "lastName",
                sort: null,
                searchable: true,
                sortable: true
            }];
        expect(columns).toEqual(updatedColumns);
    });

    test('After asending sorting', () => {
        const initialColumns = [
            {
                label: "First Name",
                keyName: "firstName",
                sort: false,
                searchable: true,
                sortable: true
            },
            {
                label: "Last Name",
                keyName: "lastName",
                sort: null,
                searchable: true,
                sortable: true
            }];
        const updaetdProps = {
            ...props,
            columns: initialColumns,
        };
        const wrapper = setup(updaetdProps);
        const columnSecond = findByAttr(wrapper, 'column-heading').at(0);
        columnSecond.simulate('click', { preventDefault() { } });
        const { columns } = wrapper.state();
        const updatedColumns = [...initialColumns];
        updatedColumns[0].sort = true;
        expect(columns).toEqual(updatedColumns);
    });
});



