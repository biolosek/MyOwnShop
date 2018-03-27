<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
  $stmt = $dbh->prepare("SELECT * from accounts WHERE username=:username");
  $stmt->bindValue(':username', $data['username']);
  $stmt->execute();
  } catch (PDOException $e) {
          throw $e;
      }

  $rows = $stmt->rowCount();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($result);

  if ($rows === 1){
    if (password_verify($data['password'], $result[0]['password'])) {
      echo $json;
      exit;
    }
    else{
      echo 'Wrong password';
      exit;
    }}
  if ($rows === 0) {
    echo 'No account';
    exit;
  }
  else {
    echo 'Something went wrong';
    exit;
  }

?>
