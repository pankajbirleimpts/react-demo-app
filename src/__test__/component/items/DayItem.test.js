import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import DayItem, { UnconnectedDayItem } from '../../../components/items/DayItem';
import { storeFactory, findByAttr } from '../../test/TestUtils';
import SemanticDatepicker from "react-semantic-ui-datepickers";
jest.mock('react-semantic-ui-datepickers');



const setup = (props) => {
    const wrapper = shallow(
        <UnconnectedDayItem {...props} />,
    )
    return wrapper;
};

describe('Add item Flow', () => {
    const props = {
        item: {
            isLoading: false,
            allItems: [{
                id: 1,
                itemName: "Pahe"
            }]
        },
        history: {
            replace: jest.fn(),
        },
        getAllItems: jest.fn(),
        getDayItem: jest.fn(),
        updateDayItem: jest.fn(),
        addDayItem: jest.fn(),
        match: {
            params: {
                id: undefined,
            }
        }
    }
    test('Snapshot of DayItem component', () => {
        const wrapper = setup(props);
        expect(wrapper).toMatchSnapshot();
    });


    test('Check the isLoading in props', () => {
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.item.isLoading).toBe(props.item.isLoading);
    });

    test('Check getDayItem action should not be called props', () => {
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(props.getDayItem).not.toHaveBeenCalled();
    });

    test('Check page titile should be `Add item`', () => {
        const wrapper = setup(props);
        const pageTitle = findByAttr(wrapper, 'page-heading');
        expect(pageTitle.text()).toEqual('Add Day Item');
    });

    test('Checking the form values ', async () => {
        const formValues = {
            date: "17-Feb-2020",
            itemId: 1,
            totalQuantity: 5,
        };

        const wrapper = mount(<BrowserRouter><UnconnectedDayItem {...props} /></BrowserRouter>);

        const dateInput = findByAttr(wrapper, 'date-input').find('input').first();
        const itemIdInput = findByAttr(wrapper, 'itemId-input').find('select').first();
        const totalQuantityInput = findByAttr(wrapper, 'totalQuantity-input').find('input').first();

        await act(async () => {
            dateInput.simulate('change', { persist: () => { }, target: { name: 'date', value: formValues.date } });
        });

        await act(async () => {
            itemIdInput.simulate('change', { persist: () => { }, target: { name: 'itemId', value: formValues.itemId } });
        });

        await act(async () => {
            totalQuantityInput.simulate('change', { persist: () => { }, target: { name: 'totalQuantity', value: formValues.totalQuantity } });
        });

        await act(async () => {
            wrapper.find('form').simulate('submit');
        });
        expect(props.addDayItem).toHaveBeenCalled();

    });
});

 describe('Update item Flow', () => {
    const props = {
        item: {
            isLoading: false,
            allItems: [{
                id: 1,
                itemName: "Pahe"
            }]
        },
        history: {
            replace: jest.fn(),
        },
        getAllItems: jest.fn(),
        getDayItem: jest.fn(),
        updateDayItem: jest.fn(),
        addDayItem: jest.fn(),
        match: {
            params: {
                id: 101,
            }
        }
    }

    test('Check the isLoading in props', () => {
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.item.isLoading).toBe(props.item.isLoading);
    });

    test('Check getDayItem action should be called props', () => {
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(props.getDayItem).toHaveBeenCalled();
    });

    test('Check page titile should be `Update item`', () => {
        const wrapper = setup(props);
        wrapper.instance().setState({ id: props.match.params.id });
        const pageTitle = findByAttr(wrapper, 'page-heading');
        expect(pageTitle.text()).toEqual('Update Day Item');
    });

    test('Checking the form values ', async () => {

        const formValues = {
            date: "17-Feb-2020",
            itemId: 1,
            totalQuantity: 5,
        };

        const wrapper = mount(<BrowserRouter><UnconnectedDayItem {...props} /></BrowserRouter>);

        wrapper.instance().setState({
            id: props.match.params.id,
            initialValues: formValues,
        });
        const dateInput = findByAttr(wrapper, 'date-input').find('input').first();
        const itemIdInput = findByAttr(wrapper, 'itemId-input').find('select').first();
        const totalQuantityInput = findByAttr(wrapper, 'totalQuantity-input').find('input').first();

        await act(async () => {
            dateInput.simulate('change', { persist: () => { }, target: { name: 'date', value: formValues.date } });
        });

        await act(async () => {
            itemIdInput.simulate('change', { persist: () => { }, target: { name: 'itemId', value: formValues.itemId } });
        });

        await act(async () => {
            totalQuantityInput.simulate('change', { persist: () => { }, target: { name: 'totalQuantity', value: formValues.totalQuantity } });
        });

        await act(async () => {
            wrapper.find('form').simulate('submit');
        });
        expect(props.updateDayItem).toHaveBeenCalled();

  });
});