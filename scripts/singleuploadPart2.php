<?php

// uploads a single file with a known bookid to update/replace it

error_reporting(E_ALL);
error_reporting (E_ALL ^ E_NOTICE);

ini_set("display_errors", 0);
ini_set('auto_detect_line_endings',true); // helps mac recognize unix line endings


$bid = $_REQUEST["bookid"];

$dbh = mysql_connect("127.0.0.1","david","nn");

	if (!mysql_select_db("noterio")) {
		echo mysql_errno().": ". mysql_error ()."";
		echo "bad db";
		return;
		}

$debugit=true;
function debugprt($txt){
  // prints debug info. Lower the level the less prints. Higher = more inclusive
  // give a high number to minor comments
  $debug= true; 
  if ($debug){
    error_log($txt);
   echo "<p>" . $txt;
  }
}

debugprt("------------------------ SINGLE UPLOAD---------------");

$s = ""; 
$sd= "";


	$originalorder = 0;
	$tmpnamepath = $_FILES['userfiles']['tmp_name'][0];
	 debugprt("temppath: " . $tmpnamepath);
	$realname =  $_FILES['userfiles']['name'][0];
	debugprt("realname= " . $realname);
    $ext = pathinfo($realname, PATHINFO_EXTENSION);
    debugprt("ext=" . $ext);
    
    

debugprt("------------------OUT OF Multi-----");

?>
