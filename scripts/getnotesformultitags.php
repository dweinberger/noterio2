<?php
	//error_log("ppppppppppppppppppppppppppppppppppp");
    $project = $_POST['project'];
    $user = $_POST['user'];
    $tagstring = $_POST['tagstring'];
    $conj = $_POST['conj']; // AND or OR

function identical_values( $arrayA , $arrayB ) {
     $eq = true;
     //error_log("A: " . join("*",$arrayA) . " B: ". join("*", $arrayB) );
     //error_log("item: " . $arrayB[0]);
    if (count($arrayA) != count($arrayB)){
    	$eq=false;
    	error_log("Count off");
    }
    else {
   	 	sort( $arrayA );
    	sort( $arrayB );
    	$ct = count($arrayA);
    	//error_log("Count ON: $ct");
    	$c = 0;
    	for ($i=0; $i < $ct; $i++) {
    		$a = strtolower($arrayA[$i]);
    		$b = strtolower($arrayB[$i]);
    		//error_log("A= $a B= $b  I= $i");
    		$ec = strcmp($a, $b);
    		if ($ec !== 0) {
    		//if ($arrayB[$i] != $arrayA[$i]) {
    			$eq = false;
    			error_log("Unequal=" . $i);
    			//error_log("Unequal. A= |" . arrayA[$i] . "| B= |" . arrayB[$i] . "| i=" . $i);
    		}
    		$c++;
    		//else {error_log("GOT TRUE");}
    	}
    }	
    
    //if ($eq == true) { $e="YES";}
    //else{$e="NO";}
    //error_log("A: " . join("*",$arrayA) . " B: ". join("*", $arrayB) . " Equal: " . $e);
    return $eq;
} 

 $dbh = mysql_connect("127.0.0.1","david","nn");
if (!mysql_select_db("noterio")){
		echo "Could not connect database. ";
	}
	else {
    $tagArrayUnmapped = explode(",",$tagstring); // turn it into an array
    //for ($i=0;$i < count($tagArrayUnmapped); $i++){
	//		   		error_log("TagUnmapped= . $tagArrayUnmapped[$i]  ");
	//		   		}
    // trim each entry
    $tagArray = array_map('trim', $tagArrayUnmapped);
	//error_log("Jooined: " . join("|",$tagArray));
	//sort($tagArray);
	//error_log("Sorted: " . join("+",$tagArray));
   
    //error_log("Count: " . count($tagArray));
    //works: select tags.noteid, tags.tag,content, notes.bookid from tags, notes where (tag='progress' OR tag='readLater') and (tags.noteid = notes.noteid) order by noteid; 
    
    // build the center clause of the query
    $centerq="";
    $ctr = 1; 
    foreach($tagArray as $term){
    	//error_log("$ctr>TERM= |$term|");
    	$centerq = $centerq . "tag='$term'";
    	// if not the last one, add the conjunction
    	if ($ctr < count($tagArray)){
    		$centerq = $centerq . " OR ";
    	}
    	
    	$ctr++;
    } // build center clause
    
    error_log("Center of query: $centerq");
    
    // works: select tags.noteid, tags.tag,content, notes.bookid from tags, notes where (tag='tag1' AND tag='tag2') and (tags.noteid = notes.noteid) order by noteid";
    
    $query = "select tags.noteid, tags.tag,content, page, notes.page, notes.bookid from tags, notes where (" . $centerq . ") and (tags.noteid = notes.noteid) order by noteid";
    //$query = "select tags.noteid, tags.tag,content, page, notes.bookid from tags, notes where (tag = 'readLater' OR tag = 'progress') and (tags.noteid = notes.noteid) order by noteid";
 
    //error_log("QUERY: " . $query);
   
	
	
	// do the query
	$res = mysql_query($query, $dbh);
	$resp="";
	
	if (!$res) {
		echo mysql_errno().": ". mysql_error ();
		error_log("++ query failed: " . mysql_error());
		}
	else {	
	 //res is a list ordered by noteid. If any noteid has more than one entry, then it's
	// tagged with all the queried tags and thus is part of an AND. 
	// WE need: $noteid . "|" . $content . "|" .  $page . "|" . $tagstring . $Bookid 	
	$arrayofrows = array();	
	$prevnoteid = -1;
	$prevtag = "";
	$rowctr = -1;
	$tempTagArray = array();
	while ($thearray = mysql_fetch_array($res)) {
		   extract ($thearray);
		   $rowarray = array();
		   //error_log("ROW CTR: " . $rowctr);
		   $rowarray['noteid'] = trim($noteid);
		   $rowarray['content'] = $content;
		   $rowarray['page'] = trim($page);
		   $rowarray['bookid'] = trim($bookid);
		   $rowarray['tag'] = trim($tag);
		   // -------- OR -----
		   // add this row to the arrayofrows
		   // if it's an OR, then every row goes in, 
		   // but where there's an additional tag, the noteid only goes in once, 
		   // but has the full tag string
		   if ($conj == "OR") {
		   		// same note as previous?
		   		if ($noteid === $prevnoteid) {
		   			// don't enter new row, but update the tagstring of the original row
		   			// rowctr still points to prior row
		   			$arrayofrows[$rowctr]['tag'] = $arrayofrows[$rowctr]['tag'] . ",$tag";
		   			//error_log("OR Dupe tag #: " . $rowctr);
		   		}
		   		else { // if new, then push it
		   			$rowctr++;
		   			$arrayofrows[$rowctr] = $rowarray;
		   			//array_push($arrayofrows, $rowarray);
		   		}
		   }
		   // ----------- AND --------
		   // if AND, only record row if it has all the terms, and give it to the original tagstring
		   // Don't commit a noteid unless and until the entire tag set is encountered
		   if ($conj == "AND"){
		   		//error_log("--Noteid= $noteid  Tag = $tag");
			   // - if this is the first time for a noteid:
			   if ($noteid != $prevnoteid){
			   		//error_log("New noteid: $noteid prevnote: $prevnoteid");
			   		// capture the row
			   		$tempAndRow = $rowarray;
			   		// add the tag to a temp array of tags
			   		unset($tempTagArray);
			   		$tempTagArray = array();
			   		array_push($tempTagArray, $tag);
			   		error_log("Tag pushed: " . $tag);
			   	}
			   	// if repeat of a noteid
			   	else {
			   		// add the new tag to the temp array of tags
			   		//error_log("Repeat noteid: $noteid Tag: " . $rowarray['tag']);
			   		array_push($tempTagArray, $rowarray['tag']);
			   	}
			   	// has the tag set been completed?
			   	if (identical_values($tagArray,$tempTagArray)){ 
			   		//error_log("Tag set complete: TempTagArray: " . join("+",$tempTagArray));
			   		//error_log("Tag set complete: tagArray: " . join("+",$tagArray));
			   		// add entire tagstring
					$tempAndRow['tag'] = $tagstring; // join(",",$tagArray); 
					// save it
					$rowctr++;
					$arrayofrows[$rowctr] = $tempAndRow;
					}
		   	}
		   
		   $prevnoteid = $noteid;
		   $prevtag = $tag;
		   }	
	  } // while
} // else dbconnect
	
	
echo json_encode($arrayofrows);

?>