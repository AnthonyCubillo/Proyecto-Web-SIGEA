import React, { useContext } from "react";
//dependecias
import Swal from "sweetalert2";
//context
import AlertaActivoContext from "../../../context/alertaActivos/alertaActivoContext";

const ItemTablaAlerta = ({ alerta, setMostrarDetalles }) => {
  //importar los valores del context de alertaActivos
  const alertaActivoContext = useContext(AlertaActivoContext);
  const { setAlertaActual } = alertaActivoContext;

  //funcion alerta eliminar una alerta
  const desactivarAlerta = (tb_alerta_id) => {
    Swal.fire({
      title: `¿Está seguro que desea desactivar la alerta ${tb_alerta_id}?`,
      text: "¡Las alertas desactivadas no se pueden revertir!",
      icon: "warning",
      iconColor: "#E74C3C",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, desactivar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //aqui codigo de peticion al backend ....

        //si la respuesta del backend true
        if (true) {
          Swal.fire({
            position: "center",
            title: `¡Alerta ${tb_alerta_id} desactivada!`,
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            position: "center",
            title: "¡Ocurrió un error!",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const confirmarAlerta = (tb_alerta_id) => {
    alert(tb_alerta_id);
  };

  const mostrarActivo = (alerta) => {
    //console.log(alerta);
    setAlertaActual(alerta);
    setMostrarDetalles();
  };

  const Icono = (tipo) => {
    switch (tipo) {
      case 1: //TODO:"Activo nuevo"
        return (
          <div>
            <i
              className="fas fa-plus-square text-success mr-3"
              style={{ fontSize: "1em" }}
            ></i>
            <span className="text-success">Activo nuevo</span>
          </div>
        );

      case 2: //TODO: "Activo Incongruente"
        return (
          <div>
            <i
              className="fas fa-exclamation-triangle text-warning mr-3"
              style={{ fontSize: "1em" }}
            ></i>
            <span className="text-warning">Activo Modificado</span>
          </div>
        );

      case 3: //TODO: "Activo eliminado"
        return (
          <div>
            <i
              className="fas fa-times-circle text-danger mr-3"
              style={{ fontSize: "1em" }}
            ></i>
            <span className="text-danger">Activo eliminado</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* <!-- Alerta 1 --> */}
      <tr>
        <td style={{ textAlign: "center" }}>{alerta.tb_alerta_id}</td>

        <td style={{ textAlign: "center" }}>{alerta.tb_alerta_fecha}</td>

        <td style={{ textAlign: "center" }}>{alerta.tb_alerta_n_etiqueta}</td>

        <td style={{ textAlign: "center" }}>
          {Icono(alerta.tb_alerta_tipo_alerta)}
        </td>

        <td className="text-center">
          <button
            className="btn btn-primary btn-alerta"
            data-toggle="modal"
            data-target="#detallesAlertaModal"
            onClick={() => mostrarActivo(alerta)}
          >
            <i className="fas fa-info"></i>
          </button>
        </td>

        <td className="text-center">
          <button
            className="btn btn-danger mx-1 btn-alerta"
            onClick={() => desactivarAlerta(alerta.tb_alerta_id)}
          >
            <i className="fas fa-times"></i>
          </button>
          <button
            className="btn btn-success mx-1 btn-alerta mt-md-0 mt-2"
            onClick={() => confirmarAlerta(alerta.tb_alerta_id)}
          >
            <i className="fas fa-check"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default ItemTablaAlerta;
