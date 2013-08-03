<?php
Class Compress
{
	const versionURL="version.txt";
	public $folderURLs=array();
	public $releaseURL="";
	public $releasePrefix="";
	private $ignore_folders=array();
	private $ignore_files=array();
	public $data="";
	public $version=0;
	public $versionIncrement=0.1;
	private $currentIndex=0;
	public function init()
	{
		$this->hasNext($this->currentIndex);
		$this->getVersion();
		//$this->createUncompressed();
	//	$this->updateVersion();
	}
	public function addToIgnoreFile($val)
	{
		array_push($this->ignore_files,$val);
	}
	public function addToIgnoreFolder($val)
	{
		array_push($this->ignore_folders,$val);
	}
	public function addFolder($val)
	{
		array_push($this->folderURLs,$val);
	}
	private function hasNext($index)
	{
		
		if(count($this->folderURLs)<=$index)return;
		$done = $this->getFiles($this->folderURLs[$index]);
		if($done)
		{
			$this->currentIndex++;
			$this->hasNext($this->currentIndex);
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
					if(!$exclude){
						$copy = trim(file_get_contents($src . '/' . $file));
						if(substr($copy,-1)=="}")$copy.=";";
						
						
						$this->checkDependancies($copy);
						
						$this->data .=$copy;
						//copy($src . '/' . $file, $dst . '/' . $file);
					// echo "<p class='" . ("file") . "'>" . ($file) . "</p>";
					}
				}
			}
		}
		closedir($dir);
		return true;
	}
	private function checkDependancies($data)
	{
		$allMatches=array();
		
		$item = new DependancyItem();
		$item->data=$data;
		$regex = '#Class.extend\((([^()]+|(?R))*)\)#';
		if (preg_match_all($regex, $data ,$matches)) {
			for($a=0;$a<count($matches);$a++)
			{
				$arr=explode(",", $matches[$a][0]);
				if(!$item->className)$item->className =  str_replace("Class.extend(","",$arr[0]);
				$arr[1]=str_replace(")","",$arr[1]);
				$item->dependancies[$arr[1]]=$arr[1];
				 //array_push($item->dependancies,str_replace(")","",$arr[1]));
			}
		} 
		
		$regex = '#Class.implement\((([^()]+|(?R))*)\)#';
		if (preg_match_all($regex, $data ,$matches)) {
		 for($a=0;$a<count($matches);$a++)
			{
				$arr=explode(",", $matches[$a][0]);
				if(!$item->className)$item->className =  str_replace("Class.implement(","",$arr[0]);
				$arr[1]=str_replace(")","",$arr[1]);
				$item->dependancies[$arr[1]]=$arr[1];
				// array_push($item->dependancies,str_replace(")","",$arr[1]));
			}
		} 
		
		if(count($item->dependancies)>0)var_dump($item);
	}
	private function getVersion()
	{
		$this->version=floatval(file_get_contents(Compress::versionURL));
		$this->version=$this->version+$this->versionIncrement;
	}
	private function createUncompressed()
	{
		file_put_contents($this->releaseURL.$this->releasePrefix.$this->version.".js",$this->data);
		
	}
	private function updateVersion()
	{
		file_put_contents(Compress::versionURL,$this->version);
	}
}

Class DependancyItem
{
	public $className=null;
	public $dependancies=array();
	public $data = null;
}
?>
