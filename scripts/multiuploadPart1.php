<?php

error_reporting(E_ALL);
error_reporting (E_ALL ^ E_NOTICE);

ini_set("display_errors", 0);
ini_set('auto_detect_line_endings',true); // helps mac recognize unix line endings

// i explained this: http://www.hyperorg.com/blogger/2012/09/09/beginner2beginner-javascript-multi-file-upload-php-to-process-it/

debugprt("------------------------ MULTIUPLOAD---------------");

function debugprt($txt){
  // prints debug info. Lower the level the less prints. Higher = more inclusive
  // give a high number to minor comments
  $debug= false; 
  if ($debug){
    error_log($txt);
  }
}


$num_files = count($_FILES['userfiles']['name']);
debugprt("Number of files: $num_files");

//debugprt("isset:" . isset($_FILES['userfiles']);

// if (!preg_match("/(txt|opml)$/",$_FILES['upload']['name'][$i])) {
//         print "Text or OPML only...";
//         return;
//     }


$debugit=false;

//echo "<p>Count:" .  count($_FILES['userfiles']);
//debugprt("First file:" . $_FILES['userfiles']['name'][0];

//echo "<p>Error: " .  $_FILES['userfiles']['error'];

//----------- RESTORE FOR WORKING WITH NOTIO-01

//--------- debug

foreach ($_FILES["userfiles"]["tmp_name"] as $key ) {
   debugprt("file:" . $key);
}
//------------- END FOR debug

$s = ""; 
$sd= "";
$harray= array(); // array of html to return


// move them
//path is set in private/etc/php.ini
//$uploads_dir = 'uploadsToPhp'; // this folder needs to exist in folder where this php script lives

   $arrayofbooks = array();
