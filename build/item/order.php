<?php
$name = stripslashes(htmlspecialchars($_POST['name']));
$phone = stripslashes(htmlspecialchars($_POST['phone']));

if($_GET['product_id']){
    $product_id = $_GET['product_id'];
}else {
    $product_id = $_POST['product_id'];
}
if(empty($name) || empty($phone)){
    
}else{
    $subject = "Order";
    $addressat = "adress";
$succes_url = './form-ok.php?name='.$_POST['name'].'&phone='.$_POST['phone'].'';
    header('Location: '.$succes_url);
}
?>