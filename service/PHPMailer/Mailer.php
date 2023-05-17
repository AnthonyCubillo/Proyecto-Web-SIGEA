<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

include 'PHPMailer.php';
include 'Exception.php';
include 'SMTP.php';


function bodyMail($claveTemporal)
{

  $body = '
  <html lang="es">
  <head>
    <meta charset="UTF-8" />

    <style type="text/css">
      @font-face {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 400;
        src: local("Open Sans"), local("OpenSans"),
          url(http://themes.googleusercontent.com/static/fonts/opensans/v6/cJZKeOuBrn4kERxqtaUH3T8E0i7KZn-EPnyo3HZu7kw.woff)
            format("woff");
      }

      body {
        color: #333;
        font-family: "Open Sans", sans-serif;
        margin: 0px;
        font-size: 16px;
      }

      .container{
        margin-top: 50px;
      }

      .table{
        width: 600px;
        height: 400px;
        margin: 0 auto;
        text-align: center;
        background: #ECF0F1;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .head-table td{
        padding: 10px 0;
        font-size: 28px;
        background-color: #333;
        color: white;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      .logo{
        text-align: center;
      }

      .logo img{
        margin-top: 10px;
        width: 70px;
        height: 70px;
      }

      .body-table-text{
        font-size: 16px;
      }

      .body-table-warning{
        color: red;
        text-align: justify;
      }

      .warning-text{
        margin: 0px 70px 0px 70px;
      }

      .body-table-warning div{
        text-align: center;
        margin: 0 auto;
      }

      .footer-table {
        font-size: 12px;
        color: #999797;
        padding: 20px;
      }
      
      #copy-div {
        text-align: center;
        margin: 0px 100px 0px 100px;
        padding: 10px;
        border-radius: 5px;
        background-color: #F7F9F9;
        cursor: pointer;
      }
      
      #copy-text {
        margin: 0;
        padding-right: 8px;
        font-size: 16px;
        line-height: 24px;
      }
      
    </style>
  </head>
  <body>

    <div class="container">
      <table class="table">
      
        <tr class="head-table">
          <td>
            Recuperación de contraseña
          
          </td>
        </tr>

        <tr>
        <td class="logo">
          <img src="cid:logo"/>
        </td>
      </tr>
  
        <tr>
          <td class="body-table-text">
            <p>
              Para ingresar a su cuenta utilice la siguente contraseña: 
            </p>
          </td> 
        </tr>

        <tr>
          <td>
            <div id="copy-div" onclick="copyToClipboard()">
              <p id="copy-text">'.$claveTemporal.'</p>
            </div>
          </td>
        </tr>

        <tr class="body-table-warning">
          <td >
            <div> 
              <img src="cid:alerta"/>
            </div>
            <p class="warning-text">
              Recuerde que esta contraseña es temporal, por lo que debe cambiarla al ingresar a su cuenta. 
            </p>
          </td> 
        </tr>

        <tr>
          <td height="27" class="footer-table">
            Este email es una notificación automática, por favor no
            responda a este correo.
          </td>
        </tr>
      </table>
    </div>

  </body>
</html>

  ';


  return $body;
}

function enviarEmail($usuario, $body)
{
  //Datos de configuracion
  $fromMail = "campus.sarapiqui.sigea@gmail.com"; //correo remitente
  $fromMailPassword = "gxfdbzkvwjxmpkba"; //contraseña del correo remitente
  $fromName = "SIGEA"; //nombre del remitente

  try {
    $mail = new PHPMailer(true);

    //Server settings
    $mail->SMTPDebug = 0; //Ver detalles de la conexión, 0 para deshabilitar - 1 para habilitar
    $mail->isSMTP(); // Indicar que se utilizará SMTP para enviar el correo
    $mail->Host = "smtp.gmail.com"; // Especificar el servidor SMTP
    $mail->SMTPAuth = true; // Habilitar la autenticación SMTP
    $mail->Username = $fromMail; //Nombre de usuario SMTP
    $mail->Password = $fromMailPassword; //Contraseña del correo SMTP
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilitar la seguridad TLS
    $mail->Port = 587; // Puerto TCP para la conexión SMTP

    //Opciones de seguridad sin SSL, LOCAL
    $mail->SMTPOptions = array(
      'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
      )
    );

    //Opciones de seguridad SSL
    /*$mail->SMTPOptions = array(
      'ssl' => array(
        'verify_peer' => true,
        'verify_peer_name' => true,
        'allow_self_signed' => false
      )
    );*/


    //Recipients
    $mail->setFrom($fromMail, $fromName); //Agregar un remitente
    $mail->addAddress($usuario["email_usuario"], $usuario["nombre_usuario"]); //Agregar un destinatario
    
    $mail->addEmbeddedImage('../img/logo.png','logo');
    $mail->addEmbeddedImage('../img/alerta.png','alerta');
    
    // Contenido del correo
    $mail->isHTML(true);  // Habilitar el soporte para contenido HTML
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'Correo de recuperación - SIGEA'; //Asunto del correo
    $mail->Body    = $body; //contenido del correo
    $mail->isHTML(true);
  

    if ($mail->send()) {
      return true;
    } else {
      return false;
    }
  } catch (Exception $e) {
    //respuesta si al enviar el correo ocurrio un error
    echo "El mensaje no se pudo enviar.Error de correo: {$mail->ErrorInfo}";
    return false;
  }
}