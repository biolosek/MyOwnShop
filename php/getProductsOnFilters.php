<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

$categories = implode(',', $data['categories']);
$brands = implode(',', $data['brands']);

if (strlen($categories) != 0 && strlen($brands) == 0) {
  try {
    $stmt = $dbh->prepare("SELECT * from products WHERE category IN (".$categories.")");
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
    $stmt = $dbh->prepare("SELECT * from products WHERE brand IN (".$brands.")");
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
    $stmt = $dbh->prepare("SELECT * from products WHERE category IN (".$categories.") AND brand IN (".$brands.")");
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
    $stmt = $dbh->prepare("SELECT * from products WHERE quantity > 0 AND active = 1");
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
