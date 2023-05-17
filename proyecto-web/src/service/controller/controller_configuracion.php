<?php
//configuracion de cors
require_once('../config/cors.php');
// dependencias
require_once('../domain/configuracion.php');
require_once('../data/consultas_configuracion.php');

//recibir objetos tipo json desde react
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (isset($_GET["consulta"])) {
  
  $consultaConfiguracion = new ConsultaConfiguracion();
  
  //identificar consulta
  switch ($_GET["consulta"]) {
    
    case 1: //Obtener configuracion

        if(isset($data["id_usuario"]) && !empty($data["id_usuario"])){

          $consultaConfiguracion->obtenerConfiguracion($data["id_usuario"]);

        }else{
        // respuesta si no envia parametros
        $json["id_usuario"] = $data["id_usuario"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
 
        }
       
      break;
    case 2: //editar

      if (isset($data["id_configuracion"]) && !empty($data["id_configuracion"]) 
      && isset($data["color"]) && !empty($data["color"])
      && isset($data["font_family"]) && !empty($data["font_family"])
      && isset($data["font_size"]) && !empty($data["font_size"])
      ) {
        //Ejecucion de procedimiento
        $configuracion = new  configuracion(0,$data["color"],$data["font_family"],$data["font_size"],0);
        $consultaConfiguracion->actualizarConfiguracion($usuario);
      } else {
        // respuesta si no envia parametros
        $json["id_configuracion"] = $data["id_configuracion"];
        $json["color"] = $data["color"];
        $json["font_family"] = $data["font_family"];
        $json["font_size"] = $data["font_size"];
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