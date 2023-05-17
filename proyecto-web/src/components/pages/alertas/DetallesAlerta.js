import React, { useContext } from "react";
//context
import AlertaActivoContext from "../../../context/alertaActivos/alertaActivoContext";

function DetallesAlerta({ setMostrarDetalles }) {
  //importar los valores del context de alertaActivos
  const alertaActivoContext = useContext(AlertaActivoContext);
  const { alertaActual } = alertaActivoContext;

  return (
    <>
      {/* <!-- detalles alerta Modal --> */}
      <div
        className="modal fade"
        id="detallesAlertaModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-gradient-primary">
              <h5 className="modal-title text-white" id="ModalLabel1">
                Detalles del Activo
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={setMostrarDetalles}
              >
                <span aria-hidden="true" className="text-white">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item  text-center border-0">
                    <i className="fas fa-tag mr-2 text-dark"></i>
                    <span className="text-dark">N° Etiqueta: </span>
                    {alertaActual.tb_alerta_n_etiqueta}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Descripción: </span>
                    {alertaActual.tb_alerta_activo_descripcion}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Marca: </span>
                    {alertaActual.tb_alerta_marca}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Modelo: </span>
                    {alertaActual.tb_alerta_modelo}
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-thumbtack mr-2"></i>
                    <span className="text-dark">Ubicación: </span>
                    {alertaActual.tb_alerta_ubicacion}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Serie: </span>
                    {alertaActual.tb_alerta_serie}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Valor en Libros: </span> ₡{" "} 
                    {alertaActual.tb_alerta_valor_libro}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Condición: </span>
                    {alertaActual.tb_alerta_condicion}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Clase Activo: </span>
                    {alertaActual.tb_alerta_clase_activo}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Identificación Funcionario: </span>
                    {alertaActual.tb_alerta_dni_funcionario}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Nombre Funcionario: </span>
                    {alertaActual.tb_alerta_nombre_funcionario}
                  </li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                type="button"
                data-dismiss="modal"
                onClick={setMostrarDetalles}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetallesAlerta;
