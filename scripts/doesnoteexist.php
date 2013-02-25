<?

 
   
//This is the information we initialize the database with.
    $table_name = "books";
	$bookid = $_POST['bookid']; 
	$content = $_POST['content'];
	$database_name =  $_POST['gdatabase'];

	$dbh = mysql_connect("127.0.0.1","david","nn");

//Try to select database. 

	if (!mysql_select_db($database_name)) {
	
		echo "++ ERROR: " . mysql_errno().": ". mysql_error ()."";
	
		}
		else {
		
		//$content = mysql_real_escape_string($content);
		
		$query = "SELECT noteid FROM notes WHERE bookid='" . $bookid . "' AND content='" . $content . "'";
		//$query = "SELECT noteid FROM notes WHERE bookid='207' AND content='a'";	
		$res = mysql_query ($query,$dbh);
			
		if (!$res) {
		    $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
		} 
		else {
		  while ($row = mysql_fetch_assoc($res)) {
   			 echo $row['noteid'];
    	//	echo $row['bookid'];
}
		}

	}
	
	//$resfinal = mysql_fetch_array($res, MYSQL_BOTH);
   // echo  "res: " . $res . " ARRAY:" . $resfinal[0];

?>