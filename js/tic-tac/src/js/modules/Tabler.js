import {Consts} from "./constants.js";

var Table = function(side){

	var getCellsFromTable = doCellsFromTable.bind(null, (cell) => {return cell});
	var getCell = doCell.bind(null, (cell) => {return cell});
	var getColor = doCell.bind(null, (cell) => {return cell.style.backgroundColor});
	var cleanField = doCellsFromTable.bind(doCellsFromTable, (cell) => {cell.style.backgroundColor = ""});
	var getVirtualTable = doCellsFromTable.bind(null, (cell) => {return cell.style.backgroundColor});
	
	initial();
	
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

	function getStep(direction){
		switch (direction){
			case 'down':
				return Number(side);
			case 'right-down':
				return Number(side) + 1;
			case 'right-up':
				return -Number(side) + 1;
			case 'right':
				return 1;
		}
	}

	function getNextCell(index, direction){
		let next = index + getStep(direction);
		
		if(next >= side * side){
			return null;
		}
		if(next < 0){
			return null;
		}

		if (getColumn(index) == (side - 1)) {
			if((direction == "right-down") || 
				(direction == "right-up") || 
				(direction == "right")) {
				return null;
			}
		} 

		return next; 
	}

	return {
		init: initial,
		brush: brushCell,
		getVirtual: getVirtualTable
	}
};

export {Table};