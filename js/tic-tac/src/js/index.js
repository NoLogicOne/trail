import "../scss/style.scss";

var Game = require("./modules/Game.js");

var G = new Game(); 

document.getElementById("start-game").addEventListener("click", startHandler);
document.getElementById("setup-form").addEventListener("submit", startHandler);

function startHandler(event){
	event.preventDefault();
	
	G.init();
}