import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = ({guessedWords}) => {
  let contents = (
    <span data-test="guess-instructions">
      Try to guess the secret word!
    </span>
  );

  if (guessedWords.length > 0) {
    const guessedWordsRows = guessedWords.map(({guessedWord, letterMatchCount}, index) => (
      <tr data-test="guessed-word-item" key={index}>
        <td>{guessedWord}</td>
        <t>{letterMatchCount}</t>
      </tr>
    ));

    contents = (
      <div data-test="guessed-words-history">
        <h3>Guessed Words</h3>
        <table>
          <thead>
          <tr>
            <th>Guess</th>
            <th>Matching Letters</th>
          </tr>
          </thead>

          <tbody>
          {guessedWordsRows}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div data-test="guessed-words">
      {contents}
    </div>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default GuessedWords;

