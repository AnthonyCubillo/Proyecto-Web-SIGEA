<?php
require_once 'conexion_bd.php';

class ConsultaConfiguracion
{
  private $conexionBD;
  private $conexion;
  private  $json = array();

  public function __construct()
  {
    //conectar a base de datos
    $this->conexionBD = new ConexionBD();
  }

  //consulta de obterner
  public function obtenerConfiguracion($_id_usuario)
  {
    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_configuracion_obtener(?)");
      $stmt->bindParam(1, $_id_usuario);
      $stmt->execute();
      $fila = $stmt->fetchObject();
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Busqueda exitosa!";
      $this->json["config"] = $fila;
      return $fila;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function insertarConfiguracion($id)
  {

    try {
  
      $this->conexion = $this->conexionBD->abrirConexion();
      
      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_configuracion_insertar(?)");
      $stmt->bindParam(1, $id);

      $stmt->execute();
      $resultado = $stmt->fetch();
      $stmt = NULL;
    
      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Registro exitoso!";
      $this->json["Resultado"] = $resultado;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      //echo json_encode($this->json);
    }
  }

  public function actualizarConfiguracion($configuracion)
  {
    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_color = $configuracion->getColor();
      $_font_family = $configuracion->getFont_family();
      $_font_size = $configuracion->getFont_size();
      $_id_configuracion = $configuracion->getId();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_configuracion_actualizar(?,?,?,?)");

      $stmt->bindParam(1, $_color);
      $stmt->bindParam(2, $_font_family);
      $stmt->bindParam(3, $_font_size);
      $stmt->bindParam(4, $_id_configuracion);

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

  public function eliminarConfiguracion($_id_usuario)
  {
    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad 
      $stmt =  $this->conexion->prepare("CALL tb_configuracion_eliminar(?)");
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
    //echo json_encode($this->json);
  }
  }
  
}