<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
    $stmt = $dbh->prepare("DELETE FROM users_companies WHERE company_id=:company_id AND account_id=:account_id;");
    $stmt->bindValue(':company_id', $data['company_id']);
    $stmt->bindValue(':account_id', $data['account_id']);
    $stmt->execute();
  } catch (PDOException $e) {
          throw $e;
  }
  echo 'Success';

?>
