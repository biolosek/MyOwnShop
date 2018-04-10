<?php
include_once 'config.php';

try {
  $stmt = $dbh->prepare("SELECT products.*, products_categories.name as category_name, brands.name as brand_name from products LEFT JOIN products_categories ON products.category = products_categories.category_id LEFT JOIN brands ON products.brand = brands.brand_id WHERE products.quantity > 0 AND products.active = 1");
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
