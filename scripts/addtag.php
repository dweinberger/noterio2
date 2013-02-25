<?

 
	$database_name =  $_POST['gdatabase'];
	$table_name = "tags";

    
//This is the information we initialize the database with.
	$bookid = $_POST['bookid'];
	$noteid = $_POST['noteid'];
	$tags =   $_POST['tags'];

	$dbh = mysql_connect("127.0.0.1","david","nn");
	
	 // echo "<p>connect: ";
	 // echo $dbh;

//Try to select CONTACT database. 

	if (!mysql_select_db($database_name)) {
	
		echo mysql_errno().": ". mysql_error ()."";
	
		}
		else {
		
		$query = "INSERT into $table_name
				( 
				  noteid,
				  bookid,
				  tag
				)
		values (
				
				'$noteid',
				'$bookid',
				'$tags');";
				
		$res = mysql_query ($query,$dbh);
		//printf("<p>After query</p>");
		
		if (!$res) {
			echo mysql_errno().": ". mysql_error ()."";
			return 0;
		} else {
			//we added our first info to the database..
			//echo "$tit $lastname  added.<BR>";
		}
		
		// get new tagid
	    //$query = "SELECT tagid FROM tags WHERE title='book1'"; 
		//$query = "SELECT bookid FROM " . $table_name . " WHERE title='" . $tit . "'";
		//$res = mysql_query ($query,$dbh);
		//$resp=SELECT @@IDENTITY;
		//$resp=SELECT top 1 ID FROM tags ORDER BY tagid desc;
		 $query = "SELECT LAST_INSERT_ID()";
		 $resp = mysql_query ($query,$dbh);
	}

	//$resfinal = mysql_fetch_array($res);
   // echo $resfinal[0];
  echo $resp;
?>

