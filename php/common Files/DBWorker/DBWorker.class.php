<?
class DBWorker {
	private $host = 'localhost';
	private $dbname = 'postgree_soon';
	private $user = 'root';
	private $pass = '';
	
	private $connector;

	public $instance;

	private function __construct(){
		$this->connector = mysqli_connect($this->host, $this->user, $this->pass, $this->dbname);
	}

	static function getInstance(){
		if(empty($instance)){
			$instance = new self();
		}
		return $instance;
	}

	function getLimitGoods($limit_start, $limit_end){
		$query = "SELECT * FROM goods LIMIT $limit_start, $limit_end";

		while ($row = mysqli_fetch_assoc($res)) {
		    array_push($array, $row);
		}

		return $array;
	}
}