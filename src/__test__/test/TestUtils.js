import React from 'react';
import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootReducer from '../../reducers/RootReducer';

/*
* method: storeFactory
* desc: Return to createStore
* @param (initialState) object
*/
export const storeFactory = (initialState) => {
  return createStore(RootReducer, initialState, applyMiddleware(ReduxThunk));
};

/*
* method: findByAttr
* desc: Find the attribute
* @param wrapper
* @param val
*/
export const findByAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

/*
* method: checkProp
* desc: Check the prop types
* @param component
* @param confirmingProps
*/
export const checkProp = (component, confirmingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    confirmingProps,
    'prop',
    component.name,
  );
  expect(propError).toBeUndefined();
};
