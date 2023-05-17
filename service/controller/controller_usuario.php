<?php
//configuracion de cors
require_once('../config/cors.php');
// dependencias
require_once('../domain/usuario.php');
require_once('../data/consultas_usuario.php');
require_once('../data/consultas_configuracion.php');

//recibir objetos tipo json desde react
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (isset($_GET["consulta"])) {
  
  $consultaUsuario = new ConsultaUsuario();
  


  //identificar consulta
  switch ($_GET["consulta"]) {

    case 1: //listar

        //Ejecucion de procedimiento
        $consultaUsuario->listarUsuarios();

      break;

    case 2: //insertar

        if (
          isset($data["dni_usuario"]) && !empty($data["dni_usuario"])
          && isset($data["nombre_usuario"]) && !empty($data["nombre_usuario"])
          && isset($data["email_usuario"]) && !empty($data["email_usuario"])
          && isset($data["clave_usuario"]) && !empty($data["clave_usuario"])
        ) {
          

          //Ejecucion de procedimiento
          $usuario = new Usuario(0, $data["dni_usuario"], $data["nombre_usuario"], $data["email_usuario"], $data["clave_usuario"]);
          $id= $consultaUsuario->insertarUsuario($usuario);
          
          $consultaConfiguracion = new ConsultaConfiguracion();    
          $consultaConfiguracion->insertarConfiguracion($id);
          
        } else {
          // respuesta si no envia parametros
          $json["dni_usuario"] = $data["dni_usuario"];
          $json["nombre_usuario"] = $data["nombre_usuario"];
          $json["email_usuario"] = $data["email_usuario"];
          $json["clave_usuario"] = $data["clave_usuario"];
          $json["mensaje"] = "Error una o varias entradas estan vacias!";
          echo json_encode($json);
        }
        break;
  
    case 3: //editar

      if (isset($data["id_usuario"]) && !empty($data["id_usuario"]) 
      && isset($data["dni_usuario"]) && !empty($data["dni_usuario"])
      && isset($data["nombre_usuario"]) && !empty($data["nombre_usuario"])
      && isset($data["email_usuario"]) && !empty($data["email_usuario"])
      ) {
        //Ejecucion de procedimiento
        $usuario = new Usuario( $data["id_usuario"],$data["dni_usuario"],$data["nombre_usuario"],$data["email_usuario"],"");
        $consultaUsuario->actualizarUsuario($usuario);
        
      } else {
        // respuesta si no envia parametros
        $json["id_usuario"] = $data["id_usuario"];
        $json["dni_usuario"] = $data["dni_usuario"];
        $json["nombre_usuario"] = $data["nombre_usuario"];
        $json["email_usuario"] = $data["email_usuario"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
        
      }

      break;

    case 4: //eliminar

      if (isset($data["id_usuario"]) && !empty($data["id_usuario"]) ) {
        //Ejecucion de procedimiento
       
        $consultaUsuario->eliminarUsuario($data["id_usuario"]);
        $consultaConfiguracion = new ConsultaConfiguracion();    
        $consultaConfiguracion->eliminarConfiguracion($data["id_usuario"]);
        
      } else {
        // respuesta si no envia parametros
        $json["id_usuario"] = $data["id_usuario"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
        
      }
      
      break;

    case 5: //logear

      if (isset($data["dni_usuario"]) && !empty($data["dni_usuario"]) 
        && isset($data["clave_usuario"]) && !empty($data["clave_usuario"]) 
      ) {
        //Ejecucion de procedimiento
        $usuario = new Usuario( "",$data["dni_usuario"],"","",$data["clave_usuario"]);
        $consultaUsuario->logearUsuario($usuario);
        
      } else {
        // respuesta si no envia parametros
        $json["dni_usuario"] = $data["dni_usuario"];
        $json["clave_usuario"] = $data["clave_usuario"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
        
      }
    break;

    case 6: //cambiar password

      if (isset($data["id_usuario"]) && !empty($data["id_usuario"]) 
        && isset($data["clave_usuario"]) && !empty($data["clave_usuario"]) 
      ) {
        //Ejecucion de procedimiento
        $usuario = new Usuario( $data["id_usuario"],"","","",$data["clave_usuario"]);
        $consultaUsuario->cambiarClaveUsuario($usuario,true);
        
      } else {
        // respuesta si no envia parametros
        $json["id_usuario"] = $data["id_usuario"];
        $json["clave_usuario"] = $data["clave_usuario"];
        $json["mensaje"] = "Error una o varias entradas estan vacias!";
        echo json_encode($json);
        
      }

    break;
    case 7: //recuperar password

      if (isset($data["email_usuario"]) && !empty($data["email_usuario"])  ) {
        //Ejecucion de procedimiento
        $consultaUsuario->recuperarPassword($data["email_usuario"]); 

      } else {
        // respuesta si no envia parametros
        $json["email_usuario"] = $data["email_usuario"];
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