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

  if ($rows === 1){
    if (password_verify($data['passwordold'], $result[0]['password'])) {
      try {
        $stmt = $dbh->prepare("UPDATE accounts SET password=:passwordnew  WHERE username=:username");
        $stmt->bindValue(':username', $data['username']);
        $stmt->bindValue(':passwordnew', password_hash($data['passwordnew'], PASSWORD_DEFAULT));
        $stmt->execute();
        } catch (PDOException $e) {
                throw $e;
            }
    echo "Success";
    exit;
  } else {
    echo "Incorrect password";
    exit;
  }} else {
    echo "Something went wrong";
    exit;
  }


?>
