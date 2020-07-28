import React, { Component } from 'react'
import Square from './Square'


export default class Board extends Component {

    selectSquare = (id) => {
        let array = this.props.squareList;
        array[id] = this.props.nextPlayer ? "X" : "O";
        this.props.setParentState({ squareList: array, nextPlayer: !this.props.nextPlayer })
        console.log("selectedSquare", array)
    }



    render() {

        let winner = calculateWinner(this.props.squareList);
        // eslint-disable-next-line
        let nextPlayer;
        if (winner) {
            nextPlayer = 'Winner: ' + winner;
        } else {
            nextPlayer = 'Next player: ' + (this.nextPlayer ? 'X' : 'O');
        }
        console.log("winner after", this.props.nextPlayer, winner)

        let champion = ''

        if (winner === "X") {
            champion = " X YOU WIN!"
        } else if (winner === "O") {
            champion = " O YOU WIN! "
        } 

        console.log("log of winners", champion)


        // 1- calculate winner and show winner 
        // 2- if there is no winner show game over
        // 3- if the user click the square that has been clciked already, block
        // 4- history
        return (
            <div>
                <h4>Next Player: {this.props.nextPlayer ? 'X' : 'O'} </h4>
                <h2>{champion}</h2>
                <div style={{ display: "flex" }}>
                    <Square id={0} selectSquare={this.selectSquare} value={this.props.squareList[0]} />
                    <Square id={1} selectSquare={this.selectSquare} value={this.props.squareList[1]} />
                    <Square id={2} selectSquare={this.selectSquare} value={this.props.squareList[2]} />
                </div>
                <div style={{ display: "flex" }}>
                    <Square id={3} selectSquare={this.selectSquare} value={this.props.squareList[3]} />
                    <Square id={4} selectSquare={this.selectSquare} value={this.props.squareList[4]} />
                    <Square id={5} selectSquare={this.selectSquare} value={this.props.squareList[5]} />
                </div>
                <div style={{ display: "flex" }}>
                    <Square id={6} selectSquare={this.selectSquare} value={this.props.squareList[6]} />
                    <Square id={7} selectSquare={this.selectSquare} value={this.props.squareList[7]} />
                    <Square id={8} selectSquare={this.selectSquare} value={this.props.squareList[8]} />
                </div>

            </div>
        )
    }
}

function calculateWinner(squareList) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squareList[a] && squareList[a] === squareList[b] && squareList[a] === squareList[c]) {
            return squareList[a];
        }
    }
    return "null";
}