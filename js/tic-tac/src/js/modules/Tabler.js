import {Consts} from "./constants.js";

var Table = function(side){

	var getCellsFromTable = doCellsFromTable.bind(null, (cell) => {return cell});
	var getCell = doCell.bind(null, (cell) => {return cell});
	var getClass = doCell.bind(null, (cell) => {return cell.className});
	var cleanField = doCellsFromTable.bind(doCellsFromTable, (cell) => {cell.className = ""});
	
	Consts.TABLE.addEventListener("click", tableHandler);
	Consts.REFRESH.addEventListener("click", cleanField);

	initial();

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

	function tableHandler(event){
		if (event.target.nodeName == "TD") {
			event.stopPropagation();
			if (event.target.className != "") {
				return;
			}
			event.target.className = currentClass;
			toggleCurrent();
		}
	}

	function doCell(callback, index){
		return callback(
				Consts.TABLE.rows[getRow(index)].cells[getColumn(index)]
			);
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