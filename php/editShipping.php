<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
    $stmt = $dbh->prepare("UPDATE `shipping_adresses` SET name=:name, data=:data, adress=:adress, postalcode=:postalcode, city=:city WHERE shipping_adress_id=:shipping_adress_id AND account_id=:account_id");
    $stmt->bindValue(':shipping_adress_id', $data['shipping_adress_id']);
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
