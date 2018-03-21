<?php
include_once 'config.php';

try {
  $stmt = $dbh->query("SELECT * from accounts WHERE
login='".$_POST['login']."' && password='".  md5($_POST['password'])."'");

    $stmt->execute();

  } catch (PDOException $e) {
          throw $e;
      }

  $rows = $stmt->rowCount();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($result);

  if ($rows > 0){
    echo $json;

  } else{
      echo 'wrong';
  }
