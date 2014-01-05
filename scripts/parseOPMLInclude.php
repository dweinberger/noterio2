<?php

// parsing opml test. Designed to be included in AddToDB.php
// http://www.php.net/manual/en/example.xml-structure.php
// explanation: http://www.hashbangcode.com/blog/parsing-xml-php-469.html

$allthetext="";

function startElement($parser, $name, $attrs) 
{
   if ($name == "OUTLINE"){

    global $depth;
    // add indents
    $tabs = "";
    for ($i = 0; $i < $depth[$parser]; $i++) {
        $tabs=  $tabs . chr(251);
    	}
    //echo  $attrs[TEXT]. "<br>";
    // prepend tabs and push text attribute into array
    	$GLOBALS["allthetext"]=$GLOBALS["allthetext"]. "\n" . $tabs . $attrs[TEXT];
    //echo "<br>ALLTEXT=$allthetext";
    $depth[$parser]++;
 }
}

function endElement($parser, $name) 
{
    global $depth;
    $depth[$parser]--;
}


function buildOPMLArray($source){
	 $xml=simplexml_load_file($source);
	 $xml_parser = xml_parser_create();
	 xml_set_element_handler($xml_parser, "startElement", "endElement");
	 if (!($fp = fopen($source, "r"))) {
		 die("could not open XML input");
	 }

	 while ($data = fread($fp, 4096)) {
		 if (!xml_parse($xml_parser, $data, feof($fp))) {
			 die(sprintf("XML error: %s at line %d",
						 xml_error_string(xml_get_error_code($xml_parser)),
						 xml_get_current_line_number($xml_parser)));
		 }
	 }
	 xml_parser_free($xml_parser);
	 //return "TESTSTSTS";
	 //echo "<br>GLOBAL=" . $GLOBALS["allthetext"];
	 return $GLOBALS["allthetext"]; // this is what addtodb.php needs
}

?>