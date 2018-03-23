<?php
$hostname='localhost';
$username='root';
$password='';

try {
    $dbh = new PDO("mysql:host=$hostname;dbname=myshop",$username,$password);
    $dbh->query ('SET NAMES utf8');
    $dbh->query ('SET CHARACTER_SET utf8_unicode_ci');
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
      echo $e->getMessage();
    }
?>
