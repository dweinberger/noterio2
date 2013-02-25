<?php


	
	$user = $_GET['user'];
	$dbh = mysql_connect("127.0.0.1","david","nn");
    $link = mysql_select_db("noterio");
    $query = "select name,description from projects where user='$user'";
	$res = mysql_query($query,$dbh);

    	if (!$res) {
		echo mysql_errno().": ". mysql_error()."";
		return mysql_error();
		}
	

    $arrayofrows = array();
  
  while ($row = mysql_fetch_assoc($res)) {
  		extract ($row);
  		$rowarray = array();
  		$rowarray["name"] = $name;
  		$rowarray["description"] = $description;
		array_push($arrayofrows, $rowarray);
	}

  echo json_encode($arrayofrows);

?>