import React, { Component } from 'react';
import './Game.css';

import TopPanel from "./TopPanel/TopPanel.js";
import GameField from "./GameField/GameField.js";
import GameInfo from "./GameInfo/GameInfo.js";

class Game extends Component {
  constructor(props){
    super(props);

    this.state = {
      matrix: this.__createCleanMatrix()
    }
  }

  newGame(){
  	this.setState({
  		matrix: this.__createCleanMatrix()
  	})
  }

  __createCleanMatrix(){
  	let matrixRow = [];
    let newMatrix = [];

    for(let i = 0; i < this.props.rows; i++){
      matrixRow = [];
      
      for (var i1 = 0; i1 < this.props.size; i1++) {
        matrixRow.push("0");
      }
      
      newMatrix.push(matrixRow);
    }
    return newMatrix;
  }

  setCell(row, cell, cellState){
    try{
      let virtualMatrix = this.state.matrix;

      virtualMatrix[row][cell] = cellState;

      this.setState({matrix: virtualMatrix});

    } catch{
      throw new Error({message: "_setActive not in range matrix"});
    }

  }

  handleClick = (e) => {
    if(e.target.nodeName === "TD"){
      e.stopPropagation();
    }

    let cell = e.target.cellIndex;
    let row  = e.target.parentNode.rowIndex;

    this.setCell(row, cell, "1");
    this._checkRows();
  }

  _checkRows(){
  	let virtualMatrix = this.state.matrix;

  	let sums = virtualMatrix.map((row) => {
  		return row.reduce((a, b) => {
  			return Number(a) + Number(b);
  		}, 0);
  	});

  	let fullRow = sums.indexOf(this.props.size);

  	if (fullRow !== -1){
  		this._cleanRow(fullRow);
  	}
  }

  _cleanRow(row){
  	let virtualMatrix = this.state.matrix;

  	let newRow = virtualMatrix[row].map(() => {
  		return "0";
  	});

// if row is not defined, this clean all field
  	if(!row) {
  		for(let i = 0; i < virtualMatrix.length; i++){
  			virtualMatrix[i] = newRow;
  		}
  	} else {
	  	virtualMatrix[row] = newRow;
  	}

  	this.setState({matrix: virtualMatrix});
  }



  render() {

    return (
      <div id="Game">
      	<TopPanel />
	    <GameField size={this.props.size}
	    		   rows={this.props.rows}
	    		   matrix={this.state.matrix}
	    		   handleClick={this.handleClick}/>    
	    <GameInfo />    
      </div>
    );
  }
}

export default Game;
