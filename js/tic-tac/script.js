const FIELD_ID = "table";
const SIDE     = 3;
const TABLE    = document.getElementById(FIELD_ID);
const REFRESH  = document.getElementById("refresh");
const LOG      = document.getElementById("log");

initField(SIDE, FIELD_ID);
// In theis block, only the attachment of different handlers will be executed
TABLE.addEventListener("click", tableHandler());

// function that creates a playing field
function initField(side, id){
	let field = "<td></td>".repeat(side);
	field = ("<tr>" + field + "</tr>").repeat(side);
	document.getElementById(id).innerHTML = field;
}

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

