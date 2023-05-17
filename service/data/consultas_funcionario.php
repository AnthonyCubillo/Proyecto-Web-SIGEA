<?php
require_once 'conexion_bd.php';

class ConsultaFuncionario
{

  private $conexionBD;
  private $conexion;
  private  $json = array();

  public function __construct()
  {
    //conectar a base de datos
    $this->conexionBD = new ConexionBD();
  }

  //funcion para traer funcionario por su dni
  public function buscarFuncionario($n_dni_funcionario)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL obtener_funcionario_por_cedula(?)");
      $stmt->bindParam(1, $n_dni_funcionario);
      $stmt->execute();
      $fila = $stmt->fetchObject();
      $stmt = NULL;
 
      //respuesta exito
     return $fila;
     
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
    }

    
  }


  public function listarFuncionarios()
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_funcionario_listar()");
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
      return $lista;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      
    }
  }

  public function insertarFuncionario($funcionario)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_dni = $funcionario->getDni();
      $_nombre = $funcionario->getNombre();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_funcionario_insertar(?,?)");
      $stmt->bindParam(1, $_dni);
      $stmt->bindParam(2, $_nombre);
      $stmt->execute();
      $resultado = $stmt->fetch()[0];
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Registro exitoso!";
      $this->json["id_funcionario"] = $resultado;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function actualizarFuncionario($funcionario)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_id_funcionario = $funcionario->getId();
      $_dni = $funcionario->getDni();
      $_nombre = $funcionario->getNombre();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_funcionario_actualizar(?,?,?)");
      $stmt->bindParam(1, $_id_funcionario);
      $stmt->bindParam(2, $_dni);
      $stmt->bindParam(3, $_nombre);
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

  public function eliminarFuncionario($_id_funcionario)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_funcionario_eliminar(?)");
      $stmt->bindParam(1, $_id_funcionario);
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