<?php

if(empty($_POST['filename']) || empty($_POST['content'])){
    echo "Missing filename or content";
    error_log("Missing filename or content");
	exit;
}

$filename = preg_replace('/[^a-z0-9\-\_\.]/i','',$_POST['filename']);

header("Cache-Control: ");
header("Content-type: text/plain");
header('Content-Disposition: attachment; filename="'.$filename.'"');
error_log("filename downloaded: $filename");

// backslashes come through as doubled. Replace with singles
$cont = ($_POST['content']);
$cont2 = str_replace('\\\\','\\',$cont);

echo $cont2;

?>