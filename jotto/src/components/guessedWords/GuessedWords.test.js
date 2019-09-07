import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr, checkProps} from "../../../test/testUtils";
import GuessedWords from "./GuessedWords";

const defaultProps = {
  guessedWords: [{guessedWord: 'train', letterMatchCount: 3}],
};

const setup = (props = {}) => {
  const setupProps = {...defaultProps, ...props};
  return shallow(<GuessedWords {...setupProps} />);
};

it('does not throw warning with expected props', () => {
  checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({guessedWords: []});
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'guessed-words');
    expect(component.length).toBe(1);
  });

  it('renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  });
});

describe('if there are words described', () => {
  let wrapper;
  const guessedWords = [
    {
      guessedWord: 'train',
      letterMatchCount: 3,
    },
    {
      guessedWord: 'agile',
      letterMatchCount: 1,
    },
    {
      guessedWord: 'party',
      letterMatchCount: 5,
    },
  ];

  beforeEach(() => {
    wrapper = setup({guessedWords})
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'guessed-words');
    expect(component.length).toBe(1);
  });

  it('renders "guessed words history" section', () => {
    const guessedWordsHistory = findByTestAttr(wrapper, 'guessed-words-history');
    expect(guessedWordsHistory.length).toBe(1);
  });

  it('prints correct number of guessed words', () => {
    const guessedWordItems = findByTestAttr(wrapper, 'guessed-word-item');
    expect(guessedWordItems.length).toBe(guessedWords.length);
  });
});
