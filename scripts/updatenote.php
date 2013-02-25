<?php
	//$table_name = "notes";
//This is the information we initialize the database with.
	$project =  $_POST['gProject'];
    $cont = $_POST['content']; // content
	$pg = $_POST['page'];
	$bid = $_POST['bookid'];
	$tags =$_POST['tags'];
	$noteid = $_POST['noteid'];
	
	$s = "";
	


    $dbh = mysql_connect("127.0.0.1","david","nn");
	if (!mysql_select_db("noterio")) {
		echo mysql_errno().": ". mysql_error ()."";
		}
		else {
			
			

      if ($tags != "") {
      	$s = " tagstring = '" . $tags . "'";
      }
	  
	  if (($tags != "") && ($cont != "")) {
	  	$s = $s . ", ";
	  }
	  if ($cont !="") {
	  	$s = $s . " content='" . $cont . "'";
	  }
		
		//$cont = mysql_real_escape_string($cont);
	
		
		$query = "UPDATE notes SET " . $s . "  where noteid=" . $noteid ;
	
		$res = mysql_query ($query,$dbh);
		
		if (!$res) {
			$resp= mysql_errno().": ". mysql_error () . "";
			
		} else {
	        $resp = mysql_insert_id();
		}
		}
	

echo $query;

?>

