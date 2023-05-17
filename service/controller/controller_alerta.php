<?php
//configuracion de cors
require_once('../config/cors.php');
// dependencias
require_once('../domain/alerta.php');
require_once('../domain/funcionario.php');
require_once('../data/consultas_alerta.php');
require_once('../data/consultas_funcionario.php');


//recibir objetos tipo json desde react
$input = file_get_contents('php://input');
$data = json_decode($input, true);

//funcion para verificar si el funcionario existe, sino se inserta
function InsertarFuncionario($data)
{

  $consultaFuncionario = new ConsultaFuncionario();

  $funcionario = $consultaFuncionario->buscarFuncionario($data->getDni());


  if ($funcionario == null) {
    // debo insertar el funcionario
    $registro = new Funcionario(
      $data->getDni(),
      $data->getNombre(),
      1
    );
    $id_funcionario = $consultaFuncionario->insertarFuncionario($registro);
    return $id_funcionario;
  } else {
    return $funcionario->id_funcionario;
  }
}

if (isset($_GET["consulta"])) {

  $consultaAlertas = new consultasAlerta();

  //identificar consulta
  switch ($_GET["consulta"]) {

    case 1: //listar

      //Ejecucion de procedimiento
      $consultaAlertas->listarAlertas();

      break;


    case 2: //insertar

      // validacion
      if (
        isset($data["n_etiqueta"]) && !empty($data["n_etiqueta"]) && isset($data["marca"]) && !empty($data["marca"])
        && isset($data["modelo"]) && !empty($data["modelo"]) && isset($data["serie"]) && !empty($data["serie"])
        && isset($data["descripcion"]) && !empty($data["descripcion"]) && isset($data["valor_libro"]) && !empty($data["valor_libro"])
        && isset($data["condicion"]) && !empty($data["condicion"]) && isset($data["clase_activo"]) && !empty($data["clase_activo"])
        && isset($data["dni_funcionario"]) && !empty($data["dni_funcionario"]) && isset($data["nombre_funcionario"]) && !empty($data["nombre_funcionario"])
      ) {
        /*
        var_dump($data);
        exit(0);*/

        //verificar que el funcionario existe, sino se inserta
        $funcionario = new Funcionario(
          $data["dni_funcionario"],
          $data["nombre_funcionario"],
          1
        );

        //id del funcionario
        $id_funcionario = InsertarFuncionario($funcionario);

        //crear objeto
        $alerta = new Alerta(
          $data["n_etiqueta"],
          $data["marca"],
          $data["modelo"],
          $data["serie"],
          $data["descripcion"],
          1, //id ubicacion
          '', //nombre ubicacion
          $data["valor_libro"],
          $data["condicion"],
          $data["clase_activo"],
          $id_funcionario, //id funcionario
          '', //nombre funciorio
          date('Y-m-d'), //fecha alerta
          1, //tipo alerta (insertar)
          0 //id alerta
        );
        //Ejecucion de procedimiento
        $consultaAlertas->insertarAlerta($alerta);
      } else {
        //mensaje de control de errores, depuracion
        // respuesta si no envia parametros
        $json["n_etiqueta"] = $data["n_etiqueta"];
        $json["marca"] = $data["marca"];
        $json["modelo"] = $data["modelo"];
        $json["serie"] = $data["serie"];
        $json["descripcion"] = $data["descripcion"];
        $json["valor_libro"] = $data["valor_libro"];
        $json["condicion"] = $data["condicion"];
        $json["clase_activo"] = $data["clase_activo"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
      }

      break;

    case 3: //Eliminar

      if (isset($data["n_etiqueta"]) && !empty($data["n_etiqueta"])) {
        //Ejecucion de procedimiento
        $consultaAlertas->eliminarAlerta($data["n_etiqueta"]);
      } else {
        //mensaje de control de errores, depuracion
        // respuesta si no envia parametros
        $json["n_etiqueta"] = $data["n_etiqueta"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
      }


      break;

    case 4: //editar
      if (
        isset($data["n_etiqueta"]) && !empty($data["n_etiqueta"]) && isset($data["marca"]) && !empty($data["marca"])
        && isset($data["modelo"]) && !empty($data["modelo"]) && isset($data["serie"]) && !empty($data["serie"])
        && isset($data["descripcion"]) && !empty($data["descripcion"]) && isset($data["valor_libro"]) && !empty($data["valor_libro"])
        && isset($data["condicion"]) && !empty($data["condicion"]) && isset($data["clase_activo"]) && !empty($data["clase_activo"])
        && isset($data["dni_funcionario"]) && !empty($data["dni_funcionario"]) && isset($data["nombre_funcionario"]) && !empty($data["nombre_funcionario"])
      ) {

        //verificar que el funcionario existe, sino se inserta
        $funcionario = new Funcionario(
          $data["dni_funcionario"],
          $data["nombre_funcionario"],
          1
        );

        //id del funcionario
        $id_funcionario = InsertarFuncionario($funcionario);

        $alerta = new Alerta(
          $data["n_etiqueta"],
          $data["marca"],
          $data["modelo"],
          $data["serie"],
          $data["descripcion"],
          1, //id ubicacion
          '', //nombre ubicacion
          $data["valor_libro"],
          $data["condicion"],
          $data["clase_activo"],
          $id_funcionario, //id funcionario
          '', //nombre funciorio
          date('Y-m-d'), //fecha alerta
          1, //tipo alerta (insertar)
          0 //id alerta
        );

        $consultaAlertas->editarAlerta($alerta);

      } else {
        //mensaje de control de errores, depuracion
        // respuesta si no envia parametros
        $json["n_etiqueta"] = $data["n_etiqueta"];
        $json["marca"] = $data["marca"];
        $json["modelo"] = $data["modelo"];
        $json["serie"] = $data["serie"];
        $json["descripcion"] = $data["descripcion"];
        $json["valor_libro"] = $data["valor_libro"];
        $json["condicion"] = $data["condicion"];
        $json["clase_activo"] = $data["clase_activo"];
        $json["dni_funcionario"] = $data["dni_funcionario"];
        $json["nombre_funcionario"] = $data["nombre_funcionario"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
      }
      break;
  }
}
