<?php
// return list of how many notes for each bookid

	$database_name =  "noterio";
	$dbh = mysql_connect("127.0.0.1","david","nn");
	
	

	if (!mysql_select_db($database_name)) {
		echo mysql_errno().": ". mysql_error ()."";
		return;
		}
		
		
		$query = "SELECT bookid, COUNT(*) FROM notes GROUP BY bookid; ";
				
		$res = mysql_query ($query,$dbh);
		
		if (!$res) {
			echo mysql_errno().": ". mysql_error () . "";
			return;
		} 
		
		
		   $arrayofrows = array();
			while ($therow = mysql_fetch_array($res)) {
				extract ($therow);
				// get all the values for this row
				$rowarray = array();
				//printf ("<p>%s %s retrieved from database.<BR>",
				$rowarray['bookid'] = $bookid;
				$rowarray['count'] = $therow[1];
				// add this row to the arrayofrows
				array_push($arrayofrows, $rowarray);
			}
			 

echo json_encode($arrayofrows);
		
?>

