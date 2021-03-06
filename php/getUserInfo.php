<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
  $stmt = $dbh->prepare("SELECT * from accounts WHERE username=:username and account_id=:account_id");
  $stmt->bindValue(':username', $data['username']);
  $stmt->bindValue(':account_id', $data['account_id']);
  $stmt->execute();
  } catch (PDOException $e) {
          throw $e;
      }

  $rows = $stmt->rowCount();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($result);

  if ($rows === 1){
      echo $json;
      exit;
    }
  else {
    echo 'Something went wrong';
    exit;
  }

?>
