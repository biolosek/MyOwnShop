<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
    $stmt = $dbh->prepare("DELETE FROM shipping_adresses WHERE shipping_adress_id=:shipping_adress_id AND account_id=:account_id;");
    $stmt->bindValue(':shipping_adress_id', $data['shipping_adress_id']);
    $stmt->bindValue(':account_id', $data['account_id']);
    $stmt->execute();
  } catch (PDOException $e) {
          throw $e;
  }
  echo 'Success';

?>
