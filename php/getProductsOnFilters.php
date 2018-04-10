<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

$categories = implode(',', $data['categories']);
$brands = implode(',', $data['brands']);

if (strlen($categories) != 0 && strlen($brands) == 0) {
  try {
    $stmt = $dbh->prepare("SELECT products.*, products_categories.name as category_name, brands.name as brand_name from products LEFT JOIN products_categories ON products.category = products_categories.category_id LEFT JOIN brands ON products.brand = brands.brand_id WHERE products.category IN (".$categories.")");
    $stmt->execute();
    } catch (PDOException $e) {
            throw $e;
        }

    $rows = $stmt->rowCount();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result);

    echo $json;
    exit;
}
if (strlen($categories) == 0 && strlen($brands) != 0) {
  try {
    $stmt = $dbh->prepare("SELECT products.*, products_categories.name as category_name, brands.name as brand_name from products LEFT JOIN products_categories ON products.category = products_categories.category_id LEFT JOIN brands ON products.brand = brands.brand_id WHERE products.brand IN (".$brands.")");
    $stmt->execute();
    } catch (PDOException $e) {
            throw $e;
        }

    $rows = $stmt->rowCount();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result);

    echo $json;
    exit;
}
if (strlen($categories) != 0 && strlen($brands) != 0) {

  try {
    $stmt = $dbh->prepare("SELECT products.*, products_categories.name as category_name, brands.name as brand_name from products LEFT JOIN products_categories ON products.category = products_categories.category_id LEFT JOIN brands ON products.brand = brands.brand_id WHERE products.category IN (".$categories.") AND products.brand IN (".$brands.")");
    $stmt->execute();
    } catch (PDOException $e) {
            throw $e;
        }

    $rows = $stmt->rowCount();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result);

    echo $json;
    exit;
}
if (strlen($categories) == 0 && strlen($brands) == 0){
  try {
    $stmt = $dbh->prepare("SELECT products.*, products_categories.name as category_name, brands.name as brand_name from products LEFT JOIN products_categories ON products.category = products_categories.category_id LEFT JOIN brands ON products.brand = brands.brand_id WHERE products.quantity > 0 AND products.active = 1");
    $stmt->execute();
    } catch (PDOException $e) {
            throw $e;
        }

    $rows = $stmt->rowCount();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result);

    echo $json;
    exit;
    }
else {
  echo "Something went wrong";
}



?>
