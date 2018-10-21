const FIELD_ID = "table";
const SIDE     = 3;
const TABLE    = document.getElementById(FIELD_ID);
const REFRESH  = document.getElementById("refresh");
const LOG      = document.getElementById("log");

// In theis block, only the attachment of different handlers will be executed
initField(SIDE, FIELD_ID);
log("message 1");
log("message 2", "warning");
log("message 3");
log("message 4", "warning");
log("message 5", "error");

// function that creates a playing field
function initField(side, id){
	let field = "<td></td>".repeat(side);
	field = ("<tr>" + field + "</tr>").repeat(side);
	document.getElementById(id).innerHTML = field;
}

function log(str, status) {
	let stat = status || "success";
	let res = "<div class='message " + stat + "'>" + str + "</div>";
	LOG.innerHTML = res + LOG.innerHTML;
}

