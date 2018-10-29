// It's a block 0f constants
const TABLE    = document.getElementById("table");
const REFRESH  = document.getElementById("refresh");
const LOG      = document.getElementById("log");

// These are custom variables
var player1 = "Player1";
var player2 = "Player2";
var side    = 0;
var winLine = 0;

// These are game's variables
var currentClass  = "cross";
var currentPlayer = player1;

// These are binding variation of functions
var getCellsFromTable = doCellsFromTable.bind(null, (cell)=>{return cell});
var cleanField = doCellsFromTable.bind(null, (cell) => {cell.className = ""});
 
// In theis block, only the attachment of different handlers will be executed
TABLE.addEventListener("click", tableHandler());
REFRESH.addEventListener("click", cleanField);
document.getElementById("clear_log").addEventListener("click", clearLog);
document.getElementById("start-game").addEventListener("click", startHandler);
document.getElementById("setup-form").addEventListener("submit", startHandler);

// function that creates a playing field
function initGame(side){
	let field = "<td></td>".repeat(side);
	field = ("<tr>" + field + "</tr>").repeat(side);
	TABLE.innerHTML = field;
	resizeGame();
	log("Firs move will make " + currentPlayer);
}

function resizeGame(){
	let linearSide = getLinearSide();
	let cells      = getCellsFromTable();
	
	for (var i = cells.length - 1; i >= 0; i--) {
		cells[i].style.width   = linearSide + "px"; 
		if(i==0) console.log(cells[i].style.with);
		cells[i].style.height = linearSide + "px";
	}
}

function getLinearSide(){
	let field  = document.getElementById("playground");
	let header = document.getElementById("header");
	let minHeight = field.clientHeight - REFRESH.clientHeight - header.clientHeight;

	let linearSide = (field.clientWidth < minHeight) ? 
						field.clientWidth :
						minHeight;

	return ((linearSide - 100) / side);
}

/*
Function, returns a handler function for table cells

*/

function tableHandler(){
	var currentClass = "cross";

	function toggleCurrent(){
		if(currentClass == "cross") {
			currentClass  = "zero";
			currentPlayer = player2;
		} else {
			currentClass  = "cross";
			currentPlayer = player1;
		}

		log("now it's a " + currentPlayer + " turn");
	}

	return function(event){
		if (event.target.nodeName == "TD") {
			event.stopPropagation();
			if (event.target.className != "") {
				return;
			}
			event.target.className = currentClass;
			toggleCurrent();
		}
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

function doCellsFromTable(callback){
	let table = TABLE;
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

// The first decorator I need is a value return decorator after processing



/*
function that write messages in log's window
@str - message for a log
@status - success, warning or error
          success is default value 
*/
function log(str, status) {
	let stat = status || "success";
	let res = "<div class='message " + stat + "'>" + str + "</div>";
	LOG.innerHTML = res + LOG.innerHTML;
}

function clearLog(){
	LOG.innerHTML = "";
}

