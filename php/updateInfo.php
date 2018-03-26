<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
  $stmt = $dbh->prepare("SELECT * from accounts WHERE username=:username");
  $stmt->bindParam(':username', $data['username']);
  $stmt->execute();
  } catch (PDOException $e) {
          throw $e;
      }

  $rows = $stmt->rowCount();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if ($rows === 1){
    try {
    $stmt = $dbh->prepare("UPDATE accounts SET firstname=:firstname, lastname=:lastname, email=:email, city=:city, postalcode=:postalcode, adress=:adress, country=:country WHERE username=:username and account_id=:account_id");
    $stmt->bindParam(':account_id', $data['account_id']);
    $stmt->bindParam(':firstname', $data['firstname']);
    $stmt->bindParam(':lastname', $data['lastname']);
    $stmt->bindParam(':username', $data['username']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':city', $data['city']);
    $stmt->bindParam(':postalcode', $data['postalcode']);
    $stmt->bindParam(':adress', $data['adress']);
    $stmt->bindParam(':country', $data['country']);
    $stmt->execute();
    $stmt->execute();
    } catch (PDOException $e) {
            throw $e;
        }
        echo "Success";
  } else {
    echo "Something went wrong";
    exit;
  }


?>
