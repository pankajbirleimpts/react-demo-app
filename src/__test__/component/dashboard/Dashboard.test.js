import React from 'react';
import { shallow, mount } from 'enzyme';
import Dashboard from '../../../components/dashboard/index';
import { storeFactory, findByAttr } from '../../test/TestUtils';


const setup = (props) => {
    const store = storeFactory(props);
    const wrapper = shallow(
        <Dashboard store={store} />,
    ).dive().dive();
    return wrapper;
};

describe('Dashboard with Admin and daily item', () => {
    const props = {
        item: {
            isLoading: false,
            allTransactions: [{
                id: 1,
                purchaseAmount: 5,
                itemId: 101,
            },
             {
                id: 2,
                purchaseAmount: 5,
                itemId: 101,
            }],
            allDayItems: [{
                id: 1,
                date: "19-Feb-2020",
                itemId: 101,
                remainingQuantity: 0,
                totalQuantity: 5,
                itemName: "Pahe",
                itemDetails: {
                    id: 101,
                    itemName: "Pahe",
                    category: "Breakfast",
                }
            }]
        },
        user: {
            data: {
                id: 201,
                "balance": 0,
                "email": "Ram@test.com",
                "employeeId": 201,
                "firstName": "Ram",
                "lastName": "Singh",
                "role": "ADMIN"
            }
        },
    }

    test('Snapshot of Dashboard component', () => {
        const wrapper = setup(props);
        expect(wrapper).toMatchSnapshot();
    });

    test('`user` should be define', ()=>{
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.user).toEqual(props.user);
    });

    test('`item` should be define', ()=>{
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.item).toEqual(props.item);
    });

    test('`getAllDayItems` should be define', ()=>{
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.getAllDayItems).toBeInstanceOf(Function);
    });

    test('`getAllTransactions` should be define', ()=>{
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.getAllTransactions).toBeInstanceOf(Function);
    });

    test('`total-income` should be rendered for admin', ()=>{
        const wrapper = setup(props);
        const componentElement = findByAttr(wrapper, 'total-income');
        expect(componentElement.length).toBe(1);
    });

    test('`No item message` should not be displayed', ()=>{
        const wrapper = setup(props);
        const componentElement = findByAttr(wrapper, 'no-item-message');
        expect(componentElement.length).not.toBe(1);
    });

    test('`total income` should be displayed for admin', ()=>{
        const wrapper = setup(props);
        const componentElement = findByAttr(wrapper, 'total-income');
        expect(componentElement.length).toBe(1);
    });

    test('`balance` should not be displayed for admin', ()=>{
        const wrapper = setup(props);
        const componentElement = findByAttr(wrapper, 'balance');
        expect(componentElement.length).not.toBe(1);
    });

});

describe('Dashboard with Employee role & no data daily item', () => {
    const props = {
        item: {
            isLoading: false,
            allTransactions: [{
                id: 1,
                purchaseAmount: 5,
                itemId: 101,
            },
             {
                id: 2,
                purchaseAmount: 5,
                itemId: 101,
            }],
            allDayItems: []
        },
        user: {
            data: {
                id: 201,
                "balance": 0,
                "email": "Ram@test.com",
                "employeeId": 201,
                "firstName": "Ram",
                "lastName": "Singh",
                "role": "EMPLOYEE"
            }
        },
    }
   
    test('`total-income` should not be rendered for admin', ()=>{
        const wrapper = setup(props);
        const componentElement = findByAttr(wrapper, 'total-income');
        expect(componentElement.length).not.toBe(1);
    });

    test('`No item message` should be displayed', ()=>{
        const wrapper = setup(props);
        const componentElement = findByAttr(wrapper, 'no-item-message');
        expect(componentElement.length).toBe(1);
    });

    test('`balance` should be displayed for admin', ()=>{
        const wrapper = setup(props);
        const componentElement = findByAttr(wrapper, 'balance');
        expect(componentElement.length).toBe(1);
    });

});