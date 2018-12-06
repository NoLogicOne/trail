import React, { Component } from 'react';
import './Table.css';

import Cell   from "./Cell/Cell.js";
import Header from "./Cell/Header.js";

export default class Table extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// я так часто использовал заголовки, что решил выделить их в состояние
			// это не совсем правильно, но чертовски удобно
			headers: Object.keys(this.props.data[0]),
			sort: false, //сортирована ли таблица?
			sortField: "", // по какому полю сортировка
			desc: false, // сортировка по убыванию?
			dateOptions: { year: 'numeric', month: 'numeric', day: 'numeric' }
		}
	}

// проверяем, нажата ли строка с заголовком и сортирует данные на основе состояний
	clickHandler = (e) => {
		if(e.target.nodeName === "TD") {
			e.stopPropagation();
		}

		let cell = e.target,
			row  = e.target.parentNode;

		if (row.rowIndex !== 0) {
			return;
		}

		let headers  = Object.keys(this.props.data[0]);

		let current = this.state.sort 
			? this.state.sortField
			: "";

		let next = cell.cellIndex;

		if (current === headers[next]){
			!this.state.desc
				? this.setState({desc: true})
				: this.setState({sort: false, desc: false, sortField: ""})
		} else {
			this.setState({sort: true, desc: false, sortField: headers[next]});
		}
	}

// проверим изменения поля поиска, убираем знаки \ и /, 
// поищем подстроки на regExp
	onSearchChange = (e) => {
		let target = e.target;
		let cell   = target.parentNode.cellIndex;

		let reg = target.value.replace(/\/|\\/, "");
		reg = new RegExp(reg);
		let newData = this.props.data;

		newData = newData.filter((value) => {
			let attach = value[this.state.headers[cell]];
			return reg.test(attach.toString().toLowerCase());
		});

		this.setState({
			data: newData
		})
	}

// создание поля с поисками
	createSearch() {
		let arr = this.state.headers;

		return arr.map((item, idx) => {
			return (
				<td
					key={idx}>
					<input
						onChange={this.onSearchChange}

					/>
				</td>
				)
		});
	}

// генератор props для tbody
	_sorted(){
		let data = this.state.data;
		
		if(!this.state.sort){
			return this.state.data;
		}

		let callbackSort = (a, b) => {
			let _a = a[this.state.sortField],
				_b = b[this.state.sortField];
			

			if(_a.toString().split(".").length > 1){
				_a = _a.split(".").reverse().join();
				_b = _b.split(".").reverse().join();
			}

			let result = (_a > _b) ? 1 : -1;
			return !this.state.desc 
				? result
				: result * (-1);
		}

		return data.sort(callbackSort);
	}

	_parseDate(date){
		let reg = /\.|\/|\s/;
		let arr = date.split(reg);

		let result = new Date(arr[2], arr[1]-1, arr[0]);			

		if(result.toString() === "Invalid Date"){
			let months = ["января", "февраля", "марта", "апреля", "мая", "июня", 
            "июля", "августа", "сентября", "октября", "ноября", "декабря"];

            let month = months.reduce((acc, curr, index) => {
            	if(curr === arr[1]){
            		return acc + index;
            	}
            	return acc;
            }, 0);

            result = new Date(arr[2], month, arr[0]);
		}
		
		return result.toLocaleString("ru", this.state.dateOptions);
	}

// распарсим даты в один формат для удобства сортировок и читаемости таблицы
	componentWillMount() {
	 	let data = this.props.data;
		
		for (var i = 0; i < data.length; i++) {
			data[i].date = this._parseDate(data[i].date);
		}

	 	this.setState({
	 		data: data 
	 	});
	}

	render() {
		
		return (
			<table onClick={this.clickHandler}>
				<thead>
					<Header headers={this.state.headers}
						sorter={this.state.sortField}
						direction={!this.state.desc}/>
					<tr>
						{this.createSearch()}					
					</tr>
				</thead>
				<Cell data={this._sorted()} />
			</table>
		);
	}
}
