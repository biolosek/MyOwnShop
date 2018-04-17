<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

  try {
      $stmt = $dbh->prepare("INSERT INTO `orders` (`order_id`, `invoice_name`, `invoice_company_name`, `invoice_nip`, `invoice_adress`, `invoice_postalcode`, `invoice_city`, `shipping_name`, `shipping_adress`, `shipping_postalcode`,
        `shipping_city`, `user_company`, `user_shipping`, `account_id`, `total`, `payment_status`, `shipping_status`, `date_placed`)
        VALUES (NULL, :invoice_name, :invoice_company_name, :invoice_nip, :invoice_adress, :invoice_postalcode, :invoice_city, :shipping_name, :shipping_adress, :shipping_postalcode, :shipping_city, :user_company, :user_shipping, :account_id, :total, :payment_status, :shipping_status, NOW())");
      $stmt->bindValue(':invoice_name', $data['invoice_name']);
      $stmt->bindValue(':invoice_company_name', $data['invoice_company_name']);
      $stmt->bindValue(':invoice_nip', $data['invoice_nip']);
      $stmt->bindValue(':invoice_adress', $data['invoice_adress']);
      $stmt->bindValue(':invoice_postalcode', $data['invoice_postalcode']);
      $stmt->bindValue(':invoice_city', $data['invoice_city']);
      $stmt->bindValue(':shipping_name', $data['shipping_name']);
      $stmt->bindValue(':shipping_adress', $data['shipping_adress']);
      $stmt->bindValue(':shipping_postalcode', $data['shipping_postalcode']);
      $stmt->bindValue(':shipping_city', $data['shipping_city']);
      $stmt->bindValue(':user_company', $data['user_company']);
      $stmt->bindValue(':user_shipping', $data['user_shipping']);
      $stmt->bindValue(':account_id', $data['account_id']);
      $stmt->bindValue(':total', $data['total']);
      $stmt->bindValue(':payment_status', $data['payment_status']);
      $stmt->bindValue(':shipping_status', $data['shipping_status']);
      $stmt->execute();
    } catch (PDOException $e) {
            throw $e;
    }
  try {
      $stmt = $dbh->prepare("SELECT MAX(order_id) as order_id FROM orders");
      $stmt->execute();
    } catch (PDOException $e) {
      throw $e;
    }

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data['cartdata'] as $rows) {
      try{
        $stmt = $dbh->prepare("INSERT INTO `orders_products` (`order_product_id`, `product_id`, `quantity`, `price`, `price_total`, `order_id`)
        VALUES(NULL, :product_id, :quantity, :price, (:price * :quantity), :order_id)");
        $stmt->bindValue(':product_id', $rows['product_id']);
        $stmt->bindValue(':quantity', $rows['count']);
        $stmt->bindValue(':price', $rows['price']);
        $stmt->bindValue(':order_id', $result[0]['order_id']);
        $stmt->execute();
      }
      catch (PDOException $e) {
              throw $e;
      }
    }
    echo 'Success';
?>
