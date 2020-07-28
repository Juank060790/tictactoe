import React, { Component } from 'react'
import Board from './components/Board'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "Juan Carlos",
      nextPlayer: true,
      squareList: Array(9).fill(null),
      
    }
  }

  setParentState = (obj) => {
    this.setState(obj)
  }
  
 

  render() {
    return (
      <div>
        <h1> Tic Tac Toe</h1>
        <h3> User name: {this.state.username}</h3>
        <Board squareList={this.state.squareList}
          setParentState={this.setParentState}
          nextPlayer={this.state.nextPlayer}
          calculateWinner={this.calculateWinner}
        />
        <ol>History</ol>
        <ol>Ranking</ol>
      </div>
    )
  }
}
