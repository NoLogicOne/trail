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

 