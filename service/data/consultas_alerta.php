<?php
require_once 'conexion_bd.php';

class consultasAlerta
{

  private $conexionBD;
  private $conexion;
  private  $json = array();

  public function __construct()
  {
    //conectar a base de datos
    $this->conexionBD = new ConexionBD();
  }


  public function listarAlertas()
  {

    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_alerta_mostrar_alertas()");
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
      $this->json["alertas"] = $lista;
      return $lista;
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  //esta funcion va a insertar los activos a la tabla temporal, para que luego el usuario determine si los acepta o no.
  public function insertarAlerta($alerta)
  {
    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //creando parametros por referencia
      $alerta_n_etiqueta = $alerta->getN_etiqueta();
      $alerta_marca = $alerta->getMarca();
      $alerta_modelo = $alerta->getModelo();
      $alerta_serie = $alerta->getSerie();
      $alerta_activo_descripcion = $alerta->getDescripcion();
      $alerta_ubicacion = $alerta->getId_ubicacion();
      $alerta_valor_libro = $alerta->getValor_libro();
      $alerta_condicion = $alerta->getCondicion();
      $alerta_clase_activo = $alerta->getClase_activo();
      $alerta_id_funcionario = $alerta->getId_funcionario();
      $alerta_fecha = $alerta->getFecha();
      $alerta_tipo_alerta = $alerta->getTipo_alerta();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_alerta_ingresar_alerta(?,?,?,?,?,?,?,?,?,?,?,?)");
      $stmt->bindParam(1, $alerta_n_etiqueta);
      $stmt->bindParam(2, $alerta_marca);
      $stmt->bindParam(3, $alerta_modelo);
      $stmt->bindParam(4, $alerta_serie);
      $stmt->bindParam(5, $alerta_activo_descripcion);
      $stmt->bindParam(6, $alerta_ubicacion);
      $stmt->bindParam(7, $alerta_valor_libro);
      $stmt->bindParam(8, $alerta_condicion);
      $stmt->bindParam(9, $alerta_clase_activo);
      $stmt->bindParam(10, $alerta_id_funcionario);
      $stmt->bindParam(11, $alerta_fecha);
      $stmt->bindParam(12, $alerta_tipo_alerta);
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
      echo json_encode($this->json);
    }
  }

  public function eliminarAlerta($n_etiqueta)
  {
    try {

      $this->conexion = $this->conexionBD->abrirConexion();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_alerta_eliminar_por_id(?)");
      $stmt->bindParam(1, $n_etiqueta);
      $stmt->execute();
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Eliminacion exitosa!";
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }

  public function editarAlerta($alerta)
  {
    try {
     
      $this->conexion = $this->conexionBD->abrirConexion();

        //creando parametros por referencia
        $alerta_n_etiqueta = $alerta->getN_etiqueta();
        $alerta_marca = $alerta->getMarca();
        $alerta_modelo = $alerta->getModelo();
        $alerta_serie = $alerta->getSerie();
        $alerta_activo_descripcion = $alerta->getDescripcion();
        $alerta_valor_libro = $alerta->getValor_libro();
        $alerta_condicion = $alerta->getCondicion();
        $alerta_clase_activo = $alerta->getClase_activo();
        $alerta_id_funcionario = $alerta->getId_funcionario();

      //seguridad
      $stmt =  $this->conexion->prepare("CALL tb_alerta_actualizar_alerta(?,?,?,?,?,?,?,?,?)");
     
      $stmt->bindParam(1, $alerta_n_etiqueta);
      $stmt->bindParam(2, $alerta_marca);
      $stmt->bindParam(3, $alerta_modelo);
      $stmt->bindParam(4, $alerta_serie);
      $stmt->bindParam(5, $alerta_activo_descripcion);
      $stmt->bindParam(6, $alerta_valor_libro);
      $stmt->bindParam(7, $alerta_condicion);
      $stmt->bindParam(8, $alerta_clase_activo);
      $stmt->bindParam(9, $alerta_id_funcionario);
    
      $stmt->execute();
      $stmt = NULL;

      //respuesta exito
      $this->json["success"] = true;
      $this->json["mensaje"] = "Modificacion exitosa!";
    } catch (Exception $error) {
      $this->json["Error"] = "Ocurrio un error: " . $error;
    } finally {
      $this->conexionBD->cerrarConexion();
      //enviar respuesta
      echo json_encode($this->json);
    }
  }
}
