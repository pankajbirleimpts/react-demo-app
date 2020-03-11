import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import Routing, { UnConnectedRouting } from '../../components';
import Login from '../../components/signin/index';
import NoPage from '../../components/common/NoPage';
import { storeFactory } from '../test/TestUtils';



const setup = (props) => {
    const store = storeFactory(props);
    const wrapper = shallow(<Routing store={store} />)
        .dive()
        .dive();
    return wrapper;
};

describe('Tested the Routing', () => {
    const props = {
        user: {
            isAuthenticated: false,
        },
    };
    const store = storeFactory(props);

    test('Snapshot of Routing component', () => {
        const wrapper = setup(props);
        expect(wrapper).toMatchSnapshot();
    });

    test('Invalid path should redirect to 404', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/random']}>
                    <Routing />
                </MemoryRouter>
            </Provider>,
        );
        expect(wrapper.find(Login)).toHaveLength(0);
        expect(wrapper.find(NoPage)).toHaveLength(1);
    });

    test('Valid path should not redirect to 404', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routing />
                </MemoryRouter>
            </Provider>,
        );
        expect(wrapper.find(Login)).toHaveLength(1);
        expect(wrapper.find(NoPage)).toHaveLength(0);
    });

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

    test('Check the updateUserStore action in props', () => {
        const props = {
            user: {
                isAuthenticated: false,
            },
        };
        const wrapper = setup(props);
        const componentProps = wrapper.instance().props;
        expect(componentProps.updateUserStore).toBeInstanceOf(Function);
    });

    test('Check the updateUserStore action should be called if user is authenticated', () => {
        const updateUserStoreMock = jest.fn();
        const props = {
            updateUserStore: updateUserStoreMock,
            user: {
                isAuthenticated: false,
            },
        };
        const wrapper = shallow(<UnConnectedRouting {...props} />);
        // Run life cylce method
        wrapper.instance();
        const loggedUser = reactLocalStorage.get('loggedUser');
        const componentProps = wrapper.instance().props;
        if (loggedUser && componentProps.user.isAuthenticated === false) {
            expect(updateUserStoreMock).toHaveBeenCalled();
        }
    });
});
