<?php

error_reporting(E_ALL);
error_reporting (E_ALL ^ E_NOTICE);
ini_set("display_errors", 1);

	$user = $_POST['user'];
	$password = $_POST['password'];
	$email = $_POST['email'];
	
	// debug
	//$user="dw";
	//$password = 'nn';
	
	// notio.js checks for username and pwd. No need to do it here.
	
    if (isset($email) == false) {$email="";}
 
    date_default_timezone_set('America/New_York');;
    $currentdate = DATE("Y-m-d H:i:s");
    
	$dbh = mysql_connect("localhost","david","nn");
	(mysql_select_db("noterio"));
	if (!mysql_select_db("noterio")){
		echo "++ERROR: Could not connect database: noterio";
		return;
	}
	
	$query = "SELECT * from users where username='$user' and password='$password'";
	$res = mysql_query($query, $dbh);
	$resp="";
	
	if (!$res) {
		echo "++ERROR: Problem with query: $query. Error #" . mysql_errno() . ": ". mysql_error (); 
		return ;
		}
	
	// does it not exist?
	if (mysql_num_rows($res) == 0) {
		echo "++ERROR: Wrong user name or password.";
		return;
	}

	
echo "Login successful."
  
?>