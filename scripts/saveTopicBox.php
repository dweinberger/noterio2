<?php

 error_reporting(E_ALL);
ini_set("display_errors", 1);

	$project = $_POST['project'];
	$user = $_POST['user'];
	$name = $_POST['name'];
	$json = $_POST['json'];
	
	$dbh = mysql_connect("127.0.0.1","david","nn");
	if (!mysql_select_db("noterio")) {
		echo "Error found: " .  mysql_error ();
		return;
	}
	
	// mark all as invisible. Later we'll mark existing ones as visible
	$query = "UPDATE playlistentries SET visible = 0"
	$res = mysql_query($query,$dbh);
   		if (!$res){
   			echo mysql_error();
   			}

	// decode the json
	$j = json_decode($json,true);
//	echo $name . $user . $project;
	
	
	foreach($j as $noteobj){
		$bid= $noteobj["bookid"];
		$nid = $noteobj["noteid"];
		echo $nid;
		$query = "INSERT IGNORE into playlistentries(title,noteid,bookid,user,project,visibility) values('$name', '$nid','$bid','$user','$project','1');";
   		// Note: for this to work, playlistentries needs a second and unique index:
   		// alter table playlistentries ADD UNIQUE KEY noteidtitle (noteid,title(100))
   		// the IGNORE then causes it to reject dupes without an error msg
   		$res = mysql_query($query,$dbh);
   		if (!$res){
   			echo mysql_error();
   			}
	}
	

	return 
	

?>

