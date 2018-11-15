var Gamer = function(name, color){
	var name  = name,
		color = color;

	function getPlayerCells(virtualTable){
		let result = [name];

		for (var i = 0; i < virtualTable.length; i++) {
			if(virtualTable[i] == parseColor(color)){
				result.push(i);
			}
		}

		return result;
	}

	function parseColor(str){
		let color = str.slice(1);
		let colors = [
			color.substr(0, 2),
			color.substr(2, 2),
			color.substr(4, 2)
		];

		return "rgb(" 
				+ parseInt(colors[0], 16) + ", " 
				+ parseInt(colors[1], 16) + ", "
				+ parseInt(colors[2], 16)
				+ ")"; 
	}


	return {
		getName : () => {return name},
		getColor : () => {return color},
		getCells : getPlayerCells
	}
};

module.exports = Gamer;