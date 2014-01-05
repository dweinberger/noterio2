<?php

    $project =  $_POST['project'];
    $user =  $_POST['user'];
	$noteid =  $_POST['noteid'];
	
 
    $dbh = new mysqli('127.0.0.1','david','nn','noterio');
	if ($dbh->connect_error > 0){
	 	die('Unable to connect to database [' . $dbh->connect_error . ']');
	 }
	
	
	 $query = "DELETE FROM notes WHERE noteid='" . $noteid . "'";	
	
	$res = $dbh->query($query);
	
	
	if($res === false) {
  		trigger_error('Wrong SQL: ' . $query . ' Error: ' . $dbh->error, E_USER_ERROR);
	    $status = 'Wrong SQL: ' . $query . ' Error: ' . $dbh->error;
	} 
	else {
		$status = "Success";
	}
	
	echo($status);

?>