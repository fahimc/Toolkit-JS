<?php
Class Compress {
	const versionURL = "version.txt";
	public $folderURLs = array();
	public $releaseURL = "";
	public $archiveURL = "";
	public $releasePrefix = "";
	private $ignore_folders = array();
	private $ignore_files = array();
	public $data = "";
	public $version = 0;
	public $versionIncrement = 1;
	private $currentIndex = 0;
	private $itemCollection = array();
	private $nonDependantIndex=0;
	public function init() {
		$this -> hasNext($this -> currentIndex);
		$this -> getVersion();
		$this->createUncompressed();
			$this->updateVersion();
			$this->archive();
		// $this -> debug();
	}

	public function addToIgnoreFile($val) {
		array_push($this -> ignore_files, $val);
	}

	public function addToIgnoreFolder($val) {
		array_push($this -> ignore_folders, $val);
	}

	public function addFolder($val) {
		array_push($this -> folderURLs, $val);
	}

	private function hasNext($index) {

		if (count($this -> folderURLs) <= $index)
			return;
		$done = $this -> getFiles($this -> folderURLs[$index]);
		if ($done) {
			$this -> currentIndex++;
			$this -> hasNext($this -> currentIndex);
		}
	}

	private function getFiles($src) {
		
		$dir = opendir($src);
		@mkdir($dst);
		//echo "<p class='" . ("folder") . "'>" . ($src) . "</p>";
		while (false !== ($file = readdir($dir))) {
			$exclude = false;
			for ($a = 0; $a < count($this -> ignore_folders); $a++) {

				if ($file == $this -> ignore_folders[$a])
					$exclude = true;
			}

			if (!$exclude && ($file != '.') && ($file != '..')) {
				if (is_dir($src . '/' . $file)) {
					$this -> getFiles($src . '/' . $file);
				} else {
					$exclude = false;
					for ($a = 0; $a < count($this -> ignore_files); $a++) {

						if ($file == $this -> ignore_files[$a])
							$exclude = true;
					}
					if (!$exclude) {
						$copy = trim(file_get_contents($src . '/' . $file));
						if (substr($copy, -1) == "}")
							$copy .= ";";

						$this -> checkDependancies($copy);

						//$this -> data .= $copy;
						//copy($src . '/' . $file, $dst . '/' . $file);
						echo "<p class='" . ("file") . "'>" . ($file) . "</p>";
					}
				}
			}
		}
		closedir($dir);
		return true;
	}

	private function checkDependancies($data) {
		$allMatches = array();

		$item = new DependancyItem();
		$item -> data = $data;
		$regex = '#Class.extend\((([^()]+|(?R))*)\)#';
		if (preg_match_all($regex, $data, $matches)) {
			for ($a = 0; $a < count($matches); $a++) {
				$arr = explode(",", $matches[$a][0]);
				if (!$item -> className)
					$item -> className = str_replace("Class.extend(", "", $arr[0]);
				$arr[1] = str_replace(")", "", $arr[1]);
				$item -> dependancies[trim($arr[1])] = trim($arr[1]);
				//array_push($item->dependancies,str_replace(")","",$arr[1]));
			}
		}

		$regex = '#Class.implement\((([^()]+|(?R))*)\)#';
		if (preg_match_all($regex, $data, $matches)) {
			for ($a = 0; $a < count($matches); $a++) {
				$arr = explode(",", $matches[$a][0]);
				if (!$item -> className)
					$item -> className = str_replace("Class.implement(", "", $arr[0]);
				$arr[1] = str_replace(")", "", $arr[1]);
				$item -> dependancies[trim($arr[1])] = trim($arr[1]);
				// array_push($item->dependancies,str_replace(")","",$arr[1]));
			}
		}

		if ($item -> className)
		{
			$this -> addItem($item);			
		}else{
			$dItem = new DependancyItem();
				$dItem -> className = "non-".$this->nonDependantIndex;
				$dItem->data = $data;
				$this->array_insert($this -> itemCollection, $dItem,$this->nonDependantIndex);
			$this->nonDependantIndex++;
		}
	}

	private function getVersion() {
		$this -> version = floatval(file_get_contents(Compress::versionURL));
		$this -> version = str_replace(".","",$this -> version + $this -> versionIncrement);
	}

	private function createUncompressed() {
		for ($a = 0; $a < count($this -> itemCollection); $a++) {
		
			$this -> data.=$this -> itemCollection[$a]->data;
		}
		file_put_contents($this -> releaseURL . $this -> releasePrefix . str_replace(".","",$this -> version) . ".js", $this -> data);

	}

	private function updateVersion() {
		file_put_contents(Compress::versionURL, $this -> version);
	}
	private function archive() {
		
		if($this->archiveURL)
		{
			file_put_contents($this->archiveURL.$this->releasePrefix.($this->version-$this->versionIncrement).".js", file_get_contents($this->releaseURL.$this->releasePrefix.($this->version-$this->versionIncrement).".js"));
			unlink($this->releaseURL.$this->releasePrefix.($this->version-$this->versionIncrement).".js");
		}
	}

	private function addItem($item) {
		//echo "Current Item ".$item->className."<br>";
		$newDepCollection = array();
		//check if dependancies exist
		foreach ($item->dependancies as $key) {

			//check if current item is in  list
			$found = false;
			for ($b = 0; $b < count($this -> itemCollection); $b++) {
				if ($this -> itemCollection[$b] -> className == $item -> dependancies[$key]) {
					$found = true;
				}
			}
			//if not found add
			if (!$found) {
				$dItem = new DependancyItem();
				$dItem -> className = $item -> dependancies[$key];
				
				array_push($newDepCollection, $dItem);
			}
		}

		$state = "new";
		$stateIndex = -1;
		for ($a = 0; $a < count($this -> itemCollection); $a++) {
			$currentItem = $this -> itemCollection[$a];
			//echo "<br>CHECKING " . $currentItem -> className . "<br>";
			//check if current item is in depenadancy list

			if ($currentItem -> dependancies) {
				foreach ($currentItem->dependancies as $dependancies) {
					if ($item -> className == $currentItem -> dependancies[$key]) {
						$state = "splice";
						$stateIndex = $a - 1;
					}
				}
			}
			//check if item already in list but not added completely
			if ($currentItem -> className == $item -> className) {
					//echo "<br>EXISTS " . $currentItem -> className . "<br>";
				$this -> itemCollection[$a] = $item;
				$state = "exists";
			}
		}

		//add item to array and check if it needs to be added before
		switch($state) {
			case "new" :
				array_push($this -> itemCollection, $item);
				if (count($newDepCollection) > 0)
					$this -> addDependancy($newDepCollection, count($this -> itemCollection) - 1);

				break;
			case "splice" :
				$this->array_insert($this -> itemCollection, $item,$stateIndex);
				if (count($newDepCollection) > 0)
					$this -> addDependancy($newDepCollection, $stateIndex);
				break;
			case "exists" :
				if (count($newDepCollection) > 0)
					$this -> addDependancy($newDepCollection, $stateIndex);
				break;
		}

		
	}

	private function addDependancy($collection, $index) {
		
		if ($index - 1 < 0)
			$index = $this->nonDependantIndex;
		for ($c = 0; $c < count($collection); $c++) {
			
			$this->array_insert($this -> itemCollection, $collection[$c],$index);
		}
		
		
	}

	private function debug() {
		echo "<br>-----------DEBUG START---------<br>";
		for ($a = 0; $a < count($this -> itemCollection); $a++) {
			echo "debug: " . $this -> itemCollection[$a] -> className . "<br>";
		}
		echo "<br>-----------DEBUG END---------<br>";
	}

	private function array_insert(&$array, $element, $position = null) {
		if (count($array) == 0) {
			$array[] = $element;
		} elseif (is_numeric($position) && $position < 0) {
			if ((count($array) + position) < 0) {
				$array = array_insert($array, $element, 0);
			} else {
				$array[count($array) + $position] = $element;
			}
		} elseif (is_numeric($position) && isset($array[$position])) {
			$part1 = array_slice($array, 0, $position, true);
			$part2 = array_slice($array, $position, null, true);
			$array = array_merge($part1, array($position => $element), $part2);
			foreach ($array as $key => $item) {
				if (is_null($item)) {
					unset($array[$key]);
				}
			}
		} elseif (is_null($position)) {
			$array[] = $element;
		} elseif (!isset($array[$position])) {
			$array[$position] = $element;
		}
		$array = array_merge($array);
		return $array;
	}

}

Class DependancyItem {
	public $className = null;
	public $dependancies = array();
	public $data = null;
}
?>
