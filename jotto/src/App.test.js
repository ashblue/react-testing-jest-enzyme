import React from 'react';
import App, {UnconnectedApp} from './App';

import {shallow} from 'enzyme';
import {storeFactory} from "../test/testUtils";

const setup = (initialState = {}) => {
  const store = storeFactory(getState(initialState));
  return shallow(<App store={store} />).dive().dive();
};

const getState = (initialState) => {
  const defaultState = {secretWord: 'a', guessedWords: [], success: false};
  return {...defaultState, ...initialState};
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

// @TODO Mock injection should be a re-usable global method helper
it('run `getSecretWord` on App mount', () => {
  const getSecretWordMock = jest.fn();
  const wrapper = shallow(
    <UnconnectedApp
      {...getState({getSecretWord: getSecretWordMock})}
    />
  );

  wrapper.instance().componentDidMount();
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);
});
