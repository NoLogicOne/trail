import React, { Component } from 'react';
import './GameField.css';

class GameField extends Component {
  constructor(props){
    super(props);

    let matrixRow = [];
    let newMatrix = [];

    for(let i = 0; i < this.props.rows; i++){
      matrixRow = [];
      
      for (var i1 = 0; i1 < this.props.size; i1++) {
        matrixRow.push("0");
      }
      
      newMatrix.push(matrixRow);
    }

    this.state = {
      matrix: newMatrix
    }
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

  	virtualMatrix[row] = newRow;

  	this.setState({matrix: virtualMatrix});
  }

  _createTable(){
  	let arr = [];

  	for(let i = 0; i < this.props.rows; i++){
  		let expr = [];
  		
  		for(let i1 = 0; i1 < this.props.size; i1++){
  			let key = String(i) + "-" + String(i1);

  			let active = this.state.matrix[i][i1] === "1" 
  							? "active"
  							: "";
  			
  			expr.push(<td 
  				key={key}
  				className={active}>{key}
  			</td>);
  		}
  		

  		arr.push(<tr key={i.toString()}>{expr}</tr>);
  	}

  	return arr;
  }

  render() {
    return (
      <table id="GameField">
        <thead></thead>
        <tbody 
        	onClick={this.handleClick}
        	>
        	{this._createTable()}
        </tbody>
      </table>
    );
  }
}

export default GameField;