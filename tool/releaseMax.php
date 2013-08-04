<?php
include_once "compress.php";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Release JS</title>
<meta name="author" content="" />

<style>
	* {
		padding: 0;
		margin: 0;
	}
	html, body {
		width: 100%;
		height: 100%;
		font-family: "Century Gothic";
		background-color: #f9f9f9;
		overflow: auto;
	}
	.wrapper {
		width: 800px;
		margin-left: auto;
		margin-right: auto;
		background-color: #fff;
		border: 1px solid #e9e9e9;
		margin-top: 50px;
		padding: 20px;
	}
	.header {
		width: 100%;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.header h1 {
		color: #404040;
		width: 100%;
		text-align: center;
		font-weight: normal;
		font-size: 50px;
	}
	.header h1 .blue {
		color: #6DBDD6;
		font-size: 60px;
	}
	h2 {
		color: #666666;
		margin-bottom: 20px;
		width: 100%;
		border-bottom: 1px solid #e9e9e9;
	}
	.list {
		width: 100%;
		border-bottom: 1px solid #e9e9e9;
		padding-bottom: 20px;
		margin-bottom: 20px;
	}
	.msg {
		color: #B71427;
	}
	.folder {
		color: #558C89;
	}
	.file {
		color: #D9853B;
	}
	.footer {
		width: 800px;
		margin-left: auto;
		margin-right: auto;
		padding-top: 20px;
		padding-bottom: 50px;
	}
	.footer p {
		font-size: 11px;
		color: #666666;
	}
	.footer a {
		text-decoration: none;
		color: #666666;
	}
	.footer a:hover {
		color: #000;
	}

</style>
</head>

<body>
<div class="wrapper">
<div class="header">
<h1>Release JS</h1>
</div>
<h2>List of Concatenated Files</h2>
<div class="list">
<?php
$compress = new Compress();
$compress->addFolder("../lib/com/utensil/");
$compress->addFolder("../lib/com/fahimchowdhury/");
$compress->releaseURL="../release/";
$compress->archiveURL="../release/archive/";
$compress->releasePrefix="toolkitMax-v";
$compress->addToIgnoreFile("PIE.js");
$compress->addToIgnoreFile("TouchController.js");
$compress->addToIgnoreFile("DebugTest.js");
$compress->addToIgnoreFolder("report");
$compress->addToIgnoreFolder("media");
$compress->addToIgnoreFolder("game");
$compress->init();


$html = file_get_contents("release_test.html");
$html = str_replace("toolkitMax-v".($compress->version-$compress->versionIncrement).".js","toolkitMax-v".($compress->version).".js",$html);
file_put_contents("release_test.html", $html);
?>
</div>
<p class="msg">
<!-- Please Delete 'setup.php' -->
</p>
</div>
<?php
/*
 $data=file_get_contents("jasmine/jasmine.js");
 $data = str_replace(array("\n"),"|_|",$data);
 $autoProjectSetup->makeFile("temp.js",$data);
 */
?>
<div class="footer">
<p>
github: <a href="https://github.com/fahimc" >https://github.com/fahimc</a>
</p>
</div>
</body>
</html>
