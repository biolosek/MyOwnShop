<?php
include_once 'config.php';

try {
    $stmt = $dbh->prepare("SELECT * from countries");
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
?>
