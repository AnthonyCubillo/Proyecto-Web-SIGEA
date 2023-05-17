<?php
require_once 'conexion_bd.php';

class ConsultaUbicacion
{

  private $conexionBD;
  private $conexion;
  private  $json = array();

  public function __construct()
  {
    //conectar a base de datos
    $this->conexionBD = new ConexionBD();
  }


  public function listarUbicaciones()
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_ubicacion_listar()");
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
      $this->json["ubicaciones"] = $lista;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function insertarUbicacion($ubicacion)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_nombre = $ubicacion->getNombre();
      $_descripcion = $ubicacion->getDescripcion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_ubicacion_insertar(?,?)");
      $stmt->bindParam(1, $_nombre);
      $stmt->bindParam(2, $_descripcion);
      $stmt->execute();
      $resultado = $stmt->fetch()[0];
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["id_ubicacion"] = $resultado;
      $this->json["mensaje"] = "Registro exitoso!";
      
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function actualizarUbicacion($ubicacion)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_id_ubicacion = $ubicacion->getId();
      $_nombre = $ubicacion->getNombre();
      $_descripcion = $ubicacion->getDescripcion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_ubicacion_actualizar(?,?,?)");
      $stmt->bindParam(1, $_id_ubicacion);
      $stmt->bindParam(2, $_nombre);
      $stmt->bindParam(3, $_descripcion);
      $stmt->execute();
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Registro actualizado!";
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function eliminarUbicacion($_id_ubicacion)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_ubicacion_eliminar(?)");
      $stmt->bindParam(1, $_id_ubicacion);
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
}