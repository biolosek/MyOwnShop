<?php
ini_set('default_charset', 'utf-8');
header("Content-Type: text/html; charset=UTF-8");
include_once 'config.php';

print_r($_POST); exit;

try {
  $stmt = $dbh->prepare("INSERT INTO `accounts` (`account_id`, `firstname`, `lastname`, `login`, `password`, `email`, `city`, `postalcode`, `adress`, `country`, `role`)
    VALUES (NULL,'".$_POST['firstname']."','".$_POST['lastname']."','".$_POST['login']."',MD5('".$_POST['password']."'),'".$_POST['email']."','".$_POST['city']."','".$_POST['postalcode']."','".$_POST['adress']."','".$_POST['country']."', 0) ");
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
