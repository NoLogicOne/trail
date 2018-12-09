import "../scss/style.scss";

var table = document.getElementById('t');
var rows  = document.getElementsByTagName("tr");
var cell  = document.getElementsByClassName("c")[0];

// cell.style = {color: "green"};
// console.dir(cell);

// table.classList.add("a");
// cell.style.color = "green";

// table.firstChild.classList.add("a");
[].map.call(rows, function(item) {
	item.classList.add("a");
});

// cell.parentNode.parentNode = create("div", {color: "green"});
// console.dir(table.firstChild);