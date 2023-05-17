import React, { useContext } from "react";
//dependencias
import Swal from "sweetalert2";
//context
import AlertaContext from "../../../context/alertas/alertaContext";
import UbicacionContext from "../../../context/ubicaciones/ubicacionContext";

const ItemTablaUbicacion = ({ ubicacion, setMostrarEditar }) => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const {mostrarAlerta } = alertaContext;

  //importar los valores del context de ubicaciones
  const ubicacionContext = useContext(UbicacionContext);
  const { eliminarUbicacion, setUbicacionActual } = ubicacionContext;

  const mostrarEditar = (ubicacion) => {
    //cambiar el estado para mostror modal
    setMostrarEditar();
    //setear la ubicacion elejida
    setUbicacionActual(ubicacion);
  };
  
  //funcion alerta eliminar una ubicacion
const mostrarEliminarUbicacion = (id_ubicacion) => {

    Swal.fire({
      title: `¿Está seguro que desea eliminar la ubicación n.° ${id_ubicacion}?`,
      text: "¡Las ubicaciones eliminadas no se pueden revertir!",
      icon: "warning",
      iconColor: "#E74C3C",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //aqui codigo de peticion al backend ....
        const resultado = eliminarUbicacion(id_ubicacion, mostrarAlerta);

        //si la respuesta del backend true
        if (resultado) {
          Swal.fire({
            position: "center",
            title: `La ubicación n° ${id_ubicacion} Eliminado!`,
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            position: "center",
            title: "Ocurrio un error!",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <tr>
      <td style={{ textAlign: "center"  }}>{ubicacion.id_ubicacion }</td>

      <td style={{ textAlign: "center"  }}>{ubicacion.nombre_ubicacion}</td>

      <td style={{ maxWidth: "400px" }}>{ubicacion.descripcion_ubicacion}</td>

      <td className="text-center">
        <button className="btn btn-danger mx-2" onClick={() => mostrarEliminarUbicacion(ubicacion.id_ubicacion) }>
          <i className="fas fa-trash"></i>
        </button>

        <button
          className="btn btn-warning mx-2"
          data-toggle="modal"
          data-target="#actualizarUbicacion"
          onClick={()=>mostrarEditar(ubicacion)}
        >
          <i className="fas fa-edit"></i>
        </button>
      </td>
    </tr>
  );
};

export default ItemTablaUbicacion;
