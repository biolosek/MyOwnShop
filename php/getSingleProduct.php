<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

try {
  $stmt = $dbh->prepare("SELECT products.*, products_categories.name as category_name, brands.name as brand_name, GROUP_CONCAT(products_images.source) as images from products LEFT JOIN products_categories ON products.category = products_categories.category_id LEFT JOIN brands ON products.brand = brands.brand_id LEFT JOIN products_images ON products_images.product_id = products.product_id WHERE products.quantity > 0 AND products.active = 1 AND products.product_id = :product_id");
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
