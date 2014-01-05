<?php
  // mysqli version
  // dec. 28, 2013
  // see http://www.pontikis.net/blog/how-to-use-php-improved-mysqli-extension-and-why-you-should
	
 error_reporting(E_ALL);
ini_set("display_errors", 1);
	
    $project = $_POST['project'];
    $user = $_POST['user'];
    
    
		$dbh = new mysqli('127.0.0.1','david','nn','noterio');
	if ($dbh->connect_error > 0){
	 	die('Unable to connect to database [' . $dbh->connect_error . ']');
	 }

	
	// get all playlists/topicboxes
	if ($project != "") {
		$query="SELECT * FROM playlists WHERE  user='$user' AND project='$project'"; 
	}
	else {
		$query = "SELECT * FROM playlists WHERE user='$user'";
	}
	
	// run the query
	$res = $dbh->query($query);
	// error?
	if($res === false) {
  		trigger_error('Wrong SQL: ' . $query . ' Error: ' . $dbh->error, E_USER_ERROR);
  		return 0;
	}  
	
	
	// go through list of projects
	
	$arrayofboxes = array(); // container array
	$res->data_seek(0);
	while ($a_topicbox = $res ->fetch_array(MYSQLI_ASSOC)) {
		extract ($a_topicbox); // this gives us a topicbox from playlists table: title/user/comment/project/created
		// associative array for this one topic box
		$boxarray = array();
		$oneboxcontents = array();
		$oneboxcontents["title"]=trim($title); // stick the box's title in with the rest of the contents so we can label the box
		// get all the rows for one topicbox based on the topicbox title
		$res_entries_for_one_topicbox = $dbh->query("SELECT * FROM playlistentries where title='$title' AND user='$user' AND project='$project'");
		// go through each entry, creating array of entries for each project
		$ctr=0;
		while ($entry_for_one_topicbox = $res_entries_for_one_topicbox->fetch_array(MYSQLI_ASSOC)){ 
				unset($boxarray);		
			  	$boxarray['bookid'] = $entry_for_one_topicbox['bookid'];
			  	$nid = $entry_for_one_topicbox['noteid'];
			  	$boxarray['noteid'] = $nid;
			  	$boxarray['date'] = $entry_for_one_topicbox['modified'];	
			  	// get the content based on the noteid
				$res2 = $dbh->query("SELECT content FROM notes where noteid='$nid' LIMIT 1");
				$res2->data_seek(0);
				$contentres = $res2->fetch_array(MYSQLI_ASSOC); //$row['content'];
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
	
	