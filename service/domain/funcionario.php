<?php 

class Funcionario {

  private $id;
  private $dni;
  private $nombre;
  private $estado;

  public function __construct2($id, $dni, $nombre){
    $this->id = $id;
    $this->dni = $dni;
    $this->nombre = $nombre;
  }
  public function __construct( $dni, $nombre, $estado){
    $this->dni = $dni;
    $this->nombre = $nombre;
    $this->estado = $estado;
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

  public function getEstado()
  {
    return $this->estado;
  }

  public function setEstado($estado)
  {
    $this->estado = $estado;
  }


}


?>