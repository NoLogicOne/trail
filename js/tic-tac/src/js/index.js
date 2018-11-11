import "../scss/style.scss";
 
import {Logger} from './modules/logger.js';
import {Consts} from "./modules/constants.js";
import {typeCheck} from "./modules/checker.js";

Logger.log("fuck");
// These are game's variables
var currentClass  = "cross";
var currentPlayer = player1;

/*
A handler function for table cells
*/
function toggleCurrent(){
	if(currentClass == "cross") {
		currentClass  = "zero";
		currentPlayer = player2;
	} else {
		currentClass  = "cross";
		currentPlayer = player1;
	}

	Logger.log("now it's a " + currentPlayer + " turn");
}

// These are custom variables
var player1 = "Player1";
var player2 = "Player2";
var side    = 10;
var winLine = 5;

// These are binding variation of functions
var getCellsFromTable = doCellsFromTable.bind(null, (cell) => {return cell});
var getCell = doCell.bind(null, (cell) => {return cell});
var getClass = doCell.bind(null, (cell) => {return cell.className});
var cleanField = doCellsFromTable.bind(doCellsFromTable, (cell) => {cell.className = ""});

// In theis block, only the attachment of different handlers will be executed
Consts.TABLE.addEventListener("click", tableHandler);
Consts.REFRESH.addEventListener("click", cleanField);
document.getElementById("start-game").addEventListener("click", startHandler);
document.getElementById("setup-form").addEventListener("submit", startHandler);


var initGame = typeCheck((side) => {
	let field = "<td></td>".repeat(side);
	field = ("<tr>" + field + "</tr>").repeat(side);
	Consts.TABLE.innerHTML = field;
	resizeGame();
	Logger.log("Firs move will make " + currentPlayer);
}, ["checkNumber"]);

function resizeGame(){
	let linearSide = getLinearSide();
	let cells      = getCellsFromTable();
	
	for (var i = cells.length - 1; i >= 0; i--) {
		cells[i].style.width  = linearSide + "px"; 
		if(i==0) console.log(cells[i].style.with);
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

function startHandler(event){
	event.preventDefault();
	player1 = document.getElementById("player1").value;
	player2 = document.getElementById("player2").value;
	side    = document.getElementById("side").value;
	winLine = document.getElementById("line-for-win").value;
	initGame(side);
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
// While studying design patterns, I discovered carring - let's apply

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
function getRow(cell){
	return ((cell - cell % side) / side); 
}
function getColumn(cell){
	return (cell % side);
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