<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
    $stmt = $dbh->prepare("INSERT INTO `users_companies` (`company_id`, `name`, `nip`, `adress`, `postalcode`, `city`, `account_id`)
      VALUES (NULL, :name, :nip, :adress, :postalcode, :city, :account_id)");
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
