<?php

$server = getenv('STAVROGIN_SERVER');
$usr = getenv('STAVROGIN_USR');
$pass = getenv('STAVROGIN_PASSWD');
$db = getenv('STAVROGIN_DB');

$dbLink = new mysqli($server, $usr, $pass, $db);
if ($dbLink->connect_errno) {
    echo "Failed to connect to MySQL: (" . $dbLink->connect_errno . ") " . $dbLink->connect_error;
    die();
} else {
    $handle = fopen("latinWords", "r");
   if ($handle) {
    while (($line = fgets($handle)) !== false) {
        $data = explode(',',$line);
     
        $latin = $data[0];
        $greek = $data[1];
        
        $greek = trim(preg_replace('/\s\s+/', '', $greek));
        
        $latin = mysqli_real_escape_string ( $dbLink ,$latin );
        $greek = mysqli_real_escape_string ( $dbLink ,  $greek );
        
        $qIns = " INSERT INTO `words`  ( `wor_langid`, `wor_word`,  `wor_added`) VALUES 
        (41,'".$latin."',CURRENT_DATE)";
        
        mysqli_query($dbLink,$qIns);
        echo mysqli_error($dbLink);
        $pKey = mysqli_insert_id($dbLink);
        
        $qTrans = " INSERT INTO `translations`(`tra_wordid`, `tra_meaning` ) 
         VALUES ('".$pKey."','".$greek."')";
      mysqli_query($dbLink,$qTrans);
      
              echo mysqli_error($dbLink);



      
    }

    fclose($handle);
} else {
    // error opening the file.
} 
}

?>
