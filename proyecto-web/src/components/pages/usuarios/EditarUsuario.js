import React, { useState, useEffect, useContext } from "react";
//dependencias
import Swal from "sweetalert2";
//context
import AlertaContext from "../../../context/alertas/alertaContext";
import UsuariosContext from "../../../context/usuarios/usuarioContext";

const EditarUsuario = ({ setMostrarEditar }) => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //importar los valores del context de usuario
  const usuarioContext = useContext(UsuariosContext);
  const { usuarioActual, editarUsuario } = usuarioContext;

  const [usuarioInput, setUsuarioInput] = useState({
    id_usuario: "",
    dni_usuario: "",
    nombre_usuario: "",
    email_usuario: "",
  });

  useEffect(() => {
    if (usuarioActual) {
      setUsuarioInput({
        ...usuarioActual,
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
  }, [usuarioActual, alerta]);

  const obtenerDatos = (e) => {
    setUsuarioInput({
      ...usuarioInput,
      [e.target.name]: e.target.value,
    });
  };

  //extrayendo datos
  const { dni_usuario, nombre_usuario, email_usuario } = usuarioInput;

  const enviarFormulario = (e) => {
    e.preventDefault();

    //validacion
    if (!dni_usuario.trim()) {
      mostrarAlerta("Debe ingresar el numero de identificación", "error");
      return;
    }

    if (!nombre_usuario.trim()) {
      mostrarAlerta("Debe ingresar un nombre", "error");
      return;
    }
    if (!email_usuario.trim()) {
      mostrarAlerta("Debe ingresar un email", "error");
      return;
    }

    //console.log(usuarioInput);
    editarUsuario(usuarioInput, mostrarAlerta);

    //cerrar el modal luego de editar
    setTimeout(() => {
      document.getElementById("cerrarModalEditarUsuario").click();
    }, 1000);
  };

  return (
    <div
      className="modal fade"
      id="editUserModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalLabel1"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-gradient-warning">
            <h5 className="modal-title text-white" id="ModalLabel1">
              Actualizar Usuario
            </h5>
            <button
              id="cerrarModalEditarUsuario"
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
            <form className="user" onSubmit={enviarFormulario}>
              <div className="form-group position-relative">
                <i className="fas fa-id-card input-icon"></i>
                <input
                  type="text"
                  className="form-control form-control-user pl-5"
                  name="dni_usuario"
                  id="dni_usuario"
                  placeholder="Número de identificación"
                  value={dni_usuario}
                  onChange={obtenerDatos}
                />
              </div>

              <div className="form-group position-relative">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  className="form-control form-control-user pl-5"
                  name="nombre_usuario"
                  id="nombre_usuario"
                  placeholder="Nombre de usuario"
                  value={nombre_usuario}
                  onChange={obtenerDatos}
                />
              </div>

              <div className="form-group position-relative">
                <i className="far fa-envelope input-icon"></i>
                <input
                  type="email"
                  className="form-control form-control-user pl-5"
                  name="email_usuario"
                  id="email_usuario"
                  aria-describedby="emailHelp"
                  placeholder="Ingrese su correo..."
                  value={email_usuario}
                  onChange={obtenerDatos}
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning btn-user font-weight-bold btn-block"
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
  );
};

export default EditarUsuario;
