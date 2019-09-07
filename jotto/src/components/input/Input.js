import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Input extends Component {
  render() {
    return (
      <div>
        <button></button>
      </div>
    );
  }
}

// Input.propTypes = {};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Input);
