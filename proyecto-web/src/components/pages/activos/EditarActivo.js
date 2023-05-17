import React, { useContext, useEffect, useState } from "react";

//context
import Swal from "sweetalert2";
import ActivosContext from "../../../context/activos/activosContext";
import AlertaContext from "../../../context/alertas/alertaContext";
import UbicacionContext from "../../../context/ubicaciones/ubicacionContext";

const EditarActivo = ({ setMostrarEditar }) => {
  //importar los valores del context de activos
  const activosContext = useContext(ActivosContext);
  const { activoActual, setCargando, editarUbicacionActivo } = activosContext;
  

  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  //importar los valores del context de ubicaciones
  const ubicacionContext = useContext(UbicacionContext);
  const { ubicaciones, obtenerUbicaciones } = ubicacionContext;

  useEffect(() => {
    obtenerUbicaciones(mostrarAlerta);

    // eslint-disable-next-line
  }, []);

  const [activoAux ]= useState(activoActual);

  const [ubicacionNueva, setUbicacionNueva] = useState(activoAux.id_ubicacion);
  
  useEffect(() => {
  setCargando(); 
   // eslint-disable-next-line
  }, [ubicacionNueva]);


  const submitEditarActivo = () => {
   


    if(!ubicacionNueva){
      mostrarAlerta("Debe seleccionar una ubicación", "error");
      return;
    }
    //TODO: actualizar el activo
    if(activoAux.id_ubicacion !== ubicacionNueva){
      editarUbicacionActivo(ubicacionNueva , mostrarAlerta);
      setTimeout(() => {
        setCargando();
      }, 1300);
      Swal.fire({
        position: 'center',
        icon: "success",
        title: "activo actualizado correctamente",
        showConfirmButton: false,
        timer: 1000
      });
      activoAux.id_ubicacion = parseInt(ubicacionNueva);
    }
    
  };

  const onChangeUbicacion = (e) => {
    console.log(parseInt(e.target.value));
    setUbicacionNueva(parseInt(e.target.value));
  }

  return (
    <>
      {/* <!-- editar activo Modal --> */}
      <div
        className="modal fade"
        id="editActiveModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-gradient-warning">
              <h5 className="modal-title text-white" id="ModalLabel1">
                Actualizar Activo
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
            <div className="modal-body">
              <form className="user" >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item  text-center border-0">
                    <i className="fas fa-tag mr-2 text-dark"></i>
                    <span className="text-dark">N° Etiqueta: </span>
                    {activoAux.n_etiqueta}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Descripción: </span>
                    {activoAux.descripcion}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Marca: </span>
                    {activoAux.marca}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Modelo: </span>
                    {activoAux.modelo}
                  </li>
                  <li className="list-group-item">
                    <div className="form-inline text-dark">
                      <label className="ml-2" htmlFor="ubicacionNueva">
                        <i className="fas fa-thumbtack mr-2"></i>
                        Ubicación:
                      </label>
                      <select
                        className="ml-2 custom-select"
                        id="ubicacionNueva"
                        name="ubicacionNueva"
                        value={ubicacionNueva}
                        onChange={onChangeUbicacion}
                      >
                        {ubicaciones.map((ubicacion) => (
                          <option
                            key={ubicacion.id_ubicacion}
                            value={ubicacion.id_ubicacion}
                          >
                            {ubicacion.nombre_ubicacion}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Serie: </span>
                    {activoAux.serie}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Valor en Libros: </span>₡
                    {activoAux.valor_libro}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Condición: </span>
                    {activoAux.condicion}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Clase Activo: </span>
                    {activoAux.clase_activo}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">
                      Identificación Funcionario: {activoAux.dni_funcionario}
                    </span>{" "}
                  </li>
                  <li className="list-group-item">
                    <span className="text-dark">Nombre Funcionario: </span>
                    {activoAux.nombre_funcionario}
                  </li>
                </ul>

                <button
                  
                  className="btn btn-warning btn-user font-weight-bold btn-block mt-2"
                  type="button"
                  data-dismiss="modal"
                  onClick={() => {
                    submitEditarActivo(); // llama a la función que quieras ejecutar en el evento click
                    setMostrarEditar(); // cierra la ventana modal
                  }}
                 
                >
                  Actualizar
                </button>
              </form>
            </div>
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
    </>
  );
};

export default EditarActivo;
