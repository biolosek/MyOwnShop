<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
    $stmt = $dbh->prepare("INSERT INTO `accounts` (`account_id`, `firstname`, `lastname`, `username`, `password`, `email`, `city`, `postalcode`, `adress`, `country`, `role`)
      VALUES (NULL, :firstname, :lastname, :username, :password, :email, :city, :postalcode, :adress, :country, 0) ");
    $stmt->bindParam(':firstname', $data['firstname']);
    $stmt->bindParam(':lastname', $data['lastname']);
    $stmt->bindParam(':username', $data['username']);
    $stmt->bindParam(':password', password_hash($data['password'], PASSWORD_DEFAULT));
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':city', $data['city']);
    $stmt->bindParam(':postalcode', $data['postalcode']);
    $stmt->bindParam(':adress', $data['adress']);
    $stmt->bindParam(':country', $data['country']);
    $stmt->execute();
  } catch (PDOException $e) {
      if (strpos($e->getMessage(), "for key 'login'") !== false) {
          echo 'Duplicate login entry';
          exit;
      } if (strpos($e->getMessage(), "for key 'email'") !== false) {
          echo 'Duplicate e-mail entry';
          exit;
      }
      else {
          throw $e;
      }
  }
  echo 'Success';

?>
