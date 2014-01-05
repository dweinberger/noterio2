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
	
    error_log("page:$pg");

    $dbh = mysql_connect("127.0.0.1","david","nn");
	if (!mysql_select_db("noterio")) {
	  //  error_log("Error: " . mysql_error());
		echo mysql_errno().": ". mysql_error ()."";
		}
		else {
			
		// if !SAMETAGS! then don't change the tags at all
		//error_log("In the Ifs");

      // if tags but not the sametags
      if (($tags != "") && ($tags !== "!SAMETAGS!")) {
      	$s = " tagstring='$tags'";
      }
	  
	  // if  tags and content
	  if (($s != "") && ($cont != "")) {
	  	$s = $s . ", content='$cont'";
	  }
	  // if no tags but content
	  if (($s == "") && ($cont !="")) {
	  	$s = "content='$cont'";
	  }
	  
	  // any pages to change?
	  if (($pg != "") && ($pg != "!SAMEPAGES!")){
	  	if ($s != ""){
	  		$s = $s . ",page='$pg'";
	  	}
	  	else {
	  		$s ="page='$pg'";
	  	}
	  }
	  //error_log("s=$s");
		
		//$cont = mysql_real_escape_string($cont);
	
		
		$query = "UPDATE notes SET " . $s . "  where noteid=" . $noteid ;
	     //error_log("query: $query");
		$res = mysql_query ($query,$dbh);
		
		if (!$res) {
			$resp= mysql_errno().": ". mysql_error () . "";
			
		} else {
	        $resp = mysql_insert_id();
		}
		}
	

echo $query;

?>

