import React, { Component } from 'react';
import './Game.css';

import GameField from "./GameField/GameField.js";
import GameInfo from "./GameInfo/GameInfo.js";

class Game extends Component {
  render() {

    return (
      <div id="Game">
	    <GameField size={this.props.size}
	    		   rows={this.props.rows}
	    		   matrix={this.props.matrix}/>    
	    <GameInfo />    
      </div>
    );
  }
}

export default Game;
