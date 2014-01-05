<?php

 // mysqli version
  // dec. 28, 2013
  // see http://www.pontikis.net/blog/how-to-use-php-improved-mysqli-extension-and-why-you-should
	
 error_reporting(E_ALL);
ini_set("display_errors", 1);

	$project = $_POST['project'];
	$user = $_POST['user'];
	$name = $_POST['title'];
	
	$dbh = new mysqli('127.0.0.1','david','nn','noterio');
	if ($dbh->connect_error > 0){
	 	die('Unable to connect to database [' . $dbh->connect_error . ']');
	 }

			 
	 //$query = "INSERT into playlists(name,user,project) values('$name','$user','$project');";
	// submit the query
	$query="Select id from playlists where title='$name' and user='$user' and project='$project';";
	$res = $dbh->query($query);
	// error?
	if($res === false) {
  		trigger_error('Wrong SQL: ' . $query . ' Error: ' . $dbh->error, E_USER_ERROR);
  		return -1;
	}  
	
	
	// does the project name already exist?
	   // count rows
 		 $rows_returned = $res->num_rows;
	if ($rows_returned > 0) {
		$resp = "ALREADY EXISTS";
		}
	else {
	    $query ="INSERT into playlists(title,user,project) values('$name','$user','$project');";
		$res = $dbh->query($query);
		// error?
		if (!$res) {
			$resp = "Error creating topic box: name=$name project=$project user=$user";
		}
		else {
			$resp = "SUCCESS";
		}
	}


  echo $resp;
?>

