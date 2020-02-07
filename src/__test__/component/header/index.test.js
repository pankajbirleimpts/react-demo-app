import React from 'react';
import { shallow, mount } from 'enzyme';
import { Header } from '../../../components/header/index';
import { storeFactory, findByAttr } from '../../test/TestUtils';

const setup = (props) => {
    const wrapper = shallow(
        <Header {...props} />,
    )
    return wrapper;
};

describe('If a user is login with admin', () => {
    const props = {
        user: {
            isAuthenticated: true,
            data: {
                firstName: 'Admin',
                lastName: 'User',
                role: 'ADMIN',
            }
        },
        signout: jest.fn(),
        history: {
            push: jest.fn()
        }
    };

    test('Snapshot of Header component', () => {
        const wrapper = setup(props);
        expect(wrapper).toMatchSnapshot();
    });


    test('Check user details section should be displayed', () => {
        const wrapper = setup(props);
        const userDetailsSection = findByAttr(wrapper, 'user-details-section');
        expect(userDetailsSection.length).toBe(1);
    });

    test('Admin navaigation section should be displayed', () => {
        const wrapper = setup(props);
        const adminNavigationSection = findByAttr(wrapper, 'admin-navigation');
        expect(adminNavigationSection.length).toBe(1);
    });

    test('After clicking on signout, `signout` action should be called', () => {
        const wrapper = setup(props);
        const logoutAction = findByAttr(wrapper, 'logout-action');
        logoutAction.simulate('click');
        expect(props.signout).toHaveBeenCalled();
    });

    test('Sign up navigation should not be displayed', () => {
        const wrapper = setup(props);
        const signupNavigation = findByAttr(wrapper, 'sign-navigation');
        expect(signupNavigation.length).not.toBe(1);
    });

});

describe('If a user is login with EMPLOYEE role', () => {
    const props = {
        user: {
            isAuthenticated: true,
            data: {
                firstName: 'Admin',
                lastName: 'User',
                role: 'EMPLOYEE',
            }
        },
        signout: jest.fn(),
        history: {
            push: jest.fn()
        }
    };

    test('Admin navaigation section should not be displayed', () => {
        const wrapper = setup(props);
        const adminNavigationSection = findByAttr(wrapper, 'admin-navigation');
        expect(adminNavigationSection.length).not.toBe(1);
    });
});


describe('If a user is not login', () => {
    const props = {
        user: {
            isAuthenticated: false,
            data: null,
        },
        signout: jest.fn(),
        history: {
            push: jest.fn()
        }
    };

    test('Sign up navigation should be displayed', () => {
        const wrapper = setup(props);
        const signupNavigation = findByAttr(wrapper, 'sign-navigation');
        expect(signupNavigation.length).toBe(1);
    });

    test('Check user details section should not be displayed', () => {
        const wrapper = setup(props);
        const userDetailsSection = findByAttr(wrapper, 'user-details-section');
        expect(userDetailsSection.length).not.toBe(1);
    });

});