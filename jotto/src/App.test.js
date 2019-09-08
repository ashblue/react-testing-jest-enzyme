import React from 'react';
import App from './App';

import {shallow} from 'enzyme';
import {storeFactory} from "../test/testUtils";

const setup = (initialState = {}) => {
  const defaultState = {secretWord: 'a', guessedWords: [], success: false};
  const store = storeFactory({...defaultState, ...initialState});
  return shallow(<App store={store} />).dive().dive();
};

it('renders the element', () => {
  const app = setup();
  expect(app).toBeTruthy();
});

describe('redux properties', () => {
  it('has success state prop', () => {
    const success = true;
    const wrapper = setup({success});
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });

  it('has guessedWords state prop', () => {
    const guessedWords = [{
      guessedWord: 'mom',
      letterMatchCount: 2,
    }];
    const wrapper = setup({guessedWords});
    const guessedWordsProp = wrapper.instance().props.guessedWords;

    expect(guessedWordsProp).toBe(guessedWords);
  });

  it('has secretWord state prop', () => {
    const secretWord = 'party';
    const wrapper = setup({secretWord});
    const secretWordProp = wrapper.instance().props.secretWord;

    expect(secretWordProp).toBe(secretWord);
  });

  it('has getSecretWord action function prop', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});
