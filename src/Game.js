import React from "react";

import Counter from "./components/Counter";
import Field from "./components/Field";

import "./Game.css";

import Timer from "./utils/Timer.js";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameTimer: new Timer("[GameTimer]", 10, {
        timerDidUpdate: this.updateGameCps,
        timerDidDestroy: this.stopGame,
      }),

      cooldownTimer: new Timer("[CooldownTimer]", 4, {
        timerDidUpdate: () => this.forceUpdate(),
        timerDidDestroy: () => this.forceUpdate(),
      }),

      // Stats & Results
      gameCps: 0.0,
      gameClicksCount: 0,
      gameRecord: 0.0,
      gameLastResult: 0.0,
    };
  }

  startGame = () => {
    console.log("[Game] The game started.");

    const gameTimer = this.state.gameTimer;
    gameTimer.start();
  };

  stopGame = () => {
    console.log("[Game] The game ended.");

    const gameCps = this.state.gameCps;
    this.updateGameRecord(gameCps);
    this.updateGameLastResult(gameCps);

    const cooldownTimer = this.state.cooldownTimer;
    cooldownTimer.start();

    this.setState({
      gameCps: 0,
      gameClicksCount: 0,
    });
  };

  // Stats
  updateGameCps = () => {
    const gameElapsedTime = this.state.gameTimer.elapsedTime;
    const gameClicksCount = this.state.gameClicksCount;

    const gameCps = gameClicksCount / gameElapsedTime;

    this.setState({
      gameCps: gameCps,
    });
  };

  // Results
  updateGameRecord = (gameCps) => {
    const gameRecord = this.state.gameRecord;
    this.setState({
      gameRecord: gameCps > gameRecord ? gameCps : gameRecord,
    });
  };

  updateGameLastResult = (gameCps) => {
    this.setState({
      gameLastResult: gameCps,
    });
  };

  updateClicksCount = () => {
    const gameClicksCount = this.state.gameClicksCount;

    this.setState({
      gameClicksCount: gameClicksCount + 1,
    });
  };

  // Field
  handleFieldClick = () => {
    const cooldownTimer = this.state.cooldownTimer;
    const isCooldownTimerRunning = cooldownTimer.isRunning;

    if (isCooldownTimerRunning) {
      return;
    }

    const gameTimer = this.state.gameTimer;
    const isGameTimerRunning = gameTimer.isRunning;

    if (!isGameTimerRunning) {
      this.startGame();
    }

    this.updateClicksCount();
  };

  generateFieldText = () => {
    const cooldownTimer = this.state.cooldownTimer;
    const isCooldownTimerRunning = cooldownTimer.isRunning;

    const gameTimer = this.state.gameTimer;
    const isGameTimerRunning = gameTimer.isRunning;

    return isCooldownTimerRunning
      ? `⛔ воу-воу, полегче (${cooldownTimer.timeLeft.toFixed(3)})`
      : isGameTimerRunning
      ? "🏃‍♂️ нажимай как можно скорее"
      : "👇 нажми, чтобы начать игру";
  };

  render() {
    const gameTimer = this.state.gameTimer;
    const gameTimeLeft = gameTimer.timeLeft;

    const gameCps = this.state.gameCps;
    const gameClicksCount = this.state.gameClicksCount;
    const gameRecord = this.state.gameRecord;
    const gameLastResult = this.state.gameLastResult;

    return (
      <div className="game">
        <div className="stats">
          <Counter
            icon="⏱"
            value={gameTimeLeft.toFixed(2)}
            description="оставшееся время"
          />
          <Counter
            icon="⚡"
            value={gameCps.toFixed(2)}
            description="нажатий в секунду"
          />
          <Counter
            icon="🚩"
            value={gameClicksCount}
            description="количество нажатий"
          />
        </div>
        <Field
          className="field"
          text={this.generateFieldText()}
          onClick={() => this.handleFieldClick()}
        />
        <div className="results">
          <Counter
            icon="⏮"
            value={gameLastResult.toFixed(2)}
            description="последний результат"
          />
          <Counter
            icon="🏆"
            value={gameRecord.toFixed(2)}
            description="лучший результат"
          />
        </div>
      </div>
    );
  }
}

export default Game;