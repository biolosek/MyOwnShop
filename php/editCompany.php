<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
    $stmt = $dbh->prepare("UPDATE `users_companies` SET name=:name, nip=:nip, adress=:adress, postalcode=:postalcode, city=:city WHERE company_id=:company_id AND account_id=:account_id");
    $stmt->bindValue(':company_id', $data['company_id']);
    $stmt->bindValue(':name', $data['name']);
    $stmt->bindValue(':nip', $data['nip']);
    $stmt->bindValue(':adress', $data['adress']);
    $stmt->bindValue(':postalcode', $data['postalcode']);
    $stmt->bindValue(':city', $data['city']);
    $stmt->bindValue(':account_id', $data['account_id']);
    $stmt->execute();
  } catch (PDOException $e) {
    if (strpos($e->getMessage(), "for key 'nip'") !== false) {
        echo 'Duplicate nip entry';
        exit;
  } else {
        throw $e;
      }
  }
  echo 'Success';

?>
