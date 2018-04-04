<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

// print_r($data);
// print_r($data['cartdata']);
// print_r($data['user']);
foreach ($data['cartdata'] as $product => $info) {
    foreach ($info as $info) {
        echo $info."\n";
    }
}
exit;

try {
    $stmt = $dbh->prepare("INSERT INTO `accounts` (`account_id`, `firstname`, `lastname`, `username`, `password`, `email`, `city`, `postalcode`, `adress`, `country`, `role`)
      VALUES (NULL, :firstname, :lastname, :username, :password, :email, :city, :postalcode, :adress, :country, 0)");
    $stmt->bindValue(':firstname', $data['firstname']);
    $stmt->bindValue(':lastname', $data['lastname']);
    $stmt->bindValue(':username', $data['username']);
    $stmt->bindValue(':password', password_hash($data['password'], PASSWORD_DEFAULT));
    $stmt->bindValue(':email', $data['email']);
    $stmt->bindValue(':city', $data['city']);
    $stmt->bindValue(':postalcode', $data['postalcode']);
    $stmt->bindValue(':adress', $data['adress']);
    $stmt->bindValue(':country', $data['country']);
    $stmt->execute();
  } catch (PDOException $e) {
      if (strpos($e->getMessage(), "for key 'login'") !== false) {
          echo 'Duplicate login entry';
          exit;
    } if (strpos($e->getMessage(), "for key 'email'") !== false) {
          echo 'Duplicate e-mail entry';
          exit;
    } else {
          throw $e;
      }
  }
  echo 'Success';

?>
