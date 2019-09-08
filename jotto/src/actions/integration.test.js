import {storeFactory} from "../../test/testUtils";
import {guessWord} from './index';

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const userGuess = 'train';

  describe('no guessed words', () => {
    let store;
    const initialState = {secretWord};
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    it('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(userGuess));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{
          guessWord: userGuess,
          letterMatchCount: 3,
        }],
      };

      expect(newState).toEqual(expectedState);
    });

    it('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{
          guessWord: secretWord,
          letterMatchCount: secretWord.length,
        }],
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guessed words', () => {
    const guessedWords = [{ guessedWord: 'agile', letterMatchCount: 1 }];
    const initialState = {guessedWords, secretWord};
    let store;

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    it('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(userGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [
          ...guessedWords,
          { guessWord: userGuess, letterMatchCount: 3 },
        ],
      };

      expect(newState).toEqual(expectedState);
    });

    it('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        guessedWords: [
          ...guessedWords,
          { guessWord: secretWord, letterMatchCount: 5 },
        ],
      };

      expect(newState).toEqual(expectedState);
    });
  });
});
