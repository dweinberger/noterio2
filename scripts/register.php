<?php

error_reporting(E_ALL);
error_reporting (E_ALL ^ E_NOTICE);
ini_set("display_errors", 1);

	$user = $_POST['user'];
	$password = $_POST['password'];
	$email = $_POST['email'];
	//date_default_timezone_set('EST/-5.0/no DST');
	//$currentdate = DATE("Y-m-d H:i:s");
	if (isset($password) == false) {
		echo "++ERROR: Password required";
		return;
		}
    if (isset($email) == false) {$email="";}
 
    
	$dbh = mysql_connect("127.0.0.1","david","nn");
	(mysql_select_db("noterio"));
	if (!mysql_select_db("noterio")){
		echo "++ERROR: Could not connect database: notio";
		return;
	}
	
	// check for existing registration
	$query = "SELECT * from users where username='$user'";
	$res = mysql_query($query, $dbh);
	if (!$res) {
		echo "++ERROR: Problem with query: $query. Error: " . mysql_error(); 
		return ;
		}
	
	
	// does it  exist?
	if (mysql_num_rows($res) > 0) {
		echo "++ERROR: $user name is taken. Please try again.";
	}
	else { // the user doesn't exist, so register	
		$query = "INSERT INTO users (username, password, email) VALUES ('$user', '$password', '$email')";
		$res = mysql_query($query, $dbh);
		if (!res){
			echo "++ERROR: Registration failed.";
			return;
		}
		echo "Registration successful. $user $password $email";
		}
  
?>