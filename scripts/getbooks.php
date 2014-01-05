<?php
	
	$project = $_POST['project'];
    $user = $_POST['user'];
    
 
    
	$dbh = mysql_connect("127.0.0.1","david","nn");
	(mysql_select_db("noterio"));
	if (!mysql_select_db("noterio")){
		echo "Could not connect database. ";
		return "Could not connect database: " . "noterio";
	}
	
	$query = "SELECT * FROM books WHERE project='$project' AND user='$user' ORDER BY title";
	
	
	$res = mysql_query($query, $dbh);
	$resp="";
	
	if (!$res) {
		echo mysql_errno().": ". mysql_error ()."";
		return 0; 
		}
	
    $arrayofrows = array();
	while ($therow = mysql_fetch_array($res)) {
		extract ($therow);
		// get all the values for this row
		$rowarray = array();
		//printf ("<p>%s %s retrieved from database.<BR>",
		$rowarray['bookid'] = trim($bookid);
		$rowarray['title'] = trim($title);
		$rowarray['author'] = trim($author);
		$rowarray['pub'] = trim($pub);
		$rowarray['date'] = trim($date);
		$rowarray['city'] = trim($city);
		$rowarray['translator'] = trim($translator);
		$rowarray['article'] = trim($article);
		$rowarray['vol'] = trim($vol);
		$rowarray['issue'] = trim($issue);
		$rowarray['misc'] = trim($misc);
		$rowarray['type'] = trim($type);
		$rowarray['pub'] = trim($pub);
		$rowarray['tags'] = trim($tags);	
		$rowarray['container'] = trim($container);
		$rowarray['url'] = trim($url);
		$rowarray['journal'] = trim($journal);
		$rowarray['note'] = trim($note);
		$rowarray['isbn'] = trim($isbn);
		$rowarray['parent'] = trim($parent);
		$rowarray['nickname'] = trim($nickname);
		$rowarray['dateuploaded'] = trim($dateUploaded);
		// add this row to the arrayofrows
		array_push($arrayofrows, $rowarray);
		
	 }

echo json_encode($arrayofrows);


?>
	
	