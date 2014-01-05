<?php

// testing including the results of a function in another file
// http://stackoverflow.com/questions/2644199/pass-value-to-an-include-file-in-php
 $cont = array();
 $source = "test.opml";
 include "parseOPMLInclude.php";
 $cont = buildOPMLArray($source); // buildOPML is function in include file. $source is var in that file too
 echo "OPML: ". $cont;
?>