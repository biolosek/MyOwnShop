<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
  $stmt = $dbh->prepare("SELECT orders_products.*, products.name as product_name from orders_products LEFT JOIN products ON orders_products.product_id = products.product_id WHERE order_id = :order_id");
  $stmt->bindValue(':order_id', $data['order_id']);
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
