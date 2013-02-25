<?php
	
	// returns full row of info about any notes with the given tag
	
	//error_log("8888888888888888 --- GET NOTES FOR TAG. PHP ----------88888888888888");
    $database_name = "noterio";
	$table_name  = "notes";
    $tag = $_POST['tag'];
    $project = $_POST['project'];
    $user = $_POST['user'];
    //error_log("tag=" . $tag );
    
	$dbh = mysql_connect("127.0.0.1","david","nn");
	if (!mysql_select_db($database_name)){
		echo "Could not connect database. ";
		return "Could not connect database: " . $database_name;
	}
	
	//$query="SELECT * FROM notes WHERE  (bookid IN (SELECT bookid  FROM books where project='$project')) AND (bookid IN (SELECT bookid from books WHERE user='$user')) and noteid in (SELECT noteid from tags where tag ='$tag')";
	//$query="SELECT noteid,content,tagstring,rating,page, notes.bookid, title FROM notes inner join books on books.bookid=notes.bookid where notes.bookid in (select bookid from books where project='$project') and notes.bookid in (select bookid from books where user='$user') and  noteid in (SELECT noteid from tags where MATCH (tag) AGAINST ('$tag'))";
	$query="SELECT noteid,content,tagstring,rating,page, notes.bookid, title FROM notes inner join books on books.bookid=notes.bookid where notes.bookid in (select bookid from books where project='$project') and notes.bookid in (select bookid from books where user='$user') and  noteid in (SELECT noteid from tags where tag='$tag')";
	//error_log($query);
	$res = mysql_query($query, $dbh);
	$resp="";
	
	if (!$res) {
		echo mysql_errno().": ". mysql_error ()."";
		return 0;
		}

	 $arrayofrows = array();	
	while ($thearray = mysql_fetch_array($res)) {
	extract ($thearray);
		$rowarray = array();
		$rowarray['noteid'] = trim($noteid);
		$rowarray['title'] = trim($title);
		$rowarray['content'] = $content;
		$rowarray['rating'] = trim($rating);
		$rowarray['page'] = trim($page);
		$rowarray['bookid'] = trim($bookid);
		$rowarray['tagstring'] = trim($tagstring);
		$rowarray['title']= trim($title);
		// add this row to the arrayofrows
		array_push($arrayofrows, $rowarray);	
 
	 }
	 
echo json_encode($arrayofrows);
?>