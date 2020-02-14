import React from 'react';
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { firebaseResponseTransform, AuthRoute } from '../../utils';
import { storeFactory, findByAttr } from '../test/TestUtils';
import { langs } from '../../config/index';

jest.mock('react-toastify');


describe('Testing `firebaseResponseTransform`', () => {
    test('If do not pass any data', () => {
        const response = firebaseResponseTransform(undefined);
        expect(response).toEqual([]);
    });

    test('If pass the valid data', () => {
        const agument = {
            'abc': {
                name: 'Hari'
            },
            'def': {
                name: 'Ram'
            }
        }
        const expected = [
            {
                id: 'abc',
                name: 'Hari',
            },
            {
                id: 'def',
                name: 'Ram',
            }
        ];
        const response = firebaseResponseTransform(agument);
        expect(response).toEqual(expected);
    });
});

describe('Testing of `AuthRoute`', () => {
    const UserList = () => <div data-test="user-list" />
    const setup = (props) => {
      const store = storeFactory(props);
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/users']}>
          <AuthRoute path='/users' permission='ADMIN' component={UserList} />
          </MemoryRouter>
        </Provider>,
      );
      return wrapper;
    };

    
const withoutPermissionProps = {
    user: {
      isAuthenticated: true,
      isLoading: false,
      data: {
        userId: 101,
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@test.com',
        role: "EMPLOYEE"
      },
    },
  };
  
  const permissionProps = {
    user: {
      isAuthenticated: true,
      isLoading: false,
      data: {
        userId: 101,
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@test.com',
        role: "ADMIN"       
      },
    },
  };
  
    test('Display warning toast message if a user do not have permission', () => {
      setup(withoutPermissionProps);
      toast.warning.mockImplementationOnce(() => { });
      expect(toast.warning).toHaveBeenCalledWith(langs.messages.PERMISSION_MSG);
    });
  
    test('Render component if a user has permission', () => {
      const wrapper = setup(permissionProps);
      const feedListLoader = findByAttr(wrapper, 'user-list');
      expect(feedListLoader.length).toBe(1);
    });
  });