<?php

// parsing opml test
// http://www.php.net/manual/en/example.xml-structure.php
// explanation: http://www.hashbangcode.com/blog/parsing-xml-php-469.html



function startElement($parser, $name, $attrs) 
{
   if ($name == "OUTLINE"){
    global $depth;
    for ($i = 0; $i < $depth[$parser]; $i++) {
        echo "&nbsp;&nbsp;";
    }
  
  
    echo  $attrs[TEXT]. "<br>";
    
    $depth[$parser]++;
 }
}

function endElement($parser, $name) 
{
    global $depth;
    $depth[$parser]--;
}


$xml=simplexml_load_file($file);
$xml_parser = xml_parser_create();
xml_set_element_handler($xml_parser, "startElement", "endElement");
if (!($fp = fopen($file, "r"))) {
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

?>