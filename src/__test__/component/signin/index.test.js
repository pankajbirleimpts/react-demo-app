import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Signin, { UnConnectedSignin } from '../../../components/signin/index';
import { storeFactory, findByAttr } from '../../test/TestUtils';

const setup = (props) => {
  const store = storeFactory(props);
  const wrapper = shallow(
    <Signin store={store} />,
  )
    .dive()
    .dive();
  return wrapper;
};

describe('Signin component', () => {
  test('Snapshot of Signin component', () => {
    const props = {
      user: {
        isAuthenticated: false,
      },
    };
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
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

  test('Check the signIn action in props', () => {
    const props = {
      user: {
        isAuthenticated: false,
      },
    };
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.signin).toBeInstanceOf(Function);
  });

  test('Checking redirect to dashboard if user is loggedin ', () => {
    const historyMock = { push: jest.fn() };
    const props = {
      user: {
        isAuthenticated: true,
      },
      history: historyMock,
      location: {
        state : '/',
      }
    };
    const wrapper = shallow(<UnConnectedSignin {...props} />);
    expect(historyMock.push).toHaveBeenCalled();
  });
  
  test('Checking the form values ', async () => {
    const spyFormSubmitHandler = jest.spyOn(UnConnectedSignin.prototype, 'formSubmitHandler');
    const historyMock = { push: jest.fn() };
    const singinMock = jest.fn();
    const props = {
      user: {
        isAuthenticated: false,
      },
      history: historyMock,
      signin: singinMock,
    };
    const formValues = {
      email: 'test@test.com',
      password: 'test@123',
    };

    const wrapper = mount(<UnConnectedSignin {...props} />);

    const emailInput = findByAttr(wrapper, 'email-input').find('input').first();
    const passwordInput = findByAttr(wrapper, 'password-input').find('input').first();

    await act(async () => {
      emailInput.simulate('change', { persist: () => { }, target: { name: 'email', value: formValues.email } });
    });

    await act(async () => {
      passwordInput.simulate('change', { persist: () => { }, target: { name: 'password', value: formValues.password } });
    });

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    wrapper.instance().formSubmitHandler();
    expect(spyFormSubmitHandler).toHaveBeenCalled();
    expect(spyFormSubmitHandler).toHaveBeenCalledWith({ email: formValues.email, password: formValues.password, loginasadmin: "" });
  }); 

});