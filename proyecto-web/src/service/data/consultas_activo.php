<?php
require_once 'conexion_bd.php';



class ConsultaActivo
{

  private $conexionBD;
  private $conexion;
  private  $json = array();

  public function __construct()
  {
    //conectar a base de datos
    $this->conexionBD = new ConexionBD();
  }

  //funcion para traer un activo por su numero de etiqueta
  public function buscarActivo($n_etiqueta)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL obtener_activo_por_etiqueta(?)");
      $stmt->bindParam(1, $n_etiqueta);
      $stmt->execute();
      $fila = $stmt->fetchObject();
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Busqueda exitosa!";
      $this->json["activo"] = $fila;
      return $fila;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
     // echo json_encode($this->json);
    }
  }
  

  public function listarActivos()
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_activo_listar()");
      $i = 0;
      $lista = array();
      if ($stmt->execute()) {
        while ($fila = $stmt->fetchObject()) {
          //print_r($fila);
          $lista[$i] = $fila;
          $i++;
        }
      }
      
      //var_dump($lista);

      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "listado exitoso!";
      $this->json["activos"] = $lista;
      return $lista;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function insertarActivo($activo)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_n_etiqueta = $activo->getN_etiqueta();
      $_marca = $activo->getMarca();
      $_modelo = $activo->getModelo();
      $_serie = $activo->getSerie();
      $_descripcion = $activo->getDescripcion();
      $_id_ubicacion = $activo->getId_ubicacion();
      $_valor_libro = $activo->getValor_libro();
      $_condicion = $activo->getCondicion();
      $_clase_activo = $activo->getClase_activo();
      $_id_funcionario = $activo->getId_funcionario();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_activo_insertar(?,?,?,?,?,?,?,?,?,?)");
      $stmt->bindParam(1, $_n_etiqueta);
      $stmt->bindParam(2, $_marca);
      $stmt->bindParam(3, $_modelo);
      $stmt->bindParam(4, $_serie);
      $stmt->bindParam(5, $_descripcion);
      $stmt->bindParam(6, $_id_ubicacion);
      $stmt->bindParam(7, $_valor_libro);
      $stmt->bindParam(8, $_condicion);
      $stmt->bindParam(9, $_clase_activo);
      $stmt->bindParam(10, $_id_funcionario);
      $stmt->execute();
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Registro exitoso!";
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      //echo json_encode($this->json);
    }
  }

  public function actualizarActivo($activo)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $_n_etiqueta = $activo->getN_etiqueta();
      $_marca = $activo->getMarca();
      $_modelo = $activo->getModelo();
      $_serie = $activo->getSerie();
      $_descripcion = $activo->getDescripcion();
      $_id_ubicacion = $activo->getId_ubicacion();
      $_valor_libro = $activo->getValor_libro();
      $_condicion = $activo->getCondicion();
      $_clase_activo = $activo->getClase_activo();
      $_id_funcionario = $activo->getId_funcionario();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_activo_actualizar(?,?,?,?,?,?,?,?,?,?)");
      $stmt->bindParam(1, $_n_etiqueta);
      $stmt->bindParam(2, $_marca);
      $stmt->bindParam(3, $_modelo);
      $stmt->bindParam(4, $_serie);
      $stmt->bindParam(5, $_descripcion);
      $stmt->bindParam(6, $_id_ubicacion);
      $stmt->bindParam(7, $_valor_libro);
      $stmt->bindParam(8, $_condicion);
      $stmt->bindParam(9, $_clase_activo);
      $stmt->bindParam(10, $_id_funcionario);
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

  public function eliminarActivo($_id_activo)
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_activo_eliminar(?)");
      $stmt->bindParam(1, $_id_activo);
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