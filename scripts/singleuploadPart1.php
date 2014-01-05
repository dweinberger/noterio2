<?php

// uploads a single file with a known bookid to update/replace it

error_reporting(E_ALL);
error_reporting (E_ALL ^ E_NOTICE);

ini_set("display_errors", 0);
ini_set('auto_detect_line_endings',true); // helps mac recognize unix line endings

function debugprt($txt){
  // prints debug info. Lower the level the less prints. Higher = more inclusive
  // give a high number to minor comments
  $debug= true; 
  if ($debug){
    error_log($txt);
   echo "<p>" . $txt;
  }
}


$bid = $_REQUEST["bookidsingle"];
debugprt("bid=" . $bid);

// DEBUG
//$bid=8;

$dbh = mysql_connect("127.0.0.1","david","nn");

	if (!mysql_select_db("noterio")) {
		echo mysql_errno().": ". mysql_error ()."";
		echo "bad db";
		return;
		}


debugprt("------------------------ SINGLE UPLOAD---------------");

	$originalorder = 0;
	$tmpnamepath = $_FILES['userfiles']['tmp_name'][0];
	 debugprt("temppath: " . $tmpnamepath);
	$realname =  $_FILES['userfiles']['name'][0];
	debugprt("realname= " . $realname);
    $ext = pathinfo($realname, PATHINFO_EXTENSION);
    debugprt("ext=" . $ext);
    
    // ---- IT's OPML so create the array of lines here
    if (strtoupper($ext) == "OPML"){
    	debugprt("IT's OPML");
        // include: http://stackoverflow.com/questions/2644199/pass-value-to-an-include-file-in-php
    	include "parseOPMLInclude.php";
 		require_once 'parseOPMLInclude.php';
 		$cont = buildOPMLArray($source); 	// buildOPML is function in include file. 
 											//$source is var in that file too
 											// Returns a string of content
 											// chr(251) stands for number of indents

 		//debugprt("cont: ". $cont);
    }
    // not an OPML 
    else { 
    	debugprt("Not OPML");
    	$cont = file_get_contents($tmpnamepath);
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
	
    debugprt("Number of lines= " . count($farray));
    
   // ============= FOR EACH LINE of the current file ==============
	foreach($farray as $lline) {
		$ctr++;
		 
		 // count the numbers of tabs (inserted if from opml)
		 $indentlevel = substr_count($lline , $tabchar );
		 //debugprt("<p>tabcount = " . $indentlevel);
		 // behead tabs
		 $lline = substr($lline,$indentlevel);
		  $lline = trim($lline); // trim it
		  //debugprt($ctr . ": " . $lline);
		  //  skip it if empty or comment
		 if (($lline != "") && (strpos($lline,"#") !== 0 )) { // strpos returns false if no match but gets weird. !== fixes it
				// debugprt("$ctr>NEW LINE= $lline");
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
				    debugprt("<p>author=" . $auth);
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
			 	  		  
					  
	
				// --- IN NOTES
				// if at the start of notes, coming out of Bib, and we have a title and author, check the Database
		if (($innotes)  && ($auth !="") && ($tit != "") && ($inbib)){
				   $inbib = false; // turn off bibchecking
				   $needtocheckbook = false; // stop checking after this	
					  
			
			  
				debugprt("innote:$innotes inbib:$inbib auth:$auth tit:$tit needtocheck:$needtocheck");
			
				}
					
			
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
				//debugprt("$ctr> Line after trim INNOTES=" . $lline);
				
				// check for continuing tag: >> at beginning of line
		  		if (stripos($lline, ">>") === 0){
		  			$continuingTag = substr($lline,2) ;//. ",";
		  			$continuingTag = trim($continuingTag, "\n\r\t ,.");
		  			//debugprt("FOUND continuingTag: $continuingTag line $ctr = $lline");
		  			// zero out the line
		  			$lline = "";
		 		}
		 			
		 
				// --- get the page number
				if (strlen($lline) > 0){ //(($lline != "") && (strpos($lline,"--") != 1)){
					debugprt("Line $ctr after looking for continuing tag");
				  // get the page number if the slash isn't more than 12 in
				  if ((strpos($lline,"/") !== false) && (strpos($lline, "/") < 12)) {
				      $pagenumber = substr($lline, 0, strpos($lline, "/"));
				     // debugprt("$ctr> pagenumber = $pagenumber");
				  	}
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
				  // debugprt("<p>Cont after addslashes: $cont");
				   
				   //--- get tags
					$tagstring = "";
					if (strripos($lline, ">>") > 2){ // is there a tag? (Discount >> at start of line)
					    $rawtags = (substr($lline, strripos($lline, ">>") + 2, strlen($lline)));
					    //debugprt( "RAWTAGS BEFORE= rawtags");
					    $rawtags = trim($rawtags, "\n\r\t ,.");
					     //debugprt( "RAWTAGS AFTER=$rawtags");
						$tagstring = addslashes($rawtags);
						
						// add continuing tag, if any
						if ($continuingTag !== ""){
							$tagstring = $tagstring . "," . $continuingTag;
						}
						//debugprt( "<p>Tagstring found: " . $tagstring);
						}
					//debugprt("<p>Pagenumber: " . $pagenumber . " content: " . $cont . " bookid: " . $bid .  " tagstring: " . $tagstring . "</p>");
					
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
			   	//debugprt("Added continuing tag: $continuingTag");
			   }
			   $valuestring = ""; // build a string of values
			   // query = "insert into tags (tag, noteid, bookid) values (tag1,noteid,etc.),(tag2,noteid2,etc.);"
			   foreach($tagarray as $tag){
			   		$tag=trim($tag," \t\r\n\0,.");
			   		//debugprt("INSERTING TAG: |" . $tag . "| from tagstring: " . $tagstring);
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
		
			} // innote
		 } //line is not empty
	
   } // each line
   
   // --- update the new. Don't delete it, although it's being entirely overwritten except for bid
				
			 
			   // overwrite the old info
			   	  // notes just started so ke care of null bib info
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
				  if (!isset($dateUploaded)){$dateUploaded = "";}
			   // update books SET pub="Oxford Univ. Press" , city="Oxfford" where bookid=8;
								
		$query = "UPDATE `books` SET `author`='$author',`pub`='$pub',`date`='$date',`city`='$city',`title`='$tit',`translator`='$translator',`article`='$article',`vol`='$vol',`issue`='$issue',`misc`='$misc',`type`='$type',`tags`='$tags',`journal`='$journal',`container`='$container',`url`='$url',`project`='$project',`user`='$user',`nickname`='$nickname',`pages`='$pages',`note`='$note',`isbn`='$isbn',`parent`='$parent',`dateUploaded`='$dateUploaded' WHERE 'bookid'=$bid";					 
											 
										
							  $res = mysql_query ($query,$dbh);
					
		debugprt("RES=" . $res);
							  if (!$res) {
									  echo "<p class='error'>++Problem with database after attempt to add book: " . mysql_errno().": ". mysql_error ()."</p>";
									  debugprt("<p><b>++++ $tit NOT added</b>");
									  return -1;
								  } else {
									  debugprt("$tit  added.<BR>");
									  // get bookid from latest transaction
									  $bid = mysql_insert_id();
									  
									  }
		


debugprt("------------------OUT OF Multi-----");

?>
