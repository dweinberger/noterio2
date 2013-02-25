<?

 
   $database_name =  $_POST['gdatabase'];
	$table_name = "books";

    
//This is the information we initialize the database with.
    $tit = $_POST['title'];
	$author = $_POST['author'];
	$pub = $_POST['pub'];
	$date = $_POST['date'];
	$city = $_POST['city'];
	$type = $_POST['type'];
	$misc = $_POST['misc'];
	$translator = $_POST['translator'];
	$url = $_POST['url'];
	$vol = $_POST['vol'];
	$issue = $_POST['issue'];
	$journal = $_POST['journal'];
	$container = $_POST['container'];

	$dbh = mysql_connect("127.0.0.1","root","");
	
	 // echo "<p>connect: ";
	 // echo $dbh;

//Try to select CONTACT database. 

	if (!mysql_select_db($database_name)) {
	
		echo mysql_errno().": ". mysql_error ()."";
	
		}
		else {
		
		$query = "INSERT into $table_name
				( title,
				author,
				date,
				city,
				pub,
				type,
				url,
				translator,
				issue,
				vol,
				journal,
				misc,
				container 
				)
		values (
				'$tit',
				'$author',
				'$date',
				'$city',
				'$pub',
				'$type',
				'$url',
				'$translator',
				'$issue',
				'$vol',
				'$journal',
				'$misc',
				'$container');";
				
		$res = mysql_query ($query,$dbh);
		//printf("<p>After query</p>");
		
		if (!$res) {
			echo mysql_errno().": ". mysql_error ()."";
			return -1;
		} else {
			//we added our first info to the database..
			//echo "$tit $lastname  added.<BR>";
		}
		
		// get new bookid
		//$query = "SELECT bookid FROM books WHERE title=$tit";
	 //$query = "SELECT bookid FROM books WHERE title='book1'"; 
		//$query = "SELECT bookid FROM " . $table_name . " WHERE title='" . $tit . "'";
		//$res = mysql_query ($query,$dbh);
		$res = mysql_insert_id();
	}

	//$resfinal = mysql_fetch_array($res);
  //  echo $resfinal[0];
  echo $res;

?>

