import React, { Component } from 'react';
import './GameInfo.css';

class GameInfo extends Component {
  
  _createTable(){
  	let arr = [];

  	for(let i = 0; i <= 2; i++){
  		let expr = [];
  		
  		expr.push(<td key={i.toString()}></td>);
  		
  		arr.push(<tr key={i.toString()}>{expr}</tr>);
  	}

  	return arr;
  }

  render() {
    return (
      <table id="GameInfo">
        <thead></thead>
        <tbody>
        	{this._createTable()}
        </tbody>
      </table>
    );
  }
}

export default GameInfo;