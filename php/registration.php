<?php
include_once 'config.php';
$data = json_decode(file_get_contents("php://input"));

$firstname = $data->firstname;
$lastname = $data->lastname;
$login = $data->login;
$password = $data->password;
$email = $data->email;
$city = $data->city;
$postalcode = $data->postalcode;
$adress = $data->adress;
$country = $data->country;


try {
  $stmt = $dbh->prepare("INSERT INTO `accounts` (`account_id`, `firstname`, `lastname`, `login`, `password`, `email`, `city`, `postalcode`, `adress`, `country`, `role`)
    VALUES (NULL,'".$firstname."','".$lastname."','".$login."',MD5('".$password."'),'".$email."','".$city."','".$postalcode."','".$adress."','".$country."', 0) ");
    $stmt->execute();
  } catch (PDOException $e) {
      if (strpos($e->getMessage(), "for key 'login'") !== false) {
          echo 'Duplicate login entry';
          exit;
      } if (strpos($e->getMessage(), "for key 'email'") !== false) {
          echo 'Duplicate e-mail entry';
          exit;
      }
      else {
          throw $e;
      }
  }
  echo 'Success';

?>
