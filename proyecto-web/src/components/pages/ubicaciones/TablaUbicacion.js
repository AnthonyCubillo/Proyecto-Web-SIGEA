import React, { useState, useContext, useEffect } from "react";
import EditarUbicacion from "./EditarUbicacion";
import ItemTablaUbicacion from "./ItemTablaUbicacion";
//context
import AlertaContext from "../../../context/alertas/alertaContext";
import UbicacionContext from "../../../context/ubicaciones/ubicacionContext";

const TablaUbicacion = () => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  //importar los valores del context de ubicaciones
  const ubicacionContext = useContext(UbicacionContext);
  const { ubicacionActual, ubicaciones, obtenerUbicaciones } = ubicacionContext;

  useEffect(() => {
    obtenerUbicaciones(mostrarAlerta);

    // eslint-disable-next-line
  }, [ubicacionActual]);

  //booleanos para mostrar modales
  const [editar, setEditar] = useState(false);

  //funciones para manipular booleanos de modales
  const mostrarEditar = () => {
    setEditar(!editar);
  };

  return (
    <>
      {/* <!-- tabla ubicaciones --> */}
      <div className="card my-5 shadow mb-5">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-secondary">
            Ubicaciones de Activos
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover"
              id="dataTable1"
              width="100%"
              cellSpacing="0"
            >
              <thead className="thead-dark">
                <tr className="text-center">
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {/* <!-- Ubicacion item --> */}

                {ubicaciones.map((item) => (
                  <ItemTablaUbicacion
                    key={item.id_ubicacion}
                    ubicacion={item}
                    setMostrarEditar={mostrarEditar}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editar && <EditarUbicacion setMostrarEditar={mostrarEditar} />}
    </>
  );
};

export default TablaUbicacion;
