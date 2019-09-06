import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      errorMessage: '',
    };
  }

  changeCounter (amount) {
    const newState = {
      counter: Math.max(0, this.state.counter + amount),
      errorMessage: '',
    };

    if (this.state.counter + amount < 0) {
      newState.errorMessage = 'Counter cannot be less than 0';
    }

    this.setState(newState);
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>

        <button
          onClick={() => this.changeCounter(1)}
          data-test="increment-button">
          Increment Counter
        </button>

        <button
          onClick={() => this.changeCounter(-1)}
          data-test="decrement-button">
          Decrement Counter
        </button>

        <p data-test="error-message">{this.state.errorMessage}</p>
      </div>
    );
  }
}

export default App;
