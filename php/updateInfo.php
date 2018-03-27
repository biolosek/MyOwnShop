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
    try {
    $stmt = $dbh->prepare("UPDATE accounts SET firstname=:firstname, lastname=:lastname, email=:email, city=:city, postalcode=:postalcode, adress=:adress, country=:country WHERE username=:username and account_id=:account_id");
    $stmt->bindValue(':account_id', $data['account_id']);
    $stmt->bindValue(':firstname', $data['firstname']);
    $stmt->bindValue(':lastname', $data['lastname']);
    $stmt->bindValue(':username', $data['username']);
    $stmt->bindValue(':email', $data['email']);
    $stmt->bindValue(':city', $data['city']);
    $stmt->bindValue(':postalcode', $data['postalcode']);
    $stmt->bindValue(':adress', $data['adress']);
    $stmt->bindValue(':country', $data['country']);
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
