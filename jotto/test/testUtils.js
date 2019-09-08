import {createStore, applyMiddleware} from "redux";
import checkPropTypes from 'check-prop-types';

import reducers from '../src/reducers';
import {middleware} from "../src/configureStore";

export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(reducers, initialState);
};

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name,
  );

  expect(propError).toBeUndefined();
};
