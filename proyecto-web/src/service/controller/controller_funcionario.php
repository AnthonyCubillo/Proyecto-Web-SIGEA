<?php
//configuracion de cors
require_once('../config/cors.php');
// dependencias
require_once('../domain/funcionario.php');
require_once('../data/consultas_funcionario.php');

//recibir objetos tipo json desde react
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (isset($_GET["consulta"])) {
  
  $consultaFuncionario = new ConsultaFuncionario();

  //identificar consulta
  switch ($_GET["consulta"]) {

    case 1: //listar

        //Ejecucion de procedimiento
        $consultaFuncionario->listarFuncionarios();

      break;

    case 2: //insertar

      if (isset($data["nombre_funcionario"]) && !empty($data["nombre_funcionario"]) 
      && isset($data["dni_funcionario"]) && !empty($data["dni_funcionario"])) {
        //Ejecucion de procedimiento
        $funcionario = new Funcionario( 0 , $data["dni_funcionario"], $data["nombre_funcionario"]);
        $consultaFuncionario->insertarFuncionario($funcionario);
        
      } else {
        // respuesta si no envia parametros
        $json["dni_funcionario"] = $data["dni_funcionario"];
        $json["nombre_funcionario"] = $data["nombre_funcionario"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
        
      }

      break;

    case 3: //editar

      if (isset($data["id_funcionario"]) && !empty($data["id_funcionario"]) 
      && isset($data["dni_funcionario"]) && !empty($data["dni_funcionario"])
      && isset($data["nombre_funcionario"]) && !empty($data["nombre_funcionario"]) ) {
        //Ejecucion de procedimiento
        $funcionario = new Funcionario( $data["id_funcionario"], $data["dni_funcionario"], $data["nombre_funcionario"]);
        $consultaFuncionario->actualizarFuncionario($funcionario);
        
      } else {
        // respuesta si no envia parametros
        $json["id_funcionario"] = $data["id_funcionario"];
        $json["dni_funcionario"] = $data["dni_funcionario"];
        $json["nombre_funcionario"] = $data["nombre_funcionario"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
        
      }

      break;

    case 4: //eliminar


      if (isset($data["id_funcionario"]) && !empty($data["id_funcionario"]) ) {
        //Ejecucion de procedimiento
        $consultaFuncionario->eliminarFuncionario($data["id_funcionario"]);
        
      } else {
        // respuesta si no envia parametros
        $json["id_funcionario"] = $data["id_funcionario"];
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