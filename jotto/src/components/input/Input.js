import React, {Component} from 'react';
import {connect} from 'react-redux';

class Input extends Component {
  render() {
    const {success} = this.props;

    let contents = null;
    if (!success) {
      contents = (
        <form className="form-inline">
          <input
            type="text"
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

export default connect(mapStateToProps)(Input);
