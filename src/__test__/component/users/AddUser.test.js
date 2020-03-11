import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AddUser, { UnconnectedAddUser } from '../../../components/users/AddUser';
import { storeFactory, findByAttr } from '../../test/TestUtils';



const setup = (props) => {
    const wrapper = shallow(
        <UnconnectedAddUser {...props} />,
    )
    return wrapper;
};

describe('Add user Flow', () => {
    const props = {
        user: {
            isLoading: false,
        },
        history: {
            replace: jest.fn(),
        },
        getUser: jest.fn(),
        updateUser: jest.fn(),
        signup: jest.fn(),
        match: {
            params: {
                id: undefined,
            }
        }
    }
      test('Snapshot of AddUser component', () => {
       const wrapper = setup(props);
        expect(wrapper).toMatchSnapshot();
      });


    test('Check the isLoading in props', () => {
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.user.isLoading).toBe(props.user.isLoading);
    });

    test('Check getUser action should not be called props', () => {
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(props.getUser).not.toHaveBeenCalled();
    });

    test('Check page titile should be `Add user`', () => {
        const wrapper = setup(props);
        const pageTitle = findByAttr(wrapper, 'page-heading');
        expect(pageTitle.text()).toEqual('Add User');
    });

    test('Checking the form values ', async () => {

        const formValues = {
            email: 'test@test.com',
            password: 'test@123',
            firstName: "Test",
            lastName: "User",
            balance: 15,
            role: "EMPLOYEE",
            country: "Indore",
            employeeId: "Test123"
        };

        const wrapper = mount(<BrowserRouter>
            <UnconnectedAddUser {...props} />
        </BrowserRouter>);

        const emailInput = findByAttr(wrapper, 'email-input').find('input').first();
        const passwordInput = findByAttr(wrapper, 'password-input').find('input').first();
        const firstNameInput = findByAttr(wrapper, 'firstName-input').find('input').first();
        const lastNameInput = findByAttr(wrapper, 'lastName-input').find('input').first();
        const balanceInput = findByAttr(wrapper, 'balance-input').find('input').first();
        const employeeIdInput = findByAttr(wrapper, 'employeeId-input').find('input').first();
        const countryInput = findByAttr(wrapper, 'country-input').find('select').first();

        await act(async () => {
            emailInput.simulate('change', { persist: () => { }, target: { name: 'email', value: formValues.email } });
        });

        await act(async () => {
            passwordInput.simulate('change', { persist: () => { }, target: { name: 'password', value: formValues.password } });
        });

        await act(async () => {
            balanceInput.simulate('change', { persist: () => { }, target: { name: 'balance', value: formValues.balance } });
        });

        await act(async () => {
            firstNameInput.simulate('change', { persist: () => { }, target: { name: 'firstName', value: formValues.firstName } });
        });

        await act(async () => {
            lastNameInput.simulate('change', { persist: () => { }, target: { name: 'lastName', value: formValues.lastName } });
        });

        await act(async () => {
            employeeIdInput.simulate('change', { persist: () => { }, target: { name: 'employeeId', value: formValues.employeeId } });
        });

        await act(async () => {
            countryInput.simulate('change', { persist: () => { }, target: { name: 'country', value: formValues.country } });
        });

        await act(async () => {
            wrapper.find('form').simulate('submit');
        });
        expect(props.signup).toHaveBeenCalledWith(formValues, expect.anything(), true);
    });
});

describe('Update user Flow', () => {
    const props = {
        user: {
            isLoading: false,
        },
        history: {
            replace: jest.fn(),
        },
        getUser: jest.fn(),
        updateUser: jest.fn(),
        signup: jest.fn(),
        match: {
            params: {
                id: 101,
            }
        }
    }

    test('Check the isLoading in props', () => {
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.user.isLoading).toBe(props.user.isLoading);
    });

    test('Check getUser action should be called props', () => {
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(props.getUser).toHaveBeenCalled();
    });

    test('Check page titile should be `Update user`', () => {
        const wrapper = setup(props);
        wrapper.instance().setState({ id: props.match.params.id });
        const pageTitle = findByAttr(wrapper, 'page-heading');
        expect(pageTitle.text()).toEqual('Update User');
    });

    test('Checking the form values ', async () => {
        const formValues = {
            email: 'test@test.com',
            password: '',
            firstName: "Test",
            lastName: "User",
            balance: 15,
            role: "EMPLOYEE",
            country: "Indore",
            employeeId: "Test123"
        };

        const wrapper = mount(<BrowserRouter>
            <UnconnectedAddUser {...props} />
        </BrowserRouter>);
        wrapper.instance().setState({
            id: props.match.params.id,
            initialValues: formValues,
        });
        const emailInput = findByAttr(wrapper, 'email-input').find('input').first();
        const firstNameInput = findByAttr(wrapper, 'firstName-input').find('input').first();
        const lastNameInput = findByAttr(wrapper, 'lastName-input').find('input').first();
        const balanceInput = findByAttr(wrapper, 'balance-input').find('input').first();
        const employeeIdInput = findByAttr(wrapper, 'employeeId-input').find('input').first();
        const countryInput = findByAttr(wrapper, 'country-input').find('select').first();
       
        await act(async () => {
            emailInput.simulate('change', { persist: () => { }, target: { name: 'email', value: formValues.email } });
        });

        await act(async () => {
            balanceInput.simulate('change', { persist: () => { }, target: { name: 'balance', value: formValues.balance } });
        });

        await act(async () => {
            firstNameInput.simulate('change', { persist: () => { }, target: { name: 'firstName', value: formValues.firstName } });
        });

        await act(async () => {
            lastNameInput.simulate('change', { persist: () => { }, target: { name: 'lastName', value: formValues.lastName } });
        });

        await act(async () => {
            employeeIdInput.simulate('change', { persist: () => { }, target: { name: 'employeeId', value: formValues.employeeId } });
        });

        await act(async () => {
            countryInput.simulate('change', { persist: () => { }, target: { name: 'country', value: formValues.country } });
        });

        await act(async () => {
            wrapper.find('form').simulate('submit');
        });
        expect(props.updateUser).toHaveBeenCalledWith(props.match.params.id, formValues, expect.anything(), true);
    });
});