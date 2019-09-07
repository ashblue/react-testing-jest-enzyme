import React from 'react';
import Input from "./Input";

import {shallow} from 'enzyme';
import reducers from '../../../src/reducers';
import {createStore} from "redux";

export const storeFactory = (initialState) => {
  return createStore(reducers, initialState);
};

const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />).dive().dive();
  console.log(wrapper.debug());
};

// const wrapper = shallow(<Input store={store} />).dive().dive();

describe('render', () => {
  describe('word has not been guessed', () => {
    it('renders component without error', () => {
      setup();
    });

    it('renders component input box', () => {

    });

    it('renders component button', () => {

    });
  });

  describe('word has been guessed', () => {
    describe('does not', () => {
      it('renders component without error', () => {

      });

      it('renders component input box', () => {

      });

      it('renders component button', () => {

      });
    });
  });
});

describe('update state', () => {

});
