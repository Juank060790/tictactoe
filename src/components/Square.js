import React, { Component } from 'react'

export default class Square extends Component {   

    // handleClick(id) {
    //     const squareList = this.state.squareList.slice();
    //     if (this.calculateWinner(squareList) || squareList[id]) {
    //       return;
    //     }
    //     squareList[id] = this.state.nextPlayer ? 'X' : 'O';
    //     this.setState({
    //       squareList: squareList,
    //       nextPlayer: !this.state.nextPlayer,
    //     });
    //   }



    render() {
        return (
            <div className="square" 
            onClick={() => this.props.selectSquare(this.props.id)}>
               {this.props.value}
            </div>
        )
    }

}
