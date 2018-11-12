import {Consts} from "./constants.js";

var Table = function(side){

	var getCellsFromTable = doCellsFromTable.bind(null, (cell) => {return cell});
	var getCell = doCell.bind(null, (cell) => {return cell});
	var getColor = doCell.bind(null, (cell) => {return cell.style.color});
	var cleanField = doCellsFromTable.bind(doCellsFromTable, (cell) => {cell.style.backgroundColor = ""});
	var brush = doCell.bind(null, (cell, color) => {cell.style.backgroundColor = color});
	
	initial();
	
	Consts.TABLE.addEventListener("click", tableHandler);
	Consts.REFRESH.addEventListener("click", cleanField);

	function resizeGame(){
		let linearSide = getLinearSide();
		let cells      = getCellsFromTable();
		
		for (var i = cells.length - 1; i >= 0; i--) {
			cells[i].style.width  = linearSide + "px"; 
			cells[i].style.height = linearSide + "px";
		}
	}

	function getLinearSide(){
		let field  = document.getElementById("playground");
		let header = document.getElementById("header");
		let minHeight = field.clientHeight - Consts.REFRESH.clientHeight - header.clientHeight;

		let linearSide = (field.clientWidth < minHeight) ? 
							field.clientWidth :
							minHeight;

		return ((linearSide - 100) / side);
	}

	function tableHandler(event, color){
		let target = event.target;
		
		if (target.nodeName == "TD") {
			event.stopPropagation();
			if (target.className != "") {
				return;
			}
			target.style.backgroundColor = "#00ff00";
			toggleCurrent();
		}
	}

	function brushCell(index, color){
		getCell(index).style.backgroundColor = color;
	}

	function doCell(callback, index){
		let cell;
		
		typeof index == "number" ? 
			cell = Consts.TABLE.rows[getRow(index)].cells[getColumn(index)] :
			cell = index;

		return callback(cell);
	}

	function doCellsFromTable(callback){
		let table = Consts.TABLE;
		let result = [];

		for (var row = 0; row < table.rows.length; row++) {
			for (var cell =  0; cell < table.rows[row].cells.length; cell++) {
				let cellTouched = table.rows[row].cells[cell];
				result.push(callback(cellTouched));
			}
		}

		return result;
	}
	
	function getRow(cell){
		return ((cell - cell % side) / side); 
	}
	
	function getColumn(cell){
		return (cell % side);
	} 
	
	function initial(){
		let field = "<td></td>".repeat(side);
		field = ("<tr>" + field + "</tr>").repeat(side);
		Consts.TABLE.innerHTML = field;
		resizeGame();
	}

	return {
		init: initial
	}
};

export {Table};