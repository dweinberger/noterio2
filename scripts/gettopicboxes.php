<?php
	
 error_reporting(E_ALL);
ini_set("display_errors", 1);
	
    $project = $_POST['project'];
    $user = $_POST['user'];
    
    
	$dbh = mysql_connect("127.0.0.1","david","nn");
	(mysql_select_db("noterio"));
	if (!mysql_select_db("noterio")){
		echo "Could not connect database. ";
		return "Could not connect database: " . "noterio";
	}
	
	// get all playlists/topicboxes
	if ($project != "") {
		$query="SELECT * FROM playlists WHERE  user='$user' AND project='$project'"; 
	}
	else {
		$query = "SELECT * FROM playlists WHERE user='$user'";
	}
	
	// run the query
	$res = mysql_query($query, $dbh);
	
	if (!$res) { // bail if fails
		echo mysql_errno().": ". mysql_error ()."";
		return 0; 
		}
	
	
	
	// go through list of projects
    $arrayofboxes = array();
	while ($a_topicbox = mysql_fetch_assoc($res)) {
		extract ($a_topicbox); // this gives us a topicbox from playlists table: title/user/comment/project/created
		// associative array for this one topic box
		$boxarray = array();
		$oneboxcontents = array();
		$oneboxcontents["title"]=trim($title); // stick the box's title in with the rest of the contents so we can label the box
		// get all the rows for one topicbox based on the topicbox title
		$res_entries_for_one_topicbox = mysql_query("SELECT * FROM playlistentries where title='$title' AND user='$user' AND project='$project'", $dbh);
		// go through each entry, creating array of entries for each project
		$ctr=0;
		while ($entry_for_one_topicbox = mysql_fetch_array($res_entries_for_one_topicbox)){ 
				unset($boxarray);		
			  	$boxarray['bookid'] = $entry_for_one_topicbox['bookid'];
			  	$nid = $entry_for_one_topicbox['noteid'];
			  	$boxarray['noteid'] = $nid;
			  	$boxarray['date'] = $entry_for_one_topicbox['modified'];	
			  	// get the content based on the noteid
				$res2 = mysql_query("SELECT content FROM notes where noteid='$nid' LIMIT 1", $dbh);
				$contentres = mysql_fetch_assoc($res2); //$row['content'];
				$content = $contentres['content'];
			  	$boxarray['content'] = trim($content);
			  	//echo "<br>" . $content;
			  	$ctr++;
			  	array_push($oneboxcontents, json_encode($boxarray));
			  	//$oneboxcontents['onebox'] = json_encode($boxarray);
		}
		
		//array_push($arrayofboxes,  json_encode($boxarray));
			
		array_push($arrayofboxes, $oneboxcontents);
		
	 }
	 
// Alphabetizes based on "tag" 
// thank you  http://www.the-art-of-web.com/php/sortarray/	 
function compare_tags($a, $b) { 
	return strnatcmp($a['title'], $b['title']); 
} 

//usort($arrayofboxes, 'compare_tags'); 



echo json_encode($arrayofboxes);


?>
	
	