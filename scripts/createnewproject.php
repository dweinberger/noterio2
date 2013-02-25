<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);


	$project_name =  $_POST['project'];
   	$desc = $_POST['description'];
   	$user = $_POST['user'];
   	   
    $dbh = mysql_connect("127.0.0.1","david","nn");
	$link = mysql_select_db("noterio");
	mysql_set_charset('utf8');
	// escape the data ... must come AFTER database connected!
	$project_name = mysql_real_escape_string($project_name);//,ENT_COMPAT,'utf-8');
   	$desc = mysql_real_escape_string($desc);
   	error_log("Proj: " . $project_name . " DESC: " . $desc);
	
	// check for existing project
	$query = "SELECT * from projects where user='$user' AND name='$project_name'";
	$res = mysql_query($query, $dbh);
	if (!$res) {
		echo "++ERROR: Problem with query: $query. Error: " . mysql_error(); 
		return ;
		}
	
	
	// does it  exist?
	if (mysql_num_rows($res) > 0) {
		echo "++ERROR: The name '$project_name' name is already in use. Please try again.";
		return;
	}
	

	$query = "Insert into projects (name,description,user) VALUES ('$project_name','$desc','$user')";
	error_log($query);
	$res = mysql_query($query, $dbh);
	
	
echo $res;  
echo $project_name . $desc . $user;
?>



