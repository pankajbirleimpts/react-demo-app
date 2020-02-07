import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Signup, { UnConnectedSignup } from '../../../components/signin/signup';
import { storeFactory, findByAttr } from '../../test/TestUtils';



const setup = (props) => {
    const store = storeFactory(props);
    const wrapper = shallow(
        <Signup store={store} />,
    )
        .dive()
        .dive();
    return wrapper;
};

describe('Signup component', () => {
    //   test('Snapshot of Signup component', () => {
    //     const props = {
    //       user: {
    //         isAuthenticated: false,
    //       },
    //     };
    //     const wrapper = setup(props);
    //     expect(wrapper).toMatchSnapshot();
    //   });


    test('Check the isAuthenticated in props', () => {
        const props = {
            user: {
                isAuthenticated: false,
            },
        };
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.user.isAuthenticated).toBe(props.user.isAuthenticated);
    });

    test('Check the Signup action in props', () => {
        const props = {
            user: {
                isAuthenticated: false,
            },
        };
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.signup).toBeInstanceOf(Function);
    });

    test('Checking redirect to dashboard if user is loggedin ', () => {
        const historyMock = { replace: jest.fn() };
        const props = {
            user: {
                isAuthenticated: true,
            },
            history: historyMock,
        };
        const wrapper = shallow(<UnConnectedSignup {...props} />);
        expect(historyMock.replace).toHaveBeenCalled();
    });

    test('Checking the form values ', async () => {
        const historyMock = { replace: jest.fn() };
        const singupMock = jest.fn();
        const props = {
            user: {
                isAuthenticated: false,
            },
            history: historyMock,
            signup: singupMock,
        };
        const formValues = {
            email: 'test@test.com',
            password: 'test@123',
            firstName: "Test",
            lastName: "User",
            balance: 0,
            role: "EMPLOYEE",
            country: "Indore",
            employeeId: "Test123"
        };

        const wrapper = mount(<UnConnectedSignup {...props} />);

        const emailInput = findByAttr(wrapper, 'email-input').find('input').first();
        const passwordInput = findByAttr(wrapper, 'password-input').find('input').first();
        const confirmPasswordInput = findByAttr(wrapper, 'confirmPassword-input').find('input').first();
        const firstNameInput = findByAttr(wrapper, 'firstName-input').find('input').first();
        const lastNameInput = findByAttr(wrapper, 'lastName-input').find('input').first();
        const employeeIdInput = findByAttr(wrapper, 'employeedId-input').find('input').first();
        const countryInput = findByAttr(wrapper, 'country-input').find('select').first();

        await act(async () => {
            emailInput.simulate('change', { persist: () => { }, target: { name: 'email', value: formValues.email } });
        });

        await act(async () => {
            passwordInput.simulate('change', { persist: () => { }, target: { name: 'password', value: formValues.password } });
        });

        await act(async () => {
            confirmPasswordInput.simulate('change', { persist: () => { }, target: { name: 'confirmPassword', value: formValues.password } });
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

        expect(singupMock).toHaveBeenCalledWith(formValues, expect.anything());
    });

});