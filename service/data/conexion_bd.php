<?php
//evita que php escriba errores en pantalla
//error_reporting(0);

class ConexionBD
{

  private $servidor;
  private $baseDatos;
  private $usuario;
  private $clave;
  private $conexion;


  public function __construct()
  {
    $this->servidor = "localhost";
    $this->usuario = "root";
    $this->clave = "";
    $this->baseDatos = "bd_sigea";
  }

  public function abrirConexion()
  {
    try {
      $this->conexion  = new PDO("mysql:host={$this->servidor};dbname={$this->baseDatos}", $this->usuario, $this->clave, array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
      ));

      /* $this->conexion->exec('set names utf8');
      $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); */

      //echo "Conectado a {$this->baseDatos} a {$this->servidor} exitosamente.";
    } catch (PDOException $error) {

      die("No se pudo conectar a la base de datos {$this->baseDatos} :" . $error->getMessage());
    }
    finally{
      return  $this->conexion;
    }
  }

  public function cerrarConexion()
  {
    $this->conexion =  NULL;
  }
}