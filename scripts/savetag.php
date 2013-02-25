<?php

 error_reporting(E_ALL);
ini_set("display_errors", 1);

	$project = $_POST['project'];
	$user = $_POST['user'];
	$tagstring = $_POST['tagstring'];
	$bookid = $_POST['bookid'];
	$noteid = $_POST['noteid'];
	
	$dbh = mysql_connect("127.0.0.1","david","nn");
	if (!mysql_select_db("noterio")) {
		echo mysql_errno().": ". mysql_error ()."";
		}
		else {

			if ($tagstring != ""){
			   $tagarray = explode(",",$tagstring); // turn it into an array
			   $valuestring = ""; // build a string of values
			   // query = "insert into tags (tag, noteid, bookid) values (tag1,noteid,etc.),(tag2,noteid2,etc.);"
			   foreach($tagarray as $tag){
			      $valuestring = $valuestring . "('" . $tag . "','" . $noteid . "','" . $bookid . "'),";
			    }
			    // it now has an extra comma at the end of it
			    $valuestring = substr_replace($valuestring ,"",-1);
			    $query = "INSERT into tags(tag,noteid,bookid) values ".  $valuestring . ";";
			   // submit the query
			    $res = mysql_query ($query,$dbh);
						if (!$res) {
								echo "<p>ERROR POSTING TAG:<br>Query:" . $query . "<br>SQL error: " . mysql_errno().": ". mysql_error ()."";
								return -1;
							} else {
			         			$res = $valuestring;
			   						}				
					}
  				}



  echo $res;
?>

