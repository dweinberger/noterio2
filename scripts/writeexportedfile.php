<?php
$texttowrite= $_POST['content'];
$myFile = $_POST['filename'];
if ($myFile == "") {
   $myFile =  "exportedtest.txt";
   }
   else {
   $myFile = $myFile . ".txt";
   }
   
$fh = fopen($myFile, 'w') or die("can't open file");
fwrite($fh, $texttowrite);
fclose($fh);

echo "Text file written: " . $myFile;

?>