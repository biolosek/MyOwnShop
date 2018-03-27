<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
  $stmt = $dbh->prepare("SELECT * from products WHERE product_id=:product_id");
  $stmt->bindValue(':product_id', $data['product_id']);
  $stmt->execute();
  } catch (PDOException $e) {
          throw $e;
      }

  $rows = $stmt->rowCount();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($result);

  if ($rows > 0){
      echo $json;
      exit;
    }
  else {
    echo 'Something went wrong';
    exit;
  }

?>
