<?php
$hostname='localhost';
$username='root';
$password='';

try {
    $dbh = new PDO("mysql:host=$hostname;dbname=myshop",$username,$password);

    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // <== add this line
} catch (PDOException $e) {
      echo $e->getMessage();
    }
?>
