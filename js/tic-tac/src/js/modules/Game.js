import {Logger} from './logger.js';
import {Consts} from './constants.js';
import {Gamer}  from "./Gamer.js";
import {Table}  from "./Tabler.js";

function Game(){

	var players = [new Gamer("Igor", "#ff0000"), new Gamer("Ivan", "#00ff00")];
	var side    = 10,
		winLine = 5;

	var currentIndex = 0;
	var t = new Table(side);

	Consts.TABLE.addEventListener("click", tableHandler);

	function toggleCurrent(){
		currentIndex++;
		currentIndex %= players.length; 

		Logger.log("now it's a " + players[currentIndex].getName() + " turn");
	}

	function doMove(cell, indexGamer){
		let index = indexGamer || currentIndex;
		t.brush(cell, players[index].getColor());
		toggleCurrent();
	}

	function tableHandler(event){
		let target = event.target;
		
		if (target.nodeName == "TD") {
			event.stopPropagation();
	
			if (target.style.backgroundColor != "") {
				return;
			}

			doMove(target);
		}

	}

// My plan is reorganize this func later
// checker gamers on existance soon
	function initial(isNew){

		t = new Table(side);

		players = [];

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

	}

	return {
		init: initial,
		move: doMove
	}
};

export {Game};