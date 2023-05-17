import React, { useState, useContext, useEffect } from "react";
import ItemTablaUsuario from "./ItemTablaUsuario";
import EditarUsuario from "./EditarUsuario";
//context
import AlertaContext from "../../../context/alertas/alertaContext";
import UsuariosContext from "../../../context/usuarios/usuarioContext";
import AuthContext from "../../../context/autentificacion/authContext";

const TablaUsuario = () => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  //importar los valores del context de usuario
  const usuarioContext = useContext(UsuariosContext);
  const { usuarios, obtenerUsuarios } = usuarioContext;

  //importar los valores del context de autentificacion
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  useEffect(() => {
    obtenerUsuarios(usuario, mostrarAlerta);

    // eslint-disable-next-line
}, [usuario]);

  //booleanos para mostrar modales
  const [editar, setEditar] = useState(false);

  //funciones para manipular booleanos de modales
  const mostrarEditar = () => {
    setEditar(!editar);
  };

  return (
    <>
      <div className="card mt-4 shadow mb-5">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-secondary">
            Usuarios del Sistema
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
                  <th>Identificación</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {/* <!-- Usuarios --> */}
                {usuarios.map((item) => (
                  <ItemTablaUsuario
                    key={item.id_usuario}
                    usuario={item}
                    setMostrarEditar={mostrarEditar}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editar && <EditarUsuario setMostrarEditar={mostrarEditar} />}
    </>
  );
};

export default TablaUsuario;
