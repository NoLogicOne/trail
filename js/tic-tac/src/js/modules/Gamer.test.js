var assert = require('assert');

var Gamer = require("./Gamer.js");
var G = new Gamer();

describe("Test", function(){
	describe("GET ./Gamer.js", function(){
		it("tester", function(){
			assert(2==2);
		});
		it("anti-tester", function(){
			assert.equal(typeof G, 'object');
		});
	})	
})