import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import { storeFactory } from './test/TestUtils';

const setup = (props) => {
  const store = storeFactory(props);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('App component', () => {
  test('Snapshot of App component', () => {
    const props = {
      user: {
        isAuthenticated: false,
      },
    };
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

});
