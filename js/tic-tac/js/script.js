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

	log("now it's a " + currentPlayer + " turn");
}



