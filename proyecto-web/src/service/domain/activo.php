<?php 

class Activo{

  private $n_etiqueta;
  private $marca;
  private $modelo;
  private $serie;
  private $descripcion;
  private $id_ubicacion;
  private $nombre_ubicacion;
  private $valor_libro;
  private $condicion;
  private $clase_activo;
  private $id_funcionario;
  private $nombre_funcionario;

  public function __construct($n_etiqueta, $marca, $modelo, $serie, $descripcion,
   $id_ubicacion, $nombre_ubicacion, $valor_libro, $condicion, $clase_activo, $id_funcionario, $nombre_funcionario){
   
    $this->n_etiqueta = $n_etiqueta;
    $this->marca = $marca;
    $this->modelo = $modelo;
    $this->serie = $serie;
    $this->descripcion = $descripcion;
    $this->id_ubicacion = $id_ubicacion;
    $this->nombre_ubicacion = $nombre_ubicacion;
    $this->valor_libro = $valor_libro;
    $this->condicion = $condicion;
    $this->clase_activo = $clase_activo;
    $this->id_funcionario = $id_funcionario;
    $this->nombre_funcionario = $nombre_funcionario;

  }

  public function getN_etiqueta()
  {
    return $this->n_etiqueta;
  }
  public function setN_etiqueta($n_etiqueta)
  {
    $this->n_etiqueta = $n_etiqueta;
  }

  public function getMarca()
  {
    return $this->marca;
  }
  public function setMarca($marca)
  {
    $this->marca = $marca;
  }

  public function getModelo()
  {
    return $this->modelo;
  }
  public function setModelo($modelo)
  {
    $this->modelo = $modelo;
  }

  public function getSerie()
  {
    return $this->serie;
  }
  public function setSerie($serie)
  {
    $this->serie = $serie;
  }

  public function getDescripcion()
  {
    return $this->descripcion;
  }
  public function setDescripcion($descripcion)
  {
    $this->descripcion = $descripcion;
  }

  public function getId_ubicacion()
  {
    return $this->id_ubicacion;
  }
  public function setId_ubicacion($id_ubicacion)
  {
    $this->id_ubicacion = $id_ubicacion;

    return $this;
  }

  public function getNombre_ubicacion()
  {
    return $this->nombre_ubicacion;
  }
  public function setNombre_ubicacion($nombre_ubicacion)
  {
    $this->nombre_ubicacion = $nombre_ubicacion;
  }

  public function getValor_libro()
  {
    return $this->valor_libro;
  }
  public function setValor_libro($valor_libro)
  {
    $this->valor_libro = $valor_libro;
  }

  public function getCondicion()
  {
    return $this->condicion;
  }
  public function setCondicion($condicion)
  {
    $this->condicion = $condicion;
  }

  public function getClase_activo()
  {
    return $this->clase_activo;
  }
  public function setClase_activo($clase_activo)
  {
    $this->clase_activo = $clase_activo;
  }

  public function getid_funcionario()
  {
    return $this->id_funcionario;
  }
  public function setid_funcionario($id_funcionario)
  {
    $this->id_funcionario = $id_funcionario;
  }

  public function getNombre_funcionario()
  {
    return $this->nombre_funcionario;
  } 
  public function setNombre_funcionario($nombre_funcionario)
  {
    $this->nombre_funcionario = $nombre_funcionario;
  }

}

?>