<?php

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

session_start();

if(empty($_POST)){
    $_POST = json_decode(file_get_contents('php://input'), true);
}
 
$name = $_POST['name'];
$phone = $_POST['phone'];
$products = $_POST['products'];
$products_list = array();

foreach ($products as $key => $product) {
        $products_list[$key] = array(
            'product_id' => $product['id'],    //код товара (из каталога CRM)
            'price'      => $product['price'], //цена товара 1
            'count'      => $product['count'], 
        );
    
}

//$products_list = array(
//    0 => array(
//            'product_id' => '1',    //код товара (из каталога CRM)
//            'price'      => '100', //цена товара 1
//            'count'      => '1',                     //количество товара 1
//    )
//);

$productss = urlencode(serialize($products_list));
$sender = urlencode(serialize($_SERVER));

$namee = urlencode(serialize($name));
$phonee = urlencode(serialize($phone));
// параметры запроса
$data = array(
    'key'             => 'a5d047a1b7c526beb3f61db113119c0a', //Ваш секретный токен
    'order_id'        => number_format(round(microtime(true)*10),0,'.',''), //идентификатор (код) заказа (*автоматически*)
    'country'         => 'UA',                         // Географическое направление заказа
    'office'          => '1',                          // Офис (id в CRM)
    'products'        => $productss,                    // массив с товарами в заказе
    'bayer_name'      => $name,            // покупатель (Ф.И.О)
    'phone'           => $phone,           // телефон
    'email'           => $_REQUEST['email'],           // электронка
    'comment'         => $_REQUEST['product_name'],    // комментарий
    'delivery'        => $_REQUEST['delivery'],        // способ доставки (id в CRM)
    'delivery_adress' => $_REQUEST['delivery_adress'], // адрес доставки
    'payment'         => '',                           // вариант оплаты (id в CRM)
    'sender'          => $sender,                        
    'utm_source'      => $_SESSION['utms']['utm_source'],  // utm_source
    'utm_medium'      => $_SESSION['utms']['utm_medium'],  // utm_medium
    'utm_term'        => $_SESSION['utms']['utm_term'],    // utm_term
    'utm_content'     => $_SESSION['utms']['utm_content'], // utm_content
    'utm_campaign'    => $_SESSION['utms']['utm_campaign'],// utm_campaign
    'additional_1'    => '',                               // Дополнительное поле 1
    'additional_2'    => '',                               // Дополнительное поле 2
    'additional_3'    => '',                               // Дополнительное поле 3
    'additional_4'    => ''                                // Дополнительное поле 4
);
// запрос
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'http://kospetrovich.lp-crm.biz/api/addNewOrder.html');
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
$out = curl_exec($curl);
echo $out;
//echo json_encode($_POST['products'], true);
curl_close($curl);
//$out – ответ сервера в формате JSON
?>
