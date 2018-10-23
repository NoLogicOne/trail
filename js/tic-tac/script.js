
const SIDE     = 0;
const TABLE    = document.getElementById("table");
const REFRESH  = document.getElementById("refresh");
const LOG      = document.getElementById("log");

initField(SIDE);
// In theis block, only the attachment of different handlers will be executed
TABLE.addEventListener("click", tableHandler());
document.getElementById("clear_log").addEventListener("click", clearLog);

// function that creates a playing field
function initField(side){
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

