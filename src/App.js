import React, { Component } from "react";
import Board from "./components/Board";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login'
import "./App.css";
let timer;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogIn: false,
      username: "",
      nextPlayer: true,
      squareList: ["", "", "", "", "", "", "", "", ""],
      winner: "",
      gameOver: false,
      history: [],
      elapsedTime: 0,
      rankingList: [],
    };
  }

  responseFacebook = (response) => {

    this.setState({ isLogIn: true, username: response.name })
    console.log(response);
  }

  setParentsState = (obj) => {
    this.setState(obj);
  };

  postData = async () => {
    let data = new URLSearchParams();
    data.append("player", this.state.username);
    data.append("score", this.state.elapsedTime);
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });

  }

  getData = async () => {
    let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let data = await fetch(url);
    let result = await data.json();
    this.setState({ ...this.state, rankingList: result.items })
    console.log("players", result.items)
  }

  componentDidMount() {
    this.getData()
  }

  backToPast = (index) => {
    let past = this.state.history[index];
    this.setState({
      ...this.state,
      squareList: past.squareList,
      nextPlayer: past.nextPlayer,
    });
    console.log("resetGame before", this.squareList)
  };



  resetGame = () => {
    this.setState({
      squareList: (["", "", "", "", "", "", "", "", ""]),
      nextPlayer: (true),
      history: [],
      elapsedTime: 0,
      timer: 0,
      winner: "",
      gameOver: false,
    })
    this.stopTimer()
    this.countTime()

  }


  stopTimer = () => {
    clearInterval(timer)
  }

  countTime = () => {
    timer = setInterval(() => this.setState({ elapsedTime: this.state.elapsedTime + 1 }), 1000)

  }



  render() {


    if (!this.state.isLogIn) {
      return (
        <FacebookLogin
          appId="735105324009069"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook} />
      )
    }
    return (
      <div>

        <Row style={{ marginTop: "70px" }}>
          <Col md={3}>
            <div className="tictactoe">
              <h1>Tic Tac Toe</h1>
              <h3>User name {this.state.username} </h3>
              <ol>Ranking
            {this.state.rankingList.map((item, index) => {
              return (
                <li> {item.player} :{item.score}</li>
              );
            })}
            </ol>
            </div>
          </Col>
          <Col md={5}>
            <Board
              className="game-board"
              squareList={this.state.squareList}
              setParentsState={this.setParentsState}
              nextPlayer={this.state.nextPlayer}
              winner={this.state.winner}
              gameOver={this.state.gameOver}
              history={this.state.history}
              postData={this.postData}
              timecounting={this.timecounting}
              stopTimer={this.stopTimer}
              rankingList={this.getData}
            />
          </Col>

          <Col md={4}>
            <ol>
              <h2>History</h2>
          {this.state.history.map((_, index) => {
              return (
                <div>
                  <Button className="spacing-buttons" variant="primary" onClick={() => this.backToPast(index)}>
                    Go To:{index + 1}
                  </Button>
                </div>
              );
            })}
            </ol>
            <Button variant="warning" size="lg" onClick={() => this.resetGame()}>Start/Reset
            </Button>
            <Row sm={10}>
            <ol>Time: {this.state.elapsedTime}</ol>
            
           
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}