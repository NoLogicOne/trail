import React, { Component } from 'react';
import './Cell.css';

export default class Cell extends Component {
	constructor(props){
		super(props);

		this.state = {
			
		}
	}

	createList(row) {
		let keys = Object.keys(row);

		return keys.map((item) => {
			return (<td 
					key={row.toString()+"-"+item.toString()}> 
				{row[item]} 
			</td>)
		});
	}

	createRow(rows) {
		return rows.map((row) => {
			return (
				<tr key={row.id}>   
					{this.createList(row)}
				</tr>
			)
		});	
	}

	render() {
		return (
			<tbody>
				{this.createRow(this.props.data)}
			</tbody>
		);
	}
}
