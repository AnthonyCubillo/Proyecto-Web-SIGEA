<?php 
require_once('activo.php');
class Alerta extends Activo{

private $id_alerta;
private $fecha;
private $tipo_alerta;

public function __construct($n_etiqueta, $marca, $modelo, $serie, $descripcion,
 $id_ubicacion, $nombre_ubicacion, $valor_libro, $condicion, $clase_activo, $id_funcionario, $nombre_funcionario,
 $fecha, $tipo_alerta,  $id_alerta){

  parent::__construct($n_etiqueta, $marca, $modelo, $serie, $descripcion, 
    $id_ubicacion, $nombre_ubicacion,
    $valor_libro, $condicion, $clase_activo, $id_funcionario, $nombre_funcionario);

  $this->fecha = $fecha;
  $this->tipo_alerta = $tipo_alerta;
  $this->id_alerta = $id_alerta;
}

public function getFecha()
{
  return $this->fecha;
}
public function setFecha($fecha)
{
  $this->fecha = $fecha;
}

public function getTipo_alerta()
{
  return $this->tipo_alerta;
}
public function setTipo_alerta($tipo_alerta)
{
  $this->tipo_alerta = $tipo_alerta;
}

public function getId_alerta()
{
  return $this->id_alerta;
}

public function setId_alerta($id_alerta)
{
  $this->id_alerta = $id_alerta;
}

}
?>