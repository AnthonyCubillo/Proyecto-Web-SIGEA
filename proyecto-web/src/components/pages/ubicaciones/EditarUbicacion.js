import React, { useState, useEffect, useContext } from "react";
//dependencias
import Swal from "sweetalert2";
//context
import AlertaContext from "../../../context/alertas/alertaContext";
import UbicacionContext from "../../../context/ubicaciones/ubicacionContext";

const EditarUbicacion = ({ setMostrarEditar }) => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //importar los valores del context de ubicaciones
  const ubicacionContext = useContext(UbicacionContext);
  const { ubicacionActual, editarUbicacion } = ubicacionContext;

  const [ubicacion, setUbicacion] = useState({
    id_ubicacion: "",
    nombre_ubicacion: "",
    descripcion_ubicacion: "",
  });

  useEffect(() => {
    if (ubicacionActual) {
      setUbicacion({
        ...ubicacionActual,
      });
    }

    if (alerta) {
      Swal.fire({
        position: "center",
        icon: alerta.categoria,
        title: alerta.mensaje,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }, [ubicacionActual, alerta]);

  const obtenerDatos = (e) => {
    setUbicacion({
      ...ubicacion,
      [e.target.name]: e.target.value,
    });
  };

  const { id_ubicacion, nombre_ubicacion, descripcion_ubicacion } = ubicacion;

  const enviarFormulario = (e) => {
    e.preventDefault();

    //validacion
    if (!nombre_ubicacion.trim()) {
      mostrarAlerta("Debe ingresar un nombre de la ubicación", "error");
      return;
    }

    editarUbicacion(ubicacion, mostrarAlerta);

    //cerrar el modal luego de editar
    setTimeout(() => {
      document.getElementById("actualizarUbicacion").click();
    }, 1000);
  };

  return (
    <>
      {/* Modal editar ubicacion */}
      <div
        className="modal fade"
        id="actualizarUbicacion"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalUpdate"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {/* <!-- header modal --> */}
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title" id="modalUpdate">
                Actualizar Ubicación
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={setMostrarEditar}
              >
                <span aria-hidden="true" className="text-white">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>

            {/* <!-- body modal --> */}
            <div className="modal-body">
              <div className="text-center">
                <form className="user" onSubmit={enviarFormulario}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="id_ubicacion"
                      id="id_ubicacion"
                      value={id_ubicacion}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="nombre_ubicacion"
                      id="nombre_ubicacion"
                      placeholder="Nombre de Ubicacion"
                      value={nombre_ubicacion}
                      onChange={obtenerDatos}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="descripcion_ubicacion"
                      id="descripcion_ubicacion"
                      placeholder="Descripción de Ubicacion"
                      value={descripcion_ubicacion}
                      onChange={obtenerDatos}
                    />
                  </div>

                  <button type="submit" className="btn btn-warning btn-block">
                    Actualizar
                  </button>
                </form>
              </div>

              {/* <!-- footer modal --> */}
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  type="button"
                  data-dismiss="modal"
                  onClick={setMostrarEditar}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarUbicacion;
