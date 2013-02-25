<?php
$foldername= $_POST['foldername'];


   
$fh = fopen($myFile, 'w') or die("can't open file");
fwrite($fh, $texttowrite);
fclose($fh);

echo "Folder opened: " . $foldername;

?>