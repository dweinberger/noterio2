<?php
   
//This is the information we initialize the database with.
	$database_name =  $_POST['gdatabase'];
    $table_name = "books";
	$title = $_POST['title']; 
	$author = $_POST['author'];
   //$title = "Tasdasdf ds asdf"; // DEBUG

	$dbh = mysql_connect("127.0.0.1","david","nn");

	if (!mysql_select_db($database_name)) {
		echo "++ ERROR: " . mysql_errno().": ". mysql_error ()."";
		}
		else {	
		
		//$title = mysql_real_escape_string($title);
		
		//$query = "SELECT bookid FROM books WHERE title='" . $title . "' AND author='" . $author . "'";
		$query = "SELECT bookid FROM books WHERE title='" . $title . "'";
		
		$res = mysql_query($query,$dbh);
			
		if (!$res) {
		    // echo "Error with query";
		    $resp = -1;
		   // return -1;
		} 
		else {
		       
				while ($thearray = mysql_fetch_array($res)) {
	              extract ($thearray);
		          $resp = $bookid ;	
	               }
		}
	}

	//$resfinal = mysql_fetch_array($res);
    //echo  $resfinal[0];
   echo $resp;
  //echo "TEST"; // $query;

?>