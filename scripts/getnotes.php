<?php
	
    $database_name =  "noterio";
    $table_name  = "notes";
    $bookid = $_POST['bookid'];
 
    
	$dbh = mysql_connect("127.0.0.1","david","nn");
	$link = (mysql_select_db($database_name));
	
	$query = "SELECT * FROM notes WHERE bookid='" . $bookid . "'";
	//$query = "SELECT * FROM notes WHERE bookid='39'" ;
	
	$res = mysql_query($query, $dbh);
	$resp="";
	
	if (!$res) {
		echo mysql_errno().": ". mysql_error ()."";
		return 0;
		}
	
	$arrayofrows = array();
	// cycle through the returned rows
	while ($therow = mysql_fetch_array($res)) {
		extract ($therow);
		$rowarray = array();
		$rowarray['noteid'] = $noteid;
		$rowarray['content'] = $content;
		$rowarray['bookid'] = $bookid;
		$rowarray['page'] = $page;
		$rowarray['tagstring'] = $tagstring;
		$rowarray['rating'] = $rating;
		// add this row to the arrayofrows
		array_push($arrayofrows, $rowarray);
	 }

	echo json_encode($arrayofrows);
	
	
?>