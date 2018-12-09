import React, { Component } from 'react';
import './App.css';

import TopPanel from "./TopPanel/TopPanel.js";
import Game from "./Game/Game.js";

const CONFIG = {
  size: 10,
  rows: 7
}

class App extends Component {

  render() {
    return (
      <div id="App">
        <header className="App-header">
          <h1>TETRIS</h1>
        </header>
        <TopPanel />
        <Game size={CONFIG.size}
              rows={CONFIG.rows}
              handleClick={this.handleClick}
              />
      </div>
    );
  }
}

export default App;
