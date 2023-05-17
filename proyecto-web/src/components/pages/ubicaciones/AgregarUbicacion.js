import React, { useState, useContext, useEffect } from "react";
//dependencias
import Swal from "sweetalert2";
//context
import AlertaContext from "../../../context/alertas/alertaContext";
import UbicacionContext from "../../../context/ubicaciones/ubicacionContext";

const AgregarUbicacion = ({ setMostrarAgregar }) => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //importar los valores del context de ubicaciones
  const ubicacionContext = useContext(UbicacionContext);
  const { registrarUbicacion } = ubicacionContext;

  useEffect(() => {
    if (alerta) {
      Swal.fire({
        position: "center",
        icon: alerta.categoria,
        title: alerta.mensaje,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }, [alerta]);

  const [ubicacion, setUbicacion] = useState({
    /*     id_ubicacion: 0, */
    nombre_ubicacion: "",
    descripcion_ubicacion: "",
  });

  const { nombre_ubicacion, descripcion_ubicacion } = ubicacion;

  const obtenerDatos = (e) => {
    setUbicacion({
      ...ubicacion,
      [e.target.name]: e.target.value,
    });
  };

  const registrarUbicacionOnSubmit = (e) => {
    e.preventDefault();

    //validacion
    if (!nombre_ubicacion.trim()) {
      mostrarAlerta("Debe ingresar un nombre de la ubicación", "error");
      return;
    }

    //enviar a consulta bd
    registrarUbicacion(ubicacion, mostrarAlerta);

    //cerrar el modal luego de insertar
    setTimeout(() => {
      document.getElementById("newUbicacionModal").click();
    }, 1000);

    //limipiar inputs
    setUbicacion({
      nombre_ubicacion: "",
      descripcion_ubicacion: "",
    });
  };

  return (
    <>
      {/* Modal nueva ubicacion */}
      <div
        className="modal fade"
        id="newUbicacionModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-gradient-success">
              <h5 className="modal-title text-white" id="ModalLabel1">
                Registra Nueva Ubicación
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={setMostrarAgregar}
              >
                <span aria-hidden="true" className="text-white">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form className="user" onSubmit={registrarUbicacionOnSubmit}>
                <div className="form-group position-relative">
                  <i className="fas fa-map-marker-alt input-icon"></i>
                  <input
                    type="text"
                    className="form-control form-control-user pl-5"
                    name="nombre_ubicacion"
                    id="nombre_ubicacion"
                    placeholder="Nombre de Ubicacion"
                    onChange={obtenerDatos}
                    value={nombre_ubicacion}
                  />
                </div>

                <div className="form-group position-relative">
                  <i className="fas fa-quote-left input-icon"></i>
                  <textarea
                    className="form-control  pl-5"
                    name="descripcion_ubicacion"
                    id="descripcion_ubicacion"
                    placeholder="Descripción de Ubicación"
                    onChange={obtenerDatos}
                    value={descripcion_ubicacion}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-user font-weight-bold btn-block"
                >
                  Registrar
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                type="button"
                data-dismiss="modal"
                onClick={setMostrarAgregar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgregarUbicacion;
