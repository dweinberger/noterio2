<?php

 error_reporting(E_ALL);
ini_set("display_errors", 1);

	$project = $_POST['project'];
	$user = $_POST['user'];
	$title = $_POST['title'];
	
	$dbh = mysql_connect("127.0.0.1","david","nn");
	if (!mysql_select_db("noterio")) {
		echo "Error found: " .  mysql_error ();
		return;
	}
	
	$query = "DELETE FROM playlists WHERE title='$title' AND project='$project' AND user='$user'";
	$res = mysql_query($query,$dbh);
   		if (!$res){
   			echo mysql_error();
   			
   			}


echo "SUCCESS";	

?>

