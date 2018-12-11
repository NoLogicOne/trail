import React, { Component } from 'react';
import './App.css';

import Game from "./Game/Game.js";

const CONFIG = {
  size: 15,
  rows: 50
}

class App extends Component {
  

  render() {
    return (
      <div id="App">
        <header className="App-header">
          <h1>TETRIS</h1>
        </header>
        
        <Game size={CONFIG.size}
              rows={CONFIG.rows}
              handleClick={this.handleClick}
              />
      </div>
    );
  }
}

export default App;
