import React from 'react';
import Input from "./Input";

import {shallow} from 'enzyme';
import {findByTestAttr, storeFactory} from "../../../test/testUtils";

const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  return shallow(<Input store={store} />).dive().dive();
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {success: false};
      wrapper = setup(initialState);
    });

    it('renders component', () => {
      const component = findByTestAttr(wrapper, 'input');
      expect(component.length).toBe(1);
    });

    it('renders component input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });

    it('renders component button', () => {
      const submitButton = findByTestAttr(wrapper, 'button-submit');
      expect(submitButton.length).toBe(1);
    });
  });

  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {success: true};
      wrapper = setup(initialState);
    });

    describe('does not', () => {
      it('renders component', () => {
        const component = findByTestAttr(wrapper, 'input');
        expect(component.length).toBe(1);
      });

      it('renders component input box', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        expect(inputBox.length).toBe(0);
      });

      it('renders component button', () => {
        const inputBox = findByTestAttr(wrapper, 'button-submit');
        expect(inputBox.length).toBe(0);
      });
    });
  });
});

describe('redux props', () => {
  it('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({success});
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });

  it('guessWord action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});
