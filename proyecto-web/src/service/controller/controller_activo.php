<?php
//configuracion de cors
require_once('../config/cors.php');
// dependencias
require_once('../domain/activo.php');
require_once('../domain/funcionario.php');
require_once('../data/consultas_activo.php');
require_once('../data/consultas_funcionario.php');

//recibir objetos tipo json desde react
$input = file_get_contents('php://input');
$data = json_decode($input, true);



if (isset($_GET["consulta"])) {

  $consultaActivo = new ConsultaActivo();
  $consultaFuncionario = new ConsultaFuncionario();

  //identificar consulta
  switch ($_GET["consulta"]) {

    case 1: //listar

      //Ejecucion de procedimiento
      $consultaActivo->listarActivos();

      break;

    case 2: //insertar 

      //revisar si el usuario esta registrado y sino entonces registrarlo
      if (isset($data) && !empty($data)) {
        
        //recorrer el array de objetos
        foreach ($data as $key => $value) {
         
          //ver si el funcionario esta registrado
          $dni = $data[$key]["dni_funcionario"];
          if (isset($dni) && !empty($dni)) {

            //Ejecucion de procedimiento
            $result = $consultaFuncionario->buscarFuncionario($dni);
            
            //si el funcionario no esta registrado, lo registro
            if ($result == null) {
                           
              $nombre_completo = $data[$key]["nombre_funcionario"];
              $dni_funcionario = $data[$key]["dni_funcionario"];
              $funcionario = new Funcionario(0,$dni_funcionario, $nombre_completo);
              //llamar al procedimiento de insertar funcionario
              $consultaFuncionario->insertarFuncionario($funcionario);
              
            } else {
              // respuesta si no envia parametros
              $json["mensaje"] = "Ya esta registrado el funcionario!";

              //echo json_encode($json);
            }
          } else {
            // respuesta si no envia parametros
            $json["dni_funcionario"] = "Esta vacio!";
            $json["mensaje"] = "Error las entradas de funcionario estan vacias!";
            echo json_encode($json);
          }

          //ver si el activo esta registrado
          $activo_por_etiqueta = $consultaActivo->buscarActivo($value["n_etiqueta"]);
          if ($activo_por_etiqueta ==  null) {

            //inserta activo
            $activo = new Activo(
              $value["n_etiqueta"],
              $value["marca"],
              $value["modelo"],
              $value["serie"],
              $value["descripcion"],
              1,
              "",
              $value["valor_libros"],
              $value["condicion"],
              $value["clase_activo"],
              1,
              "emily"
            );

            $consultaActivo->insertarActivo($activo);
          } else if ($activo_por_etiqueta != "") {
           
            $alerta = [];

            $funcionario = $consultaFuncionario->buscarFuncionario($dni);
            $id = $funcionario->id_funcionario;

            $alertas = array();

            if ($activo_por_etiqueta->descripcion != $value["descripcion"]) {
              $alerta = "La descripcion del activo no coincide con la descripcion del activo en la base de datos";
              array_push($alertas, $alerta);
            }
            if ($activo_por_etiqueta->valor_libro != $value["valor_libros"]) {
              $alerta = "El valor del activo no coincide con el valor del activo en la base de datos";
              array_push($alertas, $alerta);
            }


            if ($activo_por_etiqueta->condicion != $value["condicion"]) {
              $alerta = "La condicion del activo no coincide con la condicion del activo en la base de datos";
              array_push($alertas, $alerta);
            }

            if ($activo_por_etiqueta->clase_activo != $value["clase_activo"]) {
              $alerta = "La clase del activo no coincide con la clase del activo en la base de datos";
              array_push($alertas, $alerta);
            }

            if ($activo_por_etiqueta->id_funcionario != $id) {
              $alerta = "El activo presenta un nuevo funcionario";
              array_push($alertas, $alerta);
            }

            // Imprimir el contenido del array de alertas



            // ! pero sino entonces hariamos el llamado del metodo que revisa que no haya inconsitencias en los activos
          }
        }

        
        if (!empty($alertas)) {
          echo "Se encontraron las siguientes alertas: " . implode(", ", $alertas);
        }
      } else {
        // respuesta si no envia parametros
        $json["data"] = $data;
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
      }

      break;

    case 3: //editar

      if (
        isset($data["n_etiqueta"]) && !empty($data["n_etiqueta"])
        && isset($data["marca"]) && !empty($data["marca"])
        && isset($data["modelo"]) && !empty($data["modelo"])
        && isset($data["serie"]) && !empty($data["serie"])
        && isset($data["descripcion"]) && !empty($data["descripcion"])
        && isset($data["id_ubicacion"]) && !empty($data["id_ubicacion"])
        && isset($data["valor_libro"]) && !empty($data["valor_libro"])
        && isset($data["condicion"]) && !empty($data["condicion"])
        && isset($data["clase_activo"]) && !empty($data["clase_activo"])
        && isset($data["id_funcionario"]) && !empty($data["id_funcionario"])
      ) {
        //Ejecucion de procedimiento
        $activo = new Activo($data["n_etiqueta"], $data["marca"], $data["modelo"], $data["serie"], $data["descripcion"], $data["id_ubicacion"], "", $data["valor_libro"], $data["condicion"], $data["clase_activo"], $data["id_funcionario"], "");

        $consultaActivo->actualizarActivo($activo);
      } else {
        // respuesta si no envia parametros
        $json["n_etiqueta"] = $data["n_etiqueta"];
        $json["marca"] = $data["marca"];
        $json["modelo"] = $data["modelo"];
        $json["serie"] = $data["serie"];
        $json["descripcion"] = $data["descripcion"];
        $json["id_ubicacion"] = $data["id_ubicacion"];
        $json["valor_libro"] = $data["valor_libro"];
        $json["condicion"] = $data["condicion"];
        $json["clase_activo"] = $data["clase_activo"];
        $json["id_funcionario"] = $data["id_funcionario"];

        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
      }

      break;

    case 4: //eliminar


      if (isset($data["n_etiqueta"]) && !empty($data["n_etiqueta"])) {
        //Ejecucion de procedimiento
        $consultaActivo->eliminarActivo($data["n_etiqueta"]);
      } else {
        // respuesta si no envia parametros
        $json["n_etiqueta"] = $data["n_etiqueta"];
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