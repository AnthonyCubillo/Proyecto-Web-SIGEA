<?php
//configuracion de cors
require_once('../config/cors.php');
// dependencias
require_once('../domain/activo.php');
require_once('../domain/alerta.php');
require_once('../domain/funcionario.php');
require_once('../data/consultas_activo.php');
require_once('../data/consultas_alerta.php');
require_once('../data/consultas_funcionario.php');

//recibir objetos tipo json desde react
$input = file_get_contents('php://input');
$data = json_decode($input, true);


function InsertarFuncionario($data)
{

  $consultaFuncionario = new ConsultaFuncionario();

  $funcionario = $consultaFuncionario->buscarFuncionario($data["dni_funcionario"]);


  if ($funcionario == null) {
    // debo insertar el funcionario
    $registro = new Funcionario(
      $data["dni_funcionario"],
      $data["nombre_funcionario"],
      1
    );
    $id_funcionario = $consultaFuncionario->insertarFuncionario($registro);
    return $id_funcionario;
  } else {
    return $funcionario->id_funcionario;
  }
}

if (isset($_GET["consulta"])) {

  $consultaActivo = new ConsultaActivo();
  $consultaAlerta = new consultasAlerta();
  $consultaFuncionario = new ConsultaFuncionario();

  //identificar consulta
  switch ($_GET["consulta"]) {

    case 1:

      //revisar que data traiga datos y que exista!
      if (isset($data) && !empty($data)) {

        //recorrer el array de objetos para la insersion de activos
        $indice = 0;
        foreach ($data as $key => $value) {

          //Ejecucion de procedimiento en caso de que todos los funcionarios esten registrados no hace nada,
          // en caso de que no esten registrados los inserta
          $id_funcionario = InsertarFuncionario($data[$indice]);

          //$consulta activo = va y busca por etiqueta
          $activo_por_etiqueta = $consultaActivo->buscarActivo($value["n_etiqueta"]);

          //si viene vacio es que no se encontraron activos en l bd, entonces son activos nuevos.
          if ($activo_por_etiqueta ==  "") {

            //inserta activo
            $alerta = new Alerta(
              $value["n_etiqueta"],
              $value["marca"],
              $value["modelo"],
              $value["serie"],
              $value["descripcion"],
              1,  //ubicacion quemada
              "", //nombre ubicacion
              $value["valor_libro"],
              $value["condicion"],
              $value["clase_activo"],
              $id_funcionario,
              "", //nombre funcionario
              date('Y-m-d'), //fecha
              1, //tipo alerta
              0, //id alerta
            );

            $consultaAlerta->insertarAlerta($alerta);
          }
          $indice++;
        }
      } else {

        // respuesta si no envia parametros, para prueba en el api test
        $json["n_etiqueta"] = $data["n_etiqueta"];
        $json["marca"] = $data["marca"];
        $json["modelo"] = $data["modelo"];
        $json["serie"] = $data["serie"];
        $json["descripcion"] = $data["descripcion"];
        $json["valor_libro"] = $data["valor_libro"];

        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
      }

      break;
    case 2:  //*Actualizar alerta
      //revisar que data traiga datos y que exista!
      if (isset($data) && !empty($data)) {

        //recorrer el array de objetos para la insersion de activos
        $indice = 0;
        foreach ($data as $key => $value) {
          
          //Ejecucion de procedimiento en caso de que todos los funcionarios esten registrados no hace nada,
          // en caso de que no esten registrados los inserta
          $id_funcionario = InsertarFuncionario($data[$indice]);
          
          //$consulta activo = va y busca por etiqueta
          $activo_por_etiqueta = $consultaActivo->buscarActivo($value["n_etiqueta"]);

            //inserta activo
            $alerta = new Alerta(
              $value["n_etiqueta"],
              $value["marca"],
              $value["modelo"],
              $value["serie"],
              $value["descripcion"],
              1,  //ubicacion quemada
              "", //nombre ubicacion
              $value["valor_libro"],
              $value["condicion"],
              $value["clase_activo"],
              $id_funcionario,
              "", //nombre funcionario
              date('Y-m-d'), //fecha
              1, //tipo alerta
              0, //id alerta
            );

            $consultaAlerta->editarAlerta($alerta);
    
          $indice++;
        }
      } else {

        // respuesta si no envia parametros, para prueba en el api test
        $json["n_etiqueta"] = $data["n_etiqueta"];
        $json["marca"] = $data["marca"];
        $json["modelo"] = $data["modelo"];
        $json["serie"] = $data["serie"];
        $json["descripcion"] = $data["descripcion"];
        $json["valor_libro"] = $data["valor_libro"];

        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
      }
      break;

    case 3: //eliminar lista de activos //!!  PREGUNTAR 

      if (isset($data) && !empty($data)) {
        //Ejecucion de procedimiento

        foreach ($data as $key => $value) {
          //elimina activo
          
          $consultaAlerta->eliminarAlerta($value["n_etiqueta"]);
        }
      } else {
        // respuesta si no envia parametros
        $json["n_etiqueta"] = $data["n_etiqueta"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
      }

      break;
  }
}


/*
case 2: //editar lista de activos

  // que  exista y no venga vacio
  if (isset($data) && !empty($data)) {
    //Ejecucion de procedimiento
    $indice = 0;
    foreach ($data as $key => $value) {
      $id_funcionario = InsertarFuncionario($data[$indice]);
      //inserta activo
      //llamado stactico del segundo constructor
      //se usa un  segundo constructor por el hecho de que se le pasan solo unos datos 
      $activo = Activo::constructorActualizar($value["n_etiqueta"], $value["marca"], $value["modelo"], $value["serie"], 
                  $value["descripcion"], 1,  $value["valor_libro"], $value["condicion"], $value["clase_activo"], $id_funcionario);

      $consultaActivo->actualizarActivo($activo);
      $indice++;
    }
  }
  break; */