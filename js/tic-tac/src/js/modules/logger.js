var Logger = (function(){
	var LOG = document.getElementById("log");
	
	document.getElementById("clear_log").addEventListener("click", clear);
	
	function clear(){
		LOG.innerHTML = ""
	}

	return {
		log : (str, status)=>{
			let stat = status || "success";
			let res = "<div class='message " + stat + "'>" + str + "</div>";
			LOG.innerHTML = res + LOG.innerHTML;
		},
		clearLog : clear 
	}
})();

export {Logger};
/*
function that write messages in log's window
@str - message for a log
@status - success, warning or error
          success is default value 
*/
