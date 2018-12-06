import React, { Component } from 'react';
import './Header.css';

import HeadCell from "./HeadCell.js";

export default class Header extends Component {
	
	createList(items) {
		return items.map((item) => {
			let arrow = "no-sort";
// подготовка класса для стрелочки (индикатор сортировки)
			if (item === this.props.sorter) {
				arrow = this.props.direction 
					? "upper-sort" : "down-sort"
			}
			
			return (<HeadCell
					key={item}
					value={item}
					arrow={arrow}
					/>)
		});
	}

	render() {
		return (
			<tr>
				{this.createList(this.props.headers)}
			</tr>
		);
	}
}
