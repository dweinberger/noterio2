<?php

// CREATE BACKUP - DOESN'T WORK

$database_name =  $_POST['gdatabase'];
$backuppath = $_POST['backuppath'];

//$resp = shell_exec('mysqldump --databases TESTDB --result-file=/Users/davidmac2/Sites/notio/TESTDBBAK5 --user=_mysql');

//echo rootpass |sudo "/usr/sbin/useradd -d /home/username -m -p userspassword username"

$//resp= shell_exec('cp -R /Users/davidmac2/Sites/notio/notio.css /Users/davidmac2/Sites/notio/notio_backup.css');
//$resp= shell_exec("echo nn | sudo mysqldump --databases notio --result-file=/Users/davidmac2/Sites/notio/NOTIOBAK735 --user=root");
$resp= shell_exec("/Users/davidmac2/Sites/notio/savebackup.command");
 echo $resp;
?>