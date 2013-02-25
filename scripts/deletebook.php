<?

   
//This is the information we initialize the database with.
	$project =  $_POST['project'];
	$user =  $_POST['user'];
	$bookid = $_POST['bookid'];

	    
	$dbh = mysql_connect("127.0.0.1","david","nn");

	if (!mysql_select_db("noterio")) {
		echo mysql_errno().": ". mysql_error ()."";
		}
		else {
		
     	$query = "DELETE FROM books WHERE bookid='" . $bookid . "'";			
		$res = mysql_query ($query,$dbh);
		
		if (!$res) {
			$resp= mysql_errno().": ". mysql_error () . "";
			
		} else {
	        $resp = mysql_insert_id();
		}
		}
	

echo "QUERY=" . $query . "    RESPONSE=" . $resp;

?>