// go through each file looking for auth and title to see if already in
foreach ($_FILES["userfiles"]["error"] as $key => $error) { 
    debugprt("key= " . $key);
	// turn each file into an array of lines
	
	    // is it opml?
	$sourcepath = $_FILES['userfiles']['name'][$key];
    $ext = pathinfo($sourcepath, PATHINFO_EXTENSION);
    debugprt( "Extension=" . $ext  . "filename: " . $sourcepath);
    // ---- IT's OPML so create the array of lines here
    if (strtoupper($ext) == "OPML"){
    	debugprt("IT's OPML");
        // include: http://stackoverflow.com/questions/2644199/pass-value-to-an-include-file-in-php
    	//include "parseOPMLInclude.php";
    	//$source = "test.opml";
 		require_once 'parseOPMLInclude.php';
 		$fcontent = buildOPMLArray($_FILES['userfiles']['tmp_name'][$key]); 	// buildOPML is function in include file. 
 											//$source is var in that file too
 											// Returns a string of content
 											// chr(251) stands for number of indents

 		debugprt("Raw OPML fcontent: ". $fcontent);
    }
    // not an OPML 
    else { 
    	  $fcontent = file_get_contents($_FILES['userfiles']['tmp_name'][$key]); // get the content of the file
    }
	
	
	
	
	

 
   $fcontent = preg_replace("/(\x0D|\x0A)/", "\n", $fcontent); // getthe line endings right - thank you, Andy Silva!
   $fcontent = str_replace("\xfb","",$fcontent); // get rid of weird characters
   $farray = explode("\n", $fcontent); // turn file into an array of lines 
   //$farray = file($_FILES['userfiles']['tmp_name'][$key], FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
   debugprt("New file has " . count($farray) . " lines");
   $farray = array_map("trim",$farray);
   $inbib = false;
   $auth=""; $title = ""; $titline=false;
   debugprt("file: " . $_FILES['userfiles']['name'][$key]);
   $ctr = 1;
   $needtocheckbook = true;
   // go through each file looking for author and title
	foreach($farray as $lline) {
	      $ctr = $ctr  + 1;
		  debugprt("CTR inside: " .$ctr . ":" . $lline);
		   // are we in biblio?
		  if ((strpos($lline,"::BIBLIO") !== false) || (strpos($lline,":: BIBLIO") !== false)) {
		  	$inbib = true;
		  	debugprt("IN BIB");
		  	}
		  //are we in notes?
		  if ((strpos($lline,"::NOTES") !== false) || (strpos($lline,":: NOTES") !== false)) {
		  $inbib = false;
		  debugprt("IN NOTES");
		  } 
		  $authline = strpos($lline, "AUTHOR=");
		  if (($authline !== false) && ($inbib ==true)){
			 $auth = substr($lline,strpos($lline,"=") + 1);
			 $auth = addslashes(trim($auth));
			 debugprt( "<p>Author: " . $auth);
		  }
		  $titline = strpos($lline, "TITLE=");
		  if (($titline !== false) && ($inbib ==true)){
			 //echo "<br>CTitle line: " . $lline;
			 $tit = substr($lline,strpos($lline,"=") + 1);
			 $tit = addslashes(trim($tit));
			 debugprt("tit=" . $tit);
		  }
		  
		  // if we have a title and author, check the Database
		  if (($auth !="") && ($tit != "") && ($inbib = true) && ($needtocheckbook == true)){
			 $needtocheckbook = false; // stop checking after this
			  $ctr = $ctr + 1;
			 debugprt("CTR=" . $ctr . " Checking for book. Auth: " . $auth . " Title: " . $tit);
			 $dbh = mysql_connect("127.0.0.1","david","nn");
			 // is there a notio database?
			 $database_name = "noterio";
			 if (!mysql_select_db($database_name)) {
			   echo "++ ERROR: " . mysql_errno().": ". mysql_error ()."";
			   }
			   // there is a database and we have auth and tit
			   else {	
					$query = "SELECT bookid FROM books WHERE title='" . $tit . "' AND author='" . $auth . "'";
					debugprt("<p>QUERY= $query");
					//$query = "SELECT bookid FROM books WHERE title='" . $tit . "'";
					$res = mysql_query($query) or die(mysql_error()); // do the query
					if ($debugit){echo "<p>RES:" . $res;}
					if ($debugit){echo "<p>RES ROWS: " . mysql_num_rows($res);}
					// if we found the book in the database
					if (mysql_num_rows($res) > 0) { // if there's already a record
					   if ($debugit){ echo "<p>has rows";}
					   //$res = mysql_query($query,$dbh);
					   // if we found the book in the db, get the bookid
						while ($thearray = mysql_fetch_array($res)) {
							  if ($debugit){ echo "<p>-starting extraction";}
							  extract ($thearray);
							  $bid = $bookid ;	
							  debugprt("Bookid after query: " . $bid);
							   }
						 }
			   else { // have auth and tit but didn't find it in the db, so set bookid = -1
				    $bid = -1; // there is no existing bookid because it's a new book
				  // return -1;
			   }
			// We have an auth and tit, and either we found it in the db or not, so stick it into bookarray
			if ($debugit){echo "<p>2nd ctr=" . $ctr;}
			// path is set in private/etc/php.ini
	        $pathToTmp =  $_FILES["userfiles"]["tmp_name"][$key];
	        $pathToMovedFile = "./uploadsToPhp/" . $_FILES['userfiles']['name'][$key];
	        move_uploaded_file($pathToTmp, $pathToMovedFile);
	      // debugprt("PathToTmp=" . $pathToTmp);
	       //debugprt("PathToMovedFile=" . $pathToMovedFile);
	        unset($linearray);
	       // echo "AUTHOR: " . $auth . " CTR=" . $ctr;
	        $linearray["bookid"] = $bid;
	        $linearray["author"] = $auth;
	        $linearray["title"] = $tit;
	        debugprt("Title going into linearray: $tit");
	        $linearray["fpath"] = $pathToMovedFile;
	        // add this book's array to the overall array of books	  
			$arrayofbooks[] = $linearray;  
			} // found author and title (and there is a database)
			  
		   } // if we have an author and title in the file
		  
		   } // have gone through one file line by line
	 } // foreach notefile

echo json_encode($arrayofbooks);

debugprt("Number of items in arrrayofbooks: " . sizeof($arrayofbooks));
debugprt("first title in arrayofbooks: " . $arrayofbooks[0]["title"]);

debugprt("------------------OUT OF Multi-----");

?>
