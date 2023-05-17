<?php 

class Usuario {

  private $id;
  private $dni;
  private $nombre;
  private $email;
  private $clave;

  public function __construct($id, $dni, $nombre, $email, $clave){
    $this->id = $id;
    $this->dni = $dni;
    $this->nombre = $nombre;
    $this->email = $email;
    $this->clave = $clave;
  }

  public function getId()
  {
    return $this->id;
  }
  public function setId($id)
  {
    $this->id = $id;
  }

  public function getDni()
  {
    return $this->dni;
  }
  public function setDni($dni)
  {
    $this->dni = $dni;
  }

  public function getNombre()
  {
    return $this->nombre;
  }
  public function setNombre($nombre)
  {
    $this->nombre = $nombre;
  }

  public function getEmail()
  {
    return $this->email;
  }
  public function setEmail($email)
  {
    $this->email = $email;
  }

  public function getClave()
  {
    return $this->clave;
  } 
  public function setClave($clave)
  {
    $this->clave = $clave;
  }
}


?>