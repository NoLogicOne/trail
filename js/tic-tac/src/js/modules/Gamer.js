var Gamer = function(name, color){
	var name  = name,
		color = color; 


	return {
		getName : () => {return name},
		getColor : () => {return color}
	}
};

export {Gamer};