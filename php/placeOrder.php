<?php
include_once 'config.php';

$data = file_get_contents("php://input");
$data = json_decode($data, true);

print_r($data);
exit;

try {
    $stmt = $dbh->prepare("INSERT INTO `orders` (`order_id`, `invoice_name`, `invoice_company_name`, `invoice_nip`, `invoice_adress`, `invoice_postalcode`, `invoice_city`, `shipping_name`, `shipping_adress`, `shipping_postalcode`,
      `shipping_city`, `user_company`, `user_shipping`, `account_id`, `total`, `payment_status`, `shipping_status`)
      VALUES (NULL, :invoice_name, :invoice_company_name, :invoice_nip, :invoice_adress, :invoice_postalcode, :invoice_city, :shipping_name, :shipping_adress, :shipping_postalcode, :shipping_city, :user_company, :user_shipping, :account_id, :total, :payment_status, :shipping_status)");
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
  echo 'Success';

?>
