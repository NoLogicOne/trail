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

    this.newGame = this.newGame.bind(this);
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
      throw new Error({message: "_setCell not in range matrix"});
    }

  }

  handleClick = (e) => {
    if(e.target.nodeName === "TD"){
      e.stopPropagation();
    }

    let cell = e.target.cellIndex;
    let row  = e.target.parentNode.rowIndex;

    this.setCell(row, cell, "-1");
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

  gravity(){
  	let virtualMatrix = this.state.matrix;
  	// let flag = false;

  	let isCellBellowActives = virtualMatrix.reduce((res, row, rowIndex, vMatrix) => {
  		let rowResult = row.reduce((result, cell, cellIndex) => {
  			if(cell !== "-1"){
  				return result;
  			}
  			if(!result){
  				return result;
  			}
  			if(rowIndex === (this.props.rows - 1)){
  				return false;
  			}
  	
  			return vMatrix[rowIndex + 1][cellIndex] === "0"
  					|| vMatrix[rowIndex + 1][cellIndex] === "-1";
  		}, true);	

  		return res && rowResult;
  	}, true);

// i need to use desc order again faster fall down
  	if(!isCellBellowActives){
  		virtualMatrix = this.convertAllToPassive(virtualMatrix);
  	} else {

  		let desc = virtualMatrix
  				.reverse()
  				.map((item, row, vMatrix) => {
			  		if (row === 0) {
			  			return item;
			  		}

			  		for (let cell = 0; cell < item.length; cell++) {
			  			let isActive     = item[cell] === "-1",
			  			    isCellBellow = vMatrix[row - 1][cell] === "0";

			  			if(isActive){
				  			console.log("cell   - " + isCellBellow);
			  			}
			  			
			  			
			  			if ( isActive ){
				  			vMatrix[row - 1][cell] = "-1";
				  			item[cell] = "0";
			  			}
			  		}

			  		return item;
			  	});

  		virtualMatrix = desc.reverse();
  	}



  	this.setState({
  		matrix: virtualMatrix
  	})

  	this._checkRows();
  }

  convertAllToPassive(vMatrix){
  	let virtualMatrix = vMatrix || this.state.matrix;  

  	virtualMatrix = virtualMatrix.map((row) => {
  		return row.map((cell) => {
  			return cell === "-1"
  				? "1"
  				: cell;
  		});
  	});

  	if(vMatrix !== undefined){
  		return virtualMatrix;
  	}

  	this.setState({
  		matrix: virtualMatrix
  	})

  }

  componentDidMount() {
  	this.speed = setInterval(() => {
  	  this.gravity();
  	}, 1000);  
  }

  componentWillUnmount(){
  	clearInterval(this.speed);
  }

  render() {

    return (
      <div id="Game">
      	<TopPanel new_game={this.newGame}/>
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
