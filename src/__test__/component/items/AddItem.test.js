import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AddItem, { UnconnectedAddItem } from '../../../components/items/AddItem';
import { storeFactory, findByAttr } from '../../test/TestUtils';



const setup = (props) => {
    const wrapper = shallow(
        <UnconnectedAddItem {...props} />,
    )
    return wrapper;
};

describe('Add item Flow', () => {
    const props = {
        item: {
            isLoading: false,
        },
        history: {
            replace: jest.fn(),
        },
        getItem: jest.fn(),
        updateItem: jest.fn(),
        addItem: jest.fn(),
        match: {
            params: {
                id: undefined,
            }
        }
    }
    test('Snapshot of AddItem component', () => {
        const wrapper = setup(props);
        expect(wrapper).toMatchSnapshot();
    });


    test('Check the isLoading in props', () => {
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.item.isLoading).toBe(props.item.isLoading);
    });

    test('Check getItem action should not be called props', () => {
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(props.getItem).not.toHaveBeenCalled();
    });

    test('Check page titile should be `Add item`', () => {
        const wrapper = setup(props);
        const pageTitle = findByAttr(wrapper, 'page-heading');
        expect(pageTitle.text()).toEqual('Add Item');
    });

    test('Checking the form values ', async () => {
        const formValues = {
            itemName: 'Kaju Kadi',
            description: 'This is Kaju kadi',
            category: "Lunch",
            amount: 30,
            isActive: 'Active',
        };

        const wrapper = mount(<BrowserRouter>
            <UnconnectedAddItem {...props} />
        </BrowserRouter>);

        const itemNameInput = findByAttr(wrapper, 'itemName-input').find('input').first();
        const descriptionInput = findByAttr(wrapper, 'description-input').find('textarea').first();
        const amountInput = findByAttr(wrapper, 'amount-input').find('input').first();
        const categoryInput = findByAttr(wrapper, 'category-input').find('select').first();
        const isActiveInput = findByAttr(wrapper, 'isActive-input').find('select').first();

        await act(async () => {
            itemNameInput.simulate('change', { persist: () => { }, target: { name: 'itemName', value: formValues.itemName } });
        });

        await act(async () => {
            descriptionInput.simulate('change', { persist: () => { }, target: { name: 'description', value: formValues.description } });
        });

        await act(async () => {
            amountInput.simulate('change', { persist: () => { }, target: { name: 'amount', value: formValues.amount } });
        });

        await act(async () => {
            categoryInput.simulate('change', { persist: () => { }, target: { name: 'category', value: formValues.category } });
        });

        await act(async () => {
            isActiveInput.simulate('change', { persist: () => { }, target: { name: 'isActive', value: formValues.isActive } });
        });

        await act(async () => {
            wrapper.find('form').simulate('submit');
        });
        expect(props.addItem).toHaveBeenCalledWith(formValues, expect.anything());
    });
});

describe('Update item Flow', () => {
    const props = {
        item: {
            isLoading: false,
        },
        history: {
            replace: jest.fn(),
        },
        getItem: jest.fn(),
        updateItem: jest.fn(),
        addItem: jest.fn(),
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

    test('Check getItem action should be called props', () => {
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(props.getItem).toHaveBeenCalled();
    });

    test('Check page titile should be `Update item`', () => {
        const wrapper = setup(props);
        wrapper.instance().setState({ id: props.match.params.id });
        const pageTitle = findByAttr(wrapper, 'page-heading');
        expect(pageTitle.text()).toEqual('Update Item');
    });

    test('Checking the form values ', async () => {

        const formValues = {
            itemName: 'Kaju Kadi',
            description: 'This is Kaju kadi',
            category: "Lunch",
            amount: 30,
            isActive: 'Active',
        };

        const wrapper = mount(<BrowserRouter>
            <UnconnectedAddItem {...props} />
        </BrowserRouter>);
        wrapper.instance().setState({
            id: props.match.params.id,
            initialValues: formValues,
        });

        const itemNameInput = findByAttr(wrapper, 'itemName-input').find('input').first();
        const descriptionInput = findByAttr(wrapper, 'description-input').find('textarea').first();
        const amountInput = findByAttr(wrapper, 'amount-input').find('input').first();
        const categoryInput = findByAttr(wrapper, 'category-input').find('select').first();
        const isActiveInput = findByAttr(wrapper, 'isActive-input').find('select').first();

        await act(async () => {
            itemNameInput.simulate('change', { persist: () => { }, target: { name: 'itemName', value: formValues.itemName } });
        });

        await act(async () => {
            descriptionInput.simulate('change', { persist: () => { }, target: { name: 'description', value: formValues.description } });
        });

        await act(async () => {
            amountInput.simulate('change', { persist: () => { }, target: { name: 'amount', value: formValues.amount } });
        });

        await act(async () => {
            categoryInput.simulate('change', { persist: () => { }, target: { name: 'category', value: formValues.category } });
        });

        await act(async () => {
            isActiveInput.simulate('change', { persist: () => { }, target: { name: 'isActive', value: formValues.isActive } });
        });

        await act(async () => {
            wrapper.find('form').simulate('submit');
        });
        expect(props.updateItem).toHaveBeenCalledWith(props.match.params.id, formValues, expect.anything(), true);
    });
}); 