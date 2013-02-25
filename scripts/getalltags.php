<?php
	
    $project = $_POST['project'];
    $user = $_POST['user'];
	$database_name =  "noterio";
	
 
    
	$dbh = mysql_connect("127.0.0.1","david","nn");
	(!mysql_select_db("noterio"));
	
	if ($project != "") {
		$query="SELECT * FROM tags WHERE  bookid IN (SELECT bookid  FROM books where project='$project') AND bookid IN (SELECT bookid from books WHERE user='$user')";
	}
	else {
		$query = "SELECT * FROM tags";
	}
     //$query = "SELECT * FROM tags";	
	
	$res = mysql_query($query, $dbh);
	$resp="";
	
	if (!$res) {
		echo mysql_errno().": ". mysql_error ()."";
		return 0;
		}
	
 
	$arrayofrows = array(); // container array
	while ($therow = mysql_fetch_array($res)) {
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