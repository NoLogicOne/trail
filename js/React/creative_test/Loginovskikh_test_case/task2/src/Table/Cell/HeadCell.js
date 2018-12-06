import React, { Component } from 'react';
import './HeadCell.css';

export default class HeadCell extends Component {
// некоторые могут счесть это лишним - но это масштаб для расширения)
	render() {
		return (
			<th
			className={"table__header_" + this.props.arrow}
			>
				{this.props.value}
			</th>
		);
	}
}
