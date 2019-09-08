import React, {Component} from 'react';
import {connect} from 'react-redux';

import {guessWord} from "../../actions";

export class InputInternal extends Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }

  submitGuessedWord(e) {
    e.preventDefault();

    const guess = this.inputBox.current.value;
    if (guess && guess.length > 0) {
      this.props.guessWord(guess);
      this.inputBox.current.value = '';
    }
  }

  render() {
    const {success} = this.props;

    let contents = null;
    if (!success) {
      contents = (
        <form
          data-test="form"
          className="form-inline"
          onSubmit={this.submitGuessedWord}>
          <input
            type="text"
            ref={this.inputBox}
            data-test="input-box"
            className="mb-2 mx-sm-3"
            placeholder="enter guess"
          />

          <button
            data-test="button-submit"
            type="submit"
            className="btn btn-primary mb-2">
            Submit
          </button>
        </form>
      );
    }

    return (
      <div data-test="input">
        {contents}
      </div>
    );
  }
}

const mapStateToProps = ({success}) => ({
  success,
});

export default connect(mapStateToProps, {guessWord})(InputInternal);
