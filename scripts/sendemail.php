<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);


function generatePassword($length=9, $strength=0) {
    // Thank you, http://www.webtoolkit.info/php-random-password-generator.html
	$vowels = 'aeuy';
	$consonants = 'bdghjmnpqrstvz';
	if ($strength & 1) {
		$consonants .= 'BDGHJLMNPQRSTVWXZ';
	}
	if ($strength & 2) {
		$vowels .= "AEUY";
	}
	if ($strength & 4) {
		$consonants .= '23456789';
	}
	if ($strength & 8) {
		$consonants .= '@#$%';
	}
 
	$password = '';
	$alt = time() % 2;
	for ($i = 0; $i < $length; $i++) {
		if ($alt == 1) {
			$password .= $consonants[(rand() % strlen($consonants))];
			$alt = 0;
		} else {
			$password .= $vowels[(rand() % strlen($vowels))];
			$alt = 1;
		}
	}
	return $password;
}

   $newpwd = generatePassword(9,8);
   echo "<p>PWD: $newpwd</p>";

	$user = $_GET['user'];
	$user = "dw";
	
	$dbh = mysql_connect("127.0.0.1","david","nn");
	if (!mysql_select_db("noterio")) {
		echo "Error found: " .  mysql_error ();
		return;
	}
	
	// get the email address
	$query = "SELECT email FROM users WHERE  username='$user' LIMIT 1";
	$res = mysql_query($query,$dbh);
   		if (!$res){
   			echo mysql_error();
   			return;
   			}
   	$row = mysql_fetch_assoc($res); 
	$addy = $row['email'];	
	echo "<p>email: $addy</p>";	
 	$subject = "Noter.io password reset";
 	$body = "Dear $user,\n\nTo reset your Noter.io password, go to http://www.noter.io/pwdreset.html and enter the temporary pwd: $newpwd\n\nYour pals at Noter.io";
 if (mail($addy, $subject, $body)) {
   echo("<p>Message successfully sent!</p>");
   // update the password
   $query = "UPDATE users SET password='$newpwd' WHERE username='$user'";
   $res = mysql_query($query,$dbh);
  } else {
   echo("<p>Message delivery failed...</p>");
  }
 ?>