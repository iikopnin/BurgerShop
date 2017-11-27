<?php
  $name = $_POST['user-name'];
  $phone = $_POST['user-phone'];
  $street = $_POST['street'];
  $house = $_POST['house'];
  $house_block = $_POST['house-block'];
  $flat = $_POST['flat'];
  $floor = $_POST['floor'];
  $user_review = $_POST['user-review'];
  $payment = $_POST['payment-option'];
  $disturb = $_POST['dont-disturb']; 
  $disturb = isset($disturb) ? 'НЕТ' : 'ДА';

  $mail_message = '
  <html>
    <head> 
      <title>Заказ</title> 
    </head>
    <body>
      <h2>Заказ</h2>
      <ul>
        <li>Имя: ' . $name . '</li>
        <li>Номер: ' . $phone . '</li>
        <li>Улица: ' . $street . '</li>
        <li>Дом: ' . $house . '</li>
        <li>Корпус: ' . $house_block . '</li>
        <li>Квартира: ' . $flat . '</li>
        <li>Этаж: ' . $floor . '</li>
        <li>Способ оплаты: ' . $payment . '</li>
        <li>Нужно ли перезванивать клиенту: ' . $disturb . '</li>
      </ul>
    </body>
  </html>';

  $headers = "From: Юный верстальщик <admin@loftschool.com>\r\n".
  "MIME-Version: 1.0" . "\r\n" .
  "Content-type: text/html; charset=UTF-8" . "\r\n";

  $mail = mail('iikopnin@gmail.com', 'Заказ', $mail_message, $headers);

  $data = [];

  if (mail) {
    $data['status'] = 'OK';
    $data['mes'] = 'Сообщение отправлено';
  } else {
    $data['status'] = 'NO';
    $data['mes'] = 'На сервере произошла ошибка';
  }
?>