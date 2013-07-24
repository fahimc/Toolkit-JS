<?php
Class ErrorReporter {
	const POST_URL = "url";
	const POST_MESSAGE = "msg";
	const LOG_URL = "error.log";
	private $url = "";
	private $message = "";
	public function init() {
		$this -> checkPOST();
	}

	private function checkPOST() {
		$this -> url = stripcslashes($_POST[ErrorReporter::POST_URL]);
		$this -> message = stripcslashes($_POST[ErrorReporter::POST_MESSAGE]);

		$date = new DateTime();
		$dateString =  $date -> format('Y-m-d H:i:s');

		if (isset($this -> url) && isset($this -> url)) {
			$file = fopen(ErrorReporter::LOG_URL, "a");
			fwrite($file, $dateString." ".$this -> message . "\n");
			fclose($file);
			echo "complete";
		} else {
			echo "error";
		}
	}

}

$errorReporter = new ErrorReporter();
$errorReporter -> init();
?>