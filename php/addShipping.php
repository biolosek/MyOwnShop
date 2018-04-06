<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
    $stmt = $dbh->prepare("INSERT INTO `shipping_adresses` (`shipping_adress_id`, `name`, `data`, `adress`, `postalcode`, `city`, `account_id`)
      VALUES (NULL, :name, :data, :adress, :postalcode, :city, :account_id)");
    $stmt->bindValue(':name', $data['name']);
    $stmt->bindValue(':data', $data['data']);
    $stmt->bindValue(':adress', $data['adress']);
    $stmt->bindValue(':postalcode', $data['postalcode']);
    $stmt->bindValue(':city', $data['city']);
    $stmt->bindValue(':account_id', $data['account_id']);
    $stmt->execute();
  } catch (PDOException $e) {
          throw $e;
  }
  echo 'Success';

?>
