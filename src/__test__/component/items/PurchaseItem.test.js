import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import PurchaseItem, { UnconnectedPurchaseItem } from '../../../components/items/PurchaseItem';
import { storeFactory, findByAttr } from '../../test/TestUtils';


const setup = (props) => {
    const wrapper = shallow(
        <UnconnectedPurchaseItem {...props} />,
    )
    return wrapper;
};

const setupWithStore = (props) => {
    const store = storeFactory(props);
    const wrapper = shallow(
        <PurchaseItem store={store} />,
    ).dive().dive();
    return wrapper;
};

describe('Purchase Item Flow', () => {
    const props = {
        item: {
            isLoading: false,
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
            allUsers: [{
                id: 201,
                "balance": 0,
                "email": "Ram@test.com",
                "employeeId": 201,
                "firstName": "Ram",
                "lastName": "Singh",
                "role": "ADMIN"
            }]
        },
        history: {
            replace: jest.fn(),
        },
        getAllDayItems: jest.fn(),
        getAllUsers: jest.fn(),
        purchaseItem: jest.fn(),
    }

    test('Snapshot of PurchaseItem component', () => {
        const wrapper = setup(props);
        expect(wrapper).toMatchSnapshot();
    });


    test('Check the isLoading in props', () => {
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.item.isLoading).toBe(props.item.isLoading);
    });

    test('Check `getAllDayItems` & `getAllUsers` action should not be called props', () => {
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(props.getAllDayItems).toHaveBeenCalled();
        expect(props.getAllUsers).toHaveBeenCalled();
    });

    test('Check page titile should be `Purchase item`', () => {
        const wrapper = setup(props);
        const pageTitle = findByAttr(wrapper, 'page-heading');
        expect(pageTitle.text()).toEqual('Purchase Item');
    });

    test('Checking the form values ', async () => {
        const formValues = {
            userId: 201,
            itemId: 1,
            quantity: 2
        };

        const wrapper = mount(<BrowserRouter><UnconnectedPurchaseItem {...props} /></BrowserRouter>);

        const userIdInput = findByAttr(wrapper, 'userId-input').find('select').first();
        const itemIdInput = findByAttr(wrapper, 'itemId-input').find('select').first();
        const quantityInput = findByAttr(wrapper, 'quantity-input').find('input').first();

        await act(async () => {
            userIdInput.simulate('change', { persist: () => { }, target: { name: 'userId', value: formValues.userId } });
        });

        await act(async () => {
            itemIdInput.simulate('change', { persist: () => { }, target: { name: 'itemId', value: formValues.itemId } });
        });

        await act(async () => {
            quantityInput.simulate('change', { persist: () => { }, target: { name: 'quantity', value: formValues.quantity } });
        });

        await act(async () => {
            wrapper.find('form').simulate('submit');
        });
        expect(props.purchaseItem).toHaveBeenCalled();
    });

    test('Check `otherTransaction` state should be true if make other transaction ', () => {
        const wrapper = mount(<UnconnectedPurchaseItem {...props} />);
        const buttonElement = findByAttr(wrapper, 'other-transation-button');
        buttonElement.simulate('click');
        const otherTransactionState = wrapper.state().otherTransaction;
        expect(otherTransactionState).toBeTruthy();
    });

    test('Check `getUserBalance` function', () => {
        const wrapper = mount(<UnconnectedPurchaseItem {...props} />);
        const response = wrapper.instance().getUserBalance(12424);
        expect(response).toBeFalsy();
    });

    test('Check `getUserBalance` function without any userId', () => {
        const wrapper = mount(<UnconnectedPurchaseItem {...props} />);
        const response = wrapper.instance().getUserBalance();
        expect(response).toBeFalsy();
    });

    test('Check `getItemRemainQuantity` function', () => {
        const wrapper = mount(<UnconnectedPurchaseItem {...props} />);
        const response = wrapper.instance().getItemRemainQuantity(12424);
        expect(response).toBeFalsy();
    });

    test('Check `getItemRemainQuantity` function without any argument', () => {
        const wrapper = mount(<UnconnectedPurchaseItem {...props} />);
        const response = wrapper.instance().getItemRemainQuantity();
        expect(response).toBeFalsy();
    });

    test('Check `getUserBalance` function without any userId', () => {
        const props = {
            item: {
                isLoading: false,
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
                allUsers: [{
                    id: 201,
                    "balance": 0,
                    "email": "Ram@test.com",
                    "employeeId": 201,
                    "firstName": "Ram",
                    "lastName": "Singh",
                    "role": "ADMIN"
                }]
            }
        };
        const wrapper = setupWithStore(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.item).toBe(props.item);
    });
});
