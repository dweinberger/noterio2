<?php
	
   
    $querystring = $_POST['querystring'];
 	$project = $_POST['project'];
 	$user = $_POST['user'];
 	$conj = $_POST['conj'];

    
	$dbh = mysql_connect("127.0.0.1","david","nn");
	if (!mysql_select_db("noterio")){
		echo "Could not connect database. ";
		return;
	}
	
	// create array of search terms
    $termArrayUnmapped = explode(",",$querystring);
	// trim it
	 $termArray = array_map('trim', $termArrayUnmapped);	
	
	
	// if OR, then the center term is just the string of terms separated by spaces
	// Don't know how to search for phrases

	// build center term 

		$centerq = join(" ",$termArray);
	
    

	// THIS WORKS: SELECT * FROM notes WHERE MATCH(content)  AGAINST ('doren manifestly science progress'  in boolean mode) 
	$query = "SELECT * FROM notes WHERE MATCH(content)  AGAINST ('$centerq'  in boolean mode)  order by noteid";
	// run the query
	$res = mysql_query($query, $dbh);

	if (!$res) {
		echo mysql_errno().": ". mysql_error ();
		error_log("++ query failed: " . mysql_error());
		}
	else {	
	 //res is a list ordered by noteid. If any noteid has more than one entry, then it's
	// tagged with all the queried tags and thus is part of an AND. 
	// WE need: $noteid . "|" . $content . "|" .  $page . "|" . $querystring . $Bookid 	
	$arrayofrows = array();	
	$prevnoteid = -2;
	$rowctr = -1;
	$tempTermArray = array();
	while ($thearray = mysql_fetch_array($res)) {
		   extract ($thearray);
		   $rowarray = array();
		   //error_log("ROW CTR: " . $rowctr);
		   $rowarray['noteid'] = trim($noteid);
		   $rowarray['content'] = $content;
		   $rowarray['page'] = trim($page);
		   $rowarray['bookid'] = trim($bookid);
		   $rowarray['tag'] = trim($tagstring);
		   array_push($arrayofrows, $rowarray);
		
		   		// If different note from previous, then record it
		   	
		   		if (1==2) {//($noteid != $prevnoteid) { // if new, then push it
		   			$rowctr++;
		   			$arrayofrows[$rowctr] = $rowarray;
		   			error_log("Added noteid:  $noteid");
		   			//array_push($arrayofrows, $rowarray);
		   		}
		   

		   
		  // $prevnoteid = $noteid;
		  
		   }	
	  } // else


echo json_encode($arrayofrows);
	?>