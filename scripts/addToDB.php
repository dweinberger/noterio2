<?php

// August 12, 2013: Imports OPML
// August 13, 2013: records order of notes, in order (int)

// BUGS
// global tag not applied if no other tags on the line
// replacing global tag begins with comma
// trim trailing commas of tags


$tabchar = chr(251); // represents a tab in processed opml files

function debugprt($txt){
  // prints debug info. 
  $debug = true; 
  if ($debug==true){
    //echo("<p>" . $txt . "</p>");
    // or 
    error_log($txt);
  }
}


debugprt("======================== ADD TO DB =======================");

debugprt("<style>p{font-size:12px;font-family:Arial;}</style>");

// called as part of multi-file add, 
$confupload = $_REQUEST['fname'];
$project = $_REQUEST['project'];
$user = $_REQUEST['user'];

//$formarray = _$REQUEST['dataFromForm'];
//debugprt("PROJECT=" . $formarray['project'];

//----------- DEBUG ONLY!!!!!!!!
//$confupload = array("test.opml");
//$project="techdet";
//$user="dw";

debugprt("project: $project <br>user: $user");
debugprt("<br>First item in upload array: $confupload[0]");

    // start up the database
	$dbh = mysql_connect("127.0.0.1","david","nn");
	$database_name = "noterio"; 
	// is the database up? 
	 if (!mysql_select_db($database_name)) {
		   echo "<h2>++ ERROR with database \"$database_name\": " . mysql_errno().": ". mysql_error ()."</h2>";
	   
	   }
    else {
       debugprt("Starting parsing. Total number of items: " . sizeof($confupload));
       
       
	$stringToReturn="<ul>";
	//$form_fields = array_keys($HTTP_GET_VARS);
	 
    
	
	// -- FOR EACH FILE
	
	for ($i = 0; $i < sizeof($confupload); $i++) {
	$originalorder = 0;
	// get the file
    $source = $confupload[$i];
    debugprt( "Source=" . $source );
    // -- CREATE ARRAY OF LINES for that file
    
    // is it opml?
    $ext = pathinfo($source, PATHINFO_EXTENSION);
    debugprt( "Extension=" . $ext );
    // ---- IT's OPML so create the array of lines here
    if (strtoupper($ext) == "OPML"){
    	debugprt("IT's OPML");
        // include: http://stackoverflow.com/questions/2644199/pass-value-to-an-include-file-in-php
    	include "parseOPMLInclude.php";
    	$source = "test.opml";
 		require_once 'parseOPMLInclude.php';
 		$cont = buildOPMLArray($source); 	// buildOPML is function in include file. 
 											//$source is var in that file too
 											// Returns a string of content
 											// chr(251) stands for number of indents

 		debugprt("cont: ". $cont);
    }
    // not an OPML 
    else { 
    	$cont = file_get_contents($source);
    	//debugprt($cont);
    }
    
    
    $cont = preg_replace("/(\x0D|\x0A)/", "\n", $cont); // getthe line endings right - thank you, Andy Silva!
    // create array of lines
	$farray = explode("\n",$cont);
	
	$farray = array_map("trim",$farray); // trim each line
	$inbib = false;
	$innotes = false;
	$auth=""; $title = ""; $titline=false;
	$ctr = 1;
	$needtocheckbook = true;
	$continuingTag = "";
	$ctr=0;
   
   // ------ FOR EACH LINE of the current file
	foreach($farray as $lline) {
		$ctr++;
		 
		 // count the numbers of tabs (inserted if from opml)
		 $indentlevel = substr_count($lline , $tabchar );
		 debugprt("<p>tabcount = " . $indentlevel);
		 // behead tabs
		 $lline = substr($lline,$indentlevel);
		  $lline = trim($lline); // trim it
		// look for * indicating importance
		if (substr($lline,0,1) == "*"){
			$rating = "5";
		}
		else {
			$rating = "-";
		}
		  //  skip it if empty or comment
		 if (($lline != "") && (strpos($lline,"#") !== 0 )) { // strpos returns false if no match but gets weird. !== fixes it
				 debugprt("$ctr>NEW LINE= $lline");
				$newbook = true;
				 // are we in biblio?
				if ((strpos($lline,":: BIBLIO") !== false) || (strpos($lline,"::BIBLIO") !== false)) {
				  $inbib = true;
				  debugprt("<h3>IN BIB</h3>");
				  $lline = ""; // zero out this line
				  }
				//are we in notes - if so, zero out this line
				if ((strpos($lline,":: NOTES") !== false) || (strpos($lline,"::NOTES") !== false)) {
				  $innotes = true;
				  debugprt("<h3>IN NOTES</h3>");
				  // don't make inbib false yet because we need both to be true to trigger db update
				  $lline="";
				  }
				// Look for bib info
				$authline = strpos($lline, "AUTHOR=");
				if (($authline !== false) && ($inbib ==true)){
				   $auth = substr($lline,strpos($lline,"=") + 1);
				   $auth = addslashes(trim($auth));
				   // debugprt("<p>author=" . $auth);
				}
				$titline = strpos($lline, "TITLE=");
				if (($titline !== false) && ($inbib ==true)){
				  // echo "<br>CTitle line: " . $lline;
				   $tit = substr($lline,strpos($lline,"=") + 1);
				   $tit = addslashes(trim($tit));
				   $stringToReturn = $stringToReturn . "\n<li><p>" . $tit . "</p></li>";
				   debugprt("<p>title=" . $tit);
				}
				 $publine = strpos($lline, "PUB=");
				if (($publine !== false) && ($inbib ==true)){
				   $pub = substr($lline,strpos($lline,"=") + 1);
				   $pub = addslashes(trim($pub));
				   // debugprt( "<p> pub=" . $pub);
				}
				$dateline = strpos($lline, "DATE=");
				if (($dateline !== false) && ($inbib ==true)){
				   $ddate = substr($lline,strpos($lline,"=") + 1);
				   $ddate = addslashes(trim($ddate));
				   // debugprt( "<p> ddate=" . $ddate);
				}
				$tagline = strpos($lline, "TAG=");
				if (($tagline) && ($inbib ==true)){
				   if ($continuingTag != ""){
					  $tag = $continuingTag . "'";
				   }
				   $tag = substr($lline,strpos($lline,"=") + 1);
				   $tag = addslashes(trim($tag));
				   // debugprt( "<p> tag=" . $tag);
				}
				$nicknameline = strpos($lline, "NICKNAME=");
				if (($nicknameline !== false) && ($inbib ==true)){
				   $nickname = substr($lline,strpos($lline,"=") + 1);
				   $nickname = addslashes(trim($nickname));
				   // debugprt( "<p> nickname=" . $nickname);
				}
			  $urlline = strpos($lline, "URL=");
				if (($urlline !== false) && ($inbib ==true)){
				   $url = substr($lline,strpos($lline,"=") + 1);
				   $url = addslashes(trim($url));
				   // debugprt( "<p> url=" . $url);
				}
			  $typeline = strpos($lline, "TYPE=");
				if (($typeline !== false) && ($inbib ==true)){
				   $type = substr($lline,strpos($lline,"=") + 1);
				   $type = addslashes(trim($type));
				   // debugprt( "<p> type=" . $type);
				}
			  $transline = strpos($lline, "TRANSLATOR=");
				if (($transline !== false) && ($inbib ==true)){
				   $type = substr($lline,strpos($lline,"=") + 1);
				   $translator = addslashes(trim($translator));
				   // debugprt( "<p> translator=" . $translator);
				}
			  $pagesline = strpos($lline, "PAGES=");
				if (($pagesline !== false) && ($inbib ==true)){
				   $pages = substr($lline,strpos($lline,"=") + 1);
				   $pages = addslashes(trim($pages));
				   // debugprt( "<p> pages=" . $pages);
				}
			  $containerline = strpos($lline, "CONTAINER=");
				if (($containerline !== false) && ($inbib ==true)){
				   $container = substr($lline,strpos($lline,"=") + 1);
				   $container = addslashes(trim($container));
				   // debugprt( "<p> container=" . $container);
				}  		  
			  $volline = strpos($lline, "VOL=");
				if (($volline !== false) && ($inbib ==true)){
				   $vol = substr($lline,strpos($lline,"=") + 1);
				   $vol = addslashes(trim($vol));
				   // debugprt( "<p> vol=" . $vol);
				}  
			  $issueline = strpos($lline, "ISSUE=");
				if (($issueline !== false) && ($inbib ==true)){
				   $issue = substr($lline,strpos($lline,"=") + 1);
				   $issue = addslashes(trim($issue));
				   // debugprt( "<p> issue=" . $issue);
				}  
			  $miscline = strpos($lline, "MISC=");
				if (($miscline !== false) && ($inbib ==true)){
				   $misc = substr($lline,strpos($lline,"=") + 1);
				   $misc = addslashes(trim($misc));
				   // debugprt( "<p> misc=" . $misc);
				} 
				$noteline = strpos($lline, "NOTE=");
				if (($noteline !== false) && ($inbib ==true)){
				   $note = substr($lline,strpos($lline,"=") + 1);
				   $note = addslashes(trim($note));
				   // debugprt( "<p> note=" . $note);
				}  	
				$isbnline = strpos($lline, "ISBN=");
				if (($isbnline !== false) && ($inbib ==true)){
				   $isbn = substr($lline,strpos($lline,"=") + 1);
				   $isbn = addslashes(trim($note));
				   // debugprt( "<p> isbn=" . $isbn);
				} 	  		  
						  
		  
			  if (!isset($author)){$author = "";}
			  if (!isset($date)){$date = "";}
			  if (!isset($city)){$city = "";}
			  if (!isset($pub)){$pub = "";}
			  if (!isset($type)){$type = "";}
			  if (!isset($url)){$url= "";}
			  if (!isset($translator)){$translator = "";}
			  if (!isset($pages)){$pages = "";}
			  if (!isset($issue)){$issue = "";}
			  if (!isset($vol)){$vol = "";}
			  if (!isset($journal)){$journal = "";}
			  if (!isset($misc)){$misc = "";}
			  if (!isset($nickname)){$nickname = "";}
			  if (!isset($container)){$container = "";}
			  if (!isset($note)){$note = "";}
			  if (!isset($isbn)){$isbn = "";}
			  if (!isset($rating)){$rating = "-";}
			  if (!isset($dateUploaded)){$dateUploaded = "";}
				// --- CREATE ENTRY
				// if at the start of notes, coming out of Bib, and we have a title and author, check the Database
				debugprt("innote:$innotes inbib:$inbib auth:$auth tit:$tit needtocheck:$needtocheck");
				if (($innotes)  && ($auth !="") && ($tit != "") && ($inbib) && ($needtocheckbook == true)){
				   $inbib = false; // turn off bibchecking
				   $needtocheckbook = false; // stop checking after this
				   // create timestamp
				   $dateUploaded = date('Y-m-d H:i:s', time());
				   
					$ctr = $ctr + 1;
				   //echo "<br>CTR=" . $ctr;
				  debugprt("<br>Checking for book. Auth: " . $auth . " Title: " . $tit);;

			   
			   // look for an existing record with this title and author
			   // if the book exists, then we want to update the record by
			   //     	a. deleting the notes and tags
			   //		b. creating a new record with that same bookid
			   
			   $bid = -1; // will be extracted if book exists
					 $query = "SELECT bookid FROM books WHERE title='" . $tit . "' AND author='" . $auth . "'";					 
					 $res = mysql_query($query,$dbh);	// returns an associative array, even if null
					 // is the query ok?	If not, exit  
					 if (!$res) {
						  echo "<p>++Error with query: $query<p>";
						 $resp = -1;
						 return -1;
					 }
					  // if there's already a record for this auth and title, delete notes and tags
					 if (mysql_num_rows($res) > 0) { // is there an existing row?
						  debugprt("found record for book");
						// get the book id
						  while ($thearray = mysql_fetch_array($res)) {
									debugprt("<p>-starting extraction");
									extract ($thearray);
									$bid = $bookid ;
									// delete the book so it can be replaced
									$deleteQuery = "DELETE from books WHERE bookid='" . $bid . "'";
									$delresult = mysql_query($deleteQuery,$dbh);
									debugprt("<p>-Deleted book with bookid=$bid with result: $delresult");
						  }
					   // delete notes and tags
					   $deleteQuery = "DELETE from notes WHERE bookid='" . $bid . "'";
					   $delresult = mysql_query($deleteQuery,$dbh);
					   debugprt("<p>-Deleted notes for bookid=$bid with result: $delresult");		     
					   $deleteQuery = "DELETE from tags WHERE bookid='" . $bid . "'";
					   $delresult = mysql_query($deleteQuery,$dbh);
					   debugprt("<p>-Deleted tags from bookid=$bid with result: $delresult");		
					 }
			   
					  // create (or overwrite) the book entry
				
									// add to database if new book
						if ($bid == -1){
								  $query = "INSERT into books
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
											  container,
											  project,
											  user,
											  nickname,
											  note,
											  isbn 
											  )
									  values (
											  '$tit',
											  '$auth',
											  '$ddate',
											  '$city',
											  '$pub',
											  '$type',
											  '$url',
											  '$translator',
											  '$issue',
											  '$vol',
											  '$journal',
											  '$misc',
											  '$container',
											  '$project',
											  '$user',
											  '$nickname',
											  '$note',
											  '$isbn'
											  );";
										}
								// insert if update, maintining old bookid
						if ($bid !== -1) {
							
								  $query = "INSERT into books
											  ( bookid,
											  title,
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
											  container,
											  project,
											  user,
											  nickname,
											  note,
											  isbn 
											  )
									  values (
									  		  '$bid',
											  '$tit',
											  '$auth',
											  '$ddate',
											  '$city',
											  '$pub',
											  '$type',
											  '$url',
											  '$translator',
											  '$issue',
											  '$vol',
											  '$journal',
											  '$misc',
											  '$container',
											  '$project',
											  '$user',
											  '$nickname',
											  '$note',
											  '$isbn'
											  );";
						}
										
						// do the insert
						$res = mysql_query ($query,$dbh);
					
	
							  if (!$res) {
									  echo "<p class='error'>++Problem with database after attempt to add book: " . mysql_errno().": ". mysql_error ()."</p>";
									  debugprt("<p><b>++++ $tit NOT added</b>");
									  return -1;
								  } else {
									  debugprt("$tit  added.<BR>");
									  // get bookid from latest transaction
									  $bid = mysql_insert_id();
									  }
		

					 } // database is ok
				  } // have author and title - create new entry
			
			// ------------- ADD NOTES if we're in notes
			if ($innotes){
			   
			     $pagenumber = "";
			     $cont="";
				// is it a line we need to look at?
				// ignore if begins with double slash
				$lline = trim($lline, "\n\r\t ,.");
				if (stripos($lline, "//") === 0){
					$lline = "";
				}
				debugprt("$ctr> Line after trim INNOTES=" . $lline);
				
				// check for continuing tag: >> at beginning of line
		  		if (stripos($lline, ">>") === 0){
		  			$continuingTag = substr($lline,2) ;//. ",";
		  			$continuingTag = trim($continuingTag, "\n\r\t ,.");
		  			debugprt("FOUND continuingTag: $continuingTag line $ctr = $lline");
		  			// zero out the line
		  			$lline = "";
		 		}
		 			
		 
				// --- get the page number
				if (strlen($lline) > 0){ //(($lline != "") && (strpos($lline,"--") != 1)){
					debugprt("Line $ctr after looking for continuing tag");
				  // get the page number if the slash isn't more than 12 in
				  if ((strpos($lline,"/") !== false) && (strpos($lline, "/") < 12)) {
				      $pagenumber = substr($lline, 0, strpos($lline, "/"));
				      debugprt("$ctr> pagenumber = $pagenumber");
				  	}
				  
				  //--- get note
				   if (strpos($lline,"/")) {  // find where to start
				      $startpos = strpos($lline,"/") ;
				      //echo "<p>Found / at pos " . $startpos;
				      }
				      else {
				      $startpos = 1;
				      }
				    //  echo "<p>Startpos after page: " . $startpos . " : ". $lline;
				   if (strripos($lline, ">>")){ // find where to end
				   		$endpos = strripos($lline, ">>") - 1;
				   }
				   else {
				    	$endpos = strlen($lline);
				    	}
				    	// echo "<p>Endpos: " . $endpos;
				   $cont = addslashes(substr($lline,$startpos + 1,$endpos - $startpos)); // get the note
				   debugprt("<p>Cont after addslashes: $cont");
				   
				   //--- get tags
					$tagstring = "";
					if (strripos($lline, ">>") > 2){ // is there a tag? (Discount >> at start of line)
					    $rawtags = (substr($lline, strripos($lline, ">>") + 2, strlen($lline)));
					    debugprt( "RAWTAGS BEFORE= rawtags");
					    $rawtags = trim($rawtags, "\n\r\t ,.");
					     debugprt( "RAWTAGS AFTER=$rawtags");
						$tagstring = addslashes($rawtags);
						
						// add continuing tag, if any
						if ($continuingTag !== ""){
							$tagstring = $tagstring . "," . $continuingTag;
						}
						debugprt( "<p>Tagstring found: " . $tagstring);
						}
					debugprt("<p>Pagenumber: " . $pagenumber . " content: " . $cont . " bookid: " . $bid .  " tagstring: " . $tagstring . "</p>");
					
		 		// -- record the original order	
		 		$originalorder = $originalorder + 1;
				// add it to the database	
				$query = "INSERT into notes
										(page,
										content,
										tagstring,
										bookid,
										indent,
										origorder,
										rating
										)
								values (
										'$pagenumber',
										'$cont',
										'$tagstring',
										'$bid',
										'$indentlevel',
										'$originalorder',
										'$rating'
										);";
										
						$res = mysql_query ($query,$dbh);
				
						if (!$res) {
								echo "<p>ERROR POSTING NOTES:<br>Query:" . $query . "<br>SQL error: " . mysql_errno().": ". mysql_error ()."";
								return -1;
							} else {
			         			//echo "<p>Note added: " . $content;
			         			//echo "<p>noteid: " . mysql_insert_id(); ;
			         			// get noteid from latest transaction
			         			$noteid = mysql_insert_id();
								}
			// ADD TAGS
			if ($tagstring != ""){
			   $tagarray = explode(",",$tagstring); // turn it into an array
			   // if there's a continuing tag, push it into the array
			   if ($continuingTag != "") {
			   	$tagarray[] = $continuingTag;
			   	debugprt("Added continuing tag: $continuingTag");
			   }
			   $valuestring = ""; // build a string of values
			   // query = "insert into tags (tag, noteid, bookid) values (tag1,noteid,etc.),(tag2,noteid2,etc.);"
			   foreach($tagarray as $tag){
			   		$tag=trim($tag," \t\r\n\0,.");
			   		debugprt("INSERTING TAG: |" . $tag . "| from tagstring: " . $tagstring);
			   		if (($tag != ",") && ($tag != "")){
			      		$valuestring = $valuestring . "('" . $tag . "','" . $noteid . "','" . $bid . "'),";
			    	}
			    }
			    
			    	
			    // it now has an extra comma at the end of it
			    // $valuestring = substr_replace($valuestring ,"",-1);
			    $valuestring = trim($valuestring, "\n\r\t ,.");
			    $query = "INSERT into tags(tag,noteid,bookid) values ".  $valuestring ;
			   // submit the query
			    $res = mysql_query ($query,$dbh);
						if (!$res) {
								echo "<p>ERROR POSTING TAG:<br>Query:" . $query . "<br>SQL error: " . mysql_errno().": ". mysql_error ()."";
								return -1;
							} else {
			         			debugprt("Tags added: " . $valuestring);
			   						}				
				} // tags
			
			}
			} // innote
		} // each line
	
   } // each file
   
   }// else

  echo $stringToReturn;

?>