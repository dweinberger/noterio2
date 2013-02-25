<?php

 error_reporting(E_ALL);
ini_set("display_errors", 1);

	$project = $_POST['project'];
	$user = $_POST['user'];
	$title = $_POST['title'];
	$noteid = $_POST['noteid'];
	$bookid = $_POST['bookid'];
	
	echo $title . $noteid;
	
	$dbh = mysql_connect("127.0.0.1","david","nn");
	if (!mysql_select_db("noterio")) {
		echo "Error found: " .  mysql_error ();
		return;
	}
	
	$query = "INSERT into playlistentries(noteid,bookid,title,user,project) values('$noteid','$bookid','$title','$user','$project');";
		
	
	$res = mysql_query($query,$dbh);
   		if (!$res){
   			echo mysql_error();
   			
   			}


echo "SUCCESS";	

?>

