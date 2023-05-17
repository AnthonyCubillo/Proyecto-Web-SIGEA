<?php
require_once 'conexion_bd.php';

class ConsultaUsuario
{

  private $conexionBD;
  private $conexion;
  private  $json = array();

  public function __construct()
  {
    //conectar a base de datos
    $this->conexionBD = new ConexionBD();
  }


  public function listarUsuarios()
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_usuario_listar()");
      $i = 0;
      $lista = array();
      if ($stmt->execute()) {
        while ($fila = $stmt->fetchObject()) {
          //print_r($fila);
          $lista[$i] = $fila;
          $i++;
        }
      }

      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "listado exitoso!";
      $this->json["usuarios"] = $lista;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function insertarUsuario($usuario)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_dni = $usuario->getDni();
      $_nombre = $usuario->getNombre();
      $_email = $usuario->getEmail();
      $_clave = $usuario->getClave();

      //cifrar contraseña 60 caracteres
      $_clave_cifrada = password_hash($_clave, PASSWORD_DEFAULT);
      
      //seguridad
      $stmt = $this->conexion->prepare("CALL tb_usuario_insertar(?,?,?,?)");
      $stmt->bindParam(1, $_dni);
      $stmt->bindParam(2, $_nombre);
      $stmt->bindParam(3, $_email);
     // $stmt->bindParam(4, $_clave_cifrada);
      $stmt->bindParam(4, $_clave);
      $stmt->execute();
      $resultado = $stmt->fetch()[0];
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["id_usuario"] = $resultado;
      $this->json["mensaje"] = "Registro exitoso!";
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
    return $resultado;
  }

  public function obtenerUltimoDniUsuarioInsertado() {
    try {
        $this->conexion = $this->conexionBD->abrirConexion();

        $stmt = $this->conexion->prepare("SELECT dni_usuario FROM `tb_usuario` WHERE id_usuario = LAST_INSERT_ID()");
        $stmt->execute();

        $resultado = $stmt->fetch()[0];

        $stmt = NULL;

        return $resultado;
    } catch (Exception $error) {
        throw new Exception("Error al obtener el DNI del usuario insertado: " . $error);
    } finally {
        $this->conexionBD->cerrarConexion();
    }
}


  public function actualizarUsuario($usuario)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_id_usuario = $usuario->getId();
      $_dni = $usuario->getDni();
      $_nombre = $usuario->getNombre();
      $_email = $usuario->getEmail();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_usuario_actualizar(?,?,?,?)");
      $stmt->bindParam(1, $_id_usuario);
      $stmt->bindParam(2, $_dni);
      $stmt->bindParam(3, $_nombre);
      $stmt->bindParam(4, $_email);
      $stmt->execute();
      $stmt = NULL;

      $stmt =  $this->conexion->prepare("CALL tb_usuario_consultar(?)");
      $stmt->bindParam(1, $_id_usuario);
      $stmt->execute();
      $resultado = $stmt->fetchObject();
      $stmt = NULL;

      if (!$resultado) {
        $resultado = NULL;
      }

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Registro actualizado!";
      $this->json["usuario"] = $resultado;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function eliminarUsuario($_id_usuario)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_usuario_eliminar(?)");
      $stmt->bindParam(1, $_id_usuario);
      $stmt->execute();
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Registro eliminado!";
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function logearUsuario($usuario)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_dni = $usuario->getDni();
      $_clave = $usuario->getClave();

      $stmt =  $this->conexion->prepare("CALL tb_usuario_logear(?)");
      $stmt->bindParam(1, $_dni);
      $resultado = NULL;
      if ($stmt->execute()) {

        while ($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
          //print_r($fila);
          //revisar contraseña cifrada
         // if (password_verify($_clave, $fila["clave_usuario"])) {
            if ( $_clave == $fila["clave_usuario"] ) {
            //eliminar la contraseña de resultado
            $resultado = array(
              'id_usuario' => $fila["id_usuario"],
              'dni_usuario' => $fila["dni_usuario"],
              'nombre_usuario' => $fila["nombre_usuario"],
              'email_usuario' => $fila["email_usuario"],
            );
          }
        }
      }

      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Registro consultado!";
      $this->json["usuario"] = $resultado;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function cambiarClaveUsuario($usuario)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_id = $usuario->getId();
      $_clave = $usuario->getClave();

      //cifrar contraseña 255 caracteres
      $_clave_cifrada = password_hash($_clave, PASSWORD_DEFAULT);

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_usuario_cambiar_clave(?,?)");
      $stmt->bindParam(1, $_id);
      $stmt->bindParam(2, $_clave_cifrada);
      $stmt->execute();
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Contraseña actualizada con exito!";
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function recuperarPassword($email)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      $stmt =  $this->conexion->prepare("CALL tb_usuario_recuperar_clave(?)");
      $stmt->bindParam(1, $email);
      $stmt->execute();
      $resultado = $stmt->fetch();
      $stmt = NULL;

      //si el correo es valido
      if (!$resultado) {
        //respuesta email no esta registrado
        $this->json["error"] = false;
        $this->json["mensaje"] = "El correo ingresado no esta registrado en el sistema!";

        return;
      }

      $asunto = "Recuperar contraseña - SIGEA";
      $mensaje = "Hola";
      
      $servidor = "wilfredo.barquero.herrera@est.una.ac.cr";

      $headers = "From: ". $servidor; 
      
      ini_set('SMTP', 'smtpout.secureserver.net');
      ini_set('smtp_port', 80);
      if (mail($servidor, $asunto, $mensaje, $headers)) {

        //respuesta exito
        $this->json["success"] = true;
        $this->json["mensaje"] = "Se envío un mensaje a su correo con exito!";
        exit();
      }
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }
}