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
        <td>{index + 1}</td>
        <td>{guessedWord}</td>
        <td>{letterMatchCount}</td>
      </tr>
    ));

    contents = (
      <div data-test="guessed-words-history">
        <h3>Guessed Words</h3>
        <table className="table table-sm">
          <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Guess</th>
            <th>Matching Letters</th>
          </tr>
          </thead>

          <tbody>
          {guessedWordsRows}
          </tbody>
        </table>

        <p data-test="total-guesses">Total Guesses: {guessedWordsRows.length}</p>
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

