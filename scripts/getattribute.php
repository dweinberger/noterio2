<?

 
	$database_name =  $_POST['gdatabase'];

    
//This is the information we initialize the database with.
    $table_name = $_POST['table'];
	$attribute = $_POST['attrib'];
	$colweknow = $_POST['colweknow'];
	$basedonvalue = $_POST['basedonwhichvalue'];


	$dbh = mysql_connect("127.0.0.1","david","nn");
	
	 // echo "<p>connect: ";
	  //echo $dbh;

//Try to select database. 

	if (!mysql_select_db($database_name)) {
	
		echo "++ ERROR: " . mysql_errno().": ". mysql_error ()."";
	
		}
		else {
		
		//$query = "SELECT bookid FROM books WHERE title='book1'"; 
		$query = "SELECT " . $attribute . " FROM " . $table_name . " WHERE " . $colweknow . "='" . $basedonvalue . "'";
		//printf( $query);
		// $attribute from $table_name";
				
		$res = mysql_query ($query,$dbh);
		//$res = mysql_query("SELECT bookid FROM books WHERE title='book 2'", $dbh);
		//printf("<p>After query</p>");
		
		if (!$res) {
			echo "ATTRIB= " . $attribute . "QUERY=" . $query . "++ ERROR in getattribute.php: " .mysql_errno().": ". mysql_error ()."";
			return 0;
		} else {
			
			//echo "Got result: $res";
		}

	}
	
	$resfinal = mysql_fetch_array($res);
    echo $resfinal[0];

?>