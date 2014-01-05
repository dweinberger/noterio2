<?php

  // mysqli version
  // dec. 28, 2013
  // see http://www.pontikis.net/blog/how-to-use-php-improved-mysqli-extension-and-why-you-should
	
    $project = $_POST['project'];
    $user = $_POST['user'];
	$database_name =  "noterio";
	
 
    $dbh = new mysqli('127.0.0.1','david','nn','noterio');
	if ($dbh->connect_error > 0){
	 	die('Unable to connect to database [' . $dbh->connect_error . ']');
	 }
	
	if ($project != "") {
		$query="SELECT * FROM tags WHERE  bookid IN (SELECT bookid  FROM books where project='$project') AND bookid IN (SELECT bookid from books WHERE user='$user')";
	}
	else {
		$query = "SELECT * FROM tags";
	}
     //$query = "SELECT * FROM tags";	
	
	$res = $dbh->query($query);
	$resp="";
	
	if($res === false) {
  		trigger_error('Wrong SQL: ' . $query . ' Error: ' . $dbh->error, E_USER_ERROR);
	} 
	
 
	$arrayofrows = array(); // container array
	$res->data_seek(0);
	while ($therow = $res ->fetch_array(MYSQLI_ASSOC)) {
		extract ($therow);
		// get all the values for this row
		$rowarray = array();
		$rowarray['tag'] = trim($tag);
		$rowarray['noteid'] = trim($noteid);
		$rowarray['bookid'] = trim($bookid);
		// add this row to the arrayofrows
		array_push($arrayofrows, $rowarray);
	 }

// Alphabetizes based on "tag" 
// thank you  http://www.the-art-of-web.com/php/sortarray/	 
function compare_tags($a, $b) { 
	return strnatcmp($a['tag'], $b['tag']); 
} 

usort($arrayofrows, 'compare_tags'); 



echo json_encode($arrayofrows);

?>