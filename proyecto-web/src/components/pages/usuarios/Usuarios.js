import React, { useState } from "react";
import Layout from "../../layout/Layout";
import TablaUsuario from "./TablaUsuario";
import AgregarUsuario from "./AgregarUsuario";

function Usuarios() {
  //booleanos para mostrar modales
  const [agregar, setAgregar] = useState(false);

  //funciones para manipular booleanos de modales
  const mostrarAgregar = () => {
    setAgregar(!agregar);
  };

  return (
    <>
      <Layout pageName={"Usuarios"}>
        {/* <!-- Nuevo usuario  --> */}
        <button
          id="newUser"
          className="btn btn-success btn-icon-split mb-3"
          data-toggle="modal"
          data-target="#newUserModal"
          onClick={mostrarAgregar}
        >
          <span className="icon text-white-50">
            <i className="fas fa-user-plus"></i>
          </span>
          <span className="text"> Nuevo Usuario </span>
        </button>

        {/* <!-- tabla usuario  --> */}
        <TablaUsuario />

        {/* <!-- modales usuario  --> */}
        {agregar && <AgregarUsuario setMostrarAgregar={mostrarAgregar} />}
      </Layout>
    </>
  );
}

export default Usuarios;
