import React, { Component } from 'react';
import './GameField.css';

class GameField extends Component {
  
  _createTable(){
  	let arr = [];

  	for(let row = 0; row < this.props.rows; row++){
  		let expr = [];
  		
  		for(let cell = 0; cell < this.props.size; cell++){
  			let key = String(row) + "-" + String(cell);

  			let value = this.props.matrix[row][cell];
  			let active = value === "1"
  				  ? "passive"
  				  : "active";

  			if(value === "0"){
  				active = "";
  			}
  			
  			expr.push(<td 
  				key={key}
  				className={active}>
  			</td>);
  		}
  		

  		arr.push(<tr key={row.toString()}>{expr}</tr>);
  	}

  	return arr;
  }

  render() {
    return (
      <table id="GameField">
        <thead></thead>
        <tbody 
        	onClick={this.props.handleClick}
        	>
        	{this._createTable()}
        </tbody>
      </table>
    );
  }
}

export default GameField;