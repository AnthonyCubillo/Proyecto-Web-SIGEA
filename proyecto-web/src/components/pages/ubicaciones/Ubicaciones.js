import React, { useState } from "react";
import Layout from "../../layout/Layout";
import AgregarUbicacion from "./AgregarUbicacion";
import TablaUbicacion from "./TablaUbicacion";

function Ubicaciones() {
  //booleanos para mostrar modales
  const [agregar, setAgregar] = useState(false);

  //funciones para manipular booleanos de modales
  const mostrarAgregar = () => {
    setAgregar(!agregar);
  };

  return (
    <>
      <Layout pageName={"Ubicaciones"}>
        {/* <!-- Nuevo usuario  --> */}
        <button
          id="newlocation"
          className="btn btn-success btn-icon-split mb-3"
          data-toggle="modal"
          data-target="#newUbicacionModal"
          onClick={mostrarAgregar}
        >
          <span className="icon text-white-50">
            <i className="fas fa-thumbtack"></i>
          </span>
          <span className="text"> Nueva Ubicación </span>
        </button>

        {/* Tabla de ubicaciones */}
        <TablaUbicacion />
      </Layout>

      {/* <!-- modales ubicacion  --> */}
      {agregar && <AgregarUbicacion setMostrarAgregar={mostrarAgregar} />}
    </>
  );
}

export default Ubicaciones;
