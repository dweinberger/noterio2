<?


	$table_name = "notes";

    
//This is the information we initialize the database with.
	$database_name =  $_POST['gdatabase'];
    $cont = $_POST['cont']; // content
	$pg = $_POST['page'];
	$bid = $_POST['bookid'];
	$tags =$_POST['tagstring'];
	$dbh = mysql_connect("127.0.0.1","david","nn");
	$noteid = $_POST['noteid'];
	$rating = $_POST['rating'];
	

	if (!mysql_select_db("noterio")) {
		echo mysql_errno().": ". mysql_error ()."";
		}
		else {
		
		//$cont = mysql_real_escape_string($cont);
		
		$query = "INSERT into notes
				( content,  page,bookid,tagstring, noteid, rating
				)
		values ('$cont','$pg','$bid', '$tags', '$noteid', '$rating');";
				
		$res = mysql_query ($query,$dbh);
		
		if (!$res) {
			$resp= mysql_errno().": ". mysql_error () . "";
			
		} else {
	        $resp = mysql_insert_id();
		}
		}
	

echo $resp;

?>

