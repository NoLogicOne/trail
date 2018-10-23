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

// In theis block, only the attachment of different handlers will be executed
TABLE.addEventListener("click", tableHandler());
document.getElementById("clear_log").addEventListener("click", clearLog);
document.getElementById("start-game").addEventListener("click", startHandler);
// document.getElementById("setup-form").addEventListener("submit", startHandler);
document.getElementById("setup-form").addEventListener("submit", log("submit"));
document.getElementById("setup-form").onsubmit = startHandler;

// function that creates a playing field
function initGame(side){
	let field = "<td></td>".repeat(side);
	field = ("<tr>" + field + "</tr>").repeat(side);
	TABLE.innerHTML = field;
}

/*
Function, returns a handler function for table cells

*/

function tableHandler(){
	var currentClass = "cross";

	function toggleCurrent(){
		currentClass = (currentClass == "cross") ? "zero" : "cross";
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
	log("startHandler");
	player1 = document.getElementById("player1").value;
	player2 = document.getElementById("player2").value;
	side    = document.getElementById("side").value;
	winLine = document.getElementById("line-for-win").value;
	initGame(side);
}

function clearLog(){
	LOG.innerHTML = "";
}

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

