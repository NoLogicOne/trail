import {Logger}    from './logger.js';
import {Gamer}     from "./Gamer.js";

var Game = function(){
	
	var players = [new Gamer("Igor", "#ff0000"), new Gamer("Ivan", "#00ff00")];

	var currentIndex = 0;

	function toggleCurrent(){
		currentIndex++;

		Logger.log("now it's a " + players[currentIndex].getName() + " turn");
	}

	function initial(){

	}

	return {
		 
	}
};

export {Game};