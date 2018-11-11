import {Logger} from './logger.js';
import {Gamer}  from "./Gamer.js";
import {Table}  from "./Tabler.js";

function Game(){

	var players = [new Gamer("Igor", "#ff0000"), new Gamer("Ivan", "#00ff00")];
	var side    = 10,
		winLine = 5;

	var currentIndex = 0;

	initial.call(this);

	function toggleCurrent(){
		currentIndex++;
		currentIndex %= players.length; 

		Logger.log("now it's a " + players[currentIndex].getName() + " turn");
	}

// My plan is reorganize this func later
// checker gamers on existance soon
	function initial(){
		for(var key in players){
			delete players[key];
		}

		// console.log("players  - " + this.players.toString());

		[].push.call(players, new Gamer(
				document.getElementById("player1").value,
				document.getElementById("color1").value,
			));
		[].push.call(players, new Gamer(
				document.getElementById("player2").value,
				document.getElementById("color2").value,
			));

		side    = document.getElementById("side").value || 10;
		winLine = document.getElementById("line-for-win").value || 5;

		new Table(side);
	}

	return {
		init: initial
	}
};

export {Game};