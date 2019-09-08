import React, {Component} from 'react';
import './App.css';
import Congrats from "./components/congrats/Congrats";
import GuessedWords from "./components/guessedWords/GuessedWords";
import {connect} from "react-redux";
import {getSecretWord} from "./actions";
import Input from "./components/input/Input";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success}/>
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords}/>
      </div>
    );
  }
}

const mapStateToProps = ({success, guessedWords, secretWord}) => ({
  success,
  guessedWords,
  secretWord,
});

export default connect(mapStateToProps, {getSecretWord})(UnconnectedApp);
