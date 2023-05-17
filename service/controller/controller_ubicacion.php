<?php
//configuracion de cors
require_once('../config/cors.php');
// dependencias
require_once('../domain/ubicacion.php');
require_once('../data/consultas_ubicacion.php');

//recibir objetos tipo json desde react
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (isset($_GET["consulta"])) {
  
  $consultaUbicacion = new ConsultaUbicacion();

  //identificar consulta
  switch ($_GET["consulta"]) {

    case 1: //listar

        //Ejecucion de procedimiento
        $consultaUbicacion->listarUbicaciones();

      break;

    case 2: //insertar

      if (isset($data["nombre_ubicacion"]) && !empty($data["nombre_ubicacion"]) 
      && isset($data["descripcion_ubicacion"])) {
        //Ejecucion de procedimiento
        $ubicacion = new Ubicacion( 0 , $data["nombre_ubicacion"], $data["descripcion_ubicacion"]);
        $consultaUbicacion->insertarUbicacion($ubicacion);
        
      } else {
        // respuesta si no envia parametros
        $json["nombre_ubicacion"] = $data["nombre_ubicacion"];
        $json["descripcion_ubicacion"] = $data["descripcion_ubicacion"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
        
      }

      break;

    case 3: //editar

      if (isset($data["id_ubicacion"]) && !empty($data["id_ubicacion"]) 
      && isset($data["nombre_ubicacion"]) && !empty($data["nombre_ubicacion"])
      && isset($data["descripcion_ubicacion"]) ) {
        //Ejecucion de procedimiento
        $ubicacion = new Ubicacion( $data["id_ubicacion"], $data["nombre_ubicacion"], $data["descripcion_ubicacion"]);
        $consultaUbicacion->actualizarUbicacion($ubicacion);
        
      } else {
        // respuesta si no envia parametros
        $json["id_ubicacion"] = $data["id_ubicacion"];
        $json["nombre_ubicacion"] = $data["nombre_ubicacion"];
        $json["descripcion_ubicacion"] = $data["descripcion_ubicacion"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
        
      }

      break;

    case 4: //eliminar


      if (isset($data["id_ubicacion"]) && !empty($data["id_ubicacion"]) ) {
        //Ejecucion de procedimiento
        $consultaUbicacion->eliminarUbicacion($data["id_ubicacion"]);
        
      } else {
        // respuesta si no envia parametros
        $json["id_ubicacion"] = $data["id_ubicacion"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
        
      }
      
      break;
  }
} else {

  $respuesta["consulta"] = $_GET["consulta"];
  $respuesta["mensaje"] = "Debe ingresar la opcion de consulta!";
  $json = $respuesta;

  echo json_encode($json);
}