<?php

 error_reporting(E_ALL);
ini_set("display_errors", 1);

	$project = $_POST['project'];
	$user = $_POST['user'];
	$name = $_POST['title'];
	
	$dbh = mysql_connect("127.0.0.1","david","nn");
	// no database connection
	if (!mysql_select_db("noterio")) {
		echo mysql_errno().": ". mysql_error ()."";
		return;
		}

			 
	 //$query = "INSERT into playlists(name,user,project) values('$name','$user','$project');";
	// submit the query
	$query="Select id from playlists where title='$name' and user='$user' and project='$project';";
	$res = mysql_query ($query,$dbh);
	// error?
	if (!$res) {
			echo "<p>ERROR CREATING TOPIC BOX:<br>Query:" . $query . "<br>SQL error: " . mysql_errno().": ". mysql_error ()."";
			return -1;
	} 
	// does the project name already exist?
	if (mysql_num_rows($res) > 0) {
		$resp = "ALREADY EXISTS";
		}
	else {
	    $query ="INSERT into playlists(title,user,project) values('$name','$user','$project');";
		$res = mysql_query ($query,$dbh);
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

