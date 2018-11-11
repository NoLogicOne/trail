import "../scss/style.scss";
 
import {Logger}    from './modules/logger.js';
import {Consts}    from "./modules/constants.js";
import {typeCheck} from "./modules/checker.js";
// import {Table}     from "./modules/Tabler.js";
import {Game}      from "./modules/Game.js";

var G = new Game(); 

document.getElementById("start-game").addEventListener("click", startHandler);
document.getElementById("setup-form").addEventListener("submit", startHandler);


// var initGame = typeCheck((side) => {
// 	(new Table(side)).init();
// 	toggleCurrent();
// 	Logger.log("Firs move will make " + currentPlayer);
// }, ["checkNumber"]);

function startHandler(event){
	event.preventDefault();
	
	G.init();
	// initGame(side);
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